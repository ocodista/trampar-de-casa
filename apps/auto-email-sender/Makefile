-include .env

.PHONY: build clean setup step_one step_two step_three step_four step_five send wait_for_shutdown_roles_assigner wait_for_shutdown_email_pre_renderer update_registry

# Main target to run all steps sequentially
setup: clean step_one step_two step_three step_four step_five

clean:
	echo "Clearing any existing containers and volumes..."
	docker compose down -v
	echo "Cleaned existing containers and volumes."

# Step to build all Docker images
build:
	echo "Building all Docker images using turbo..."
	turbo build
	echo "Building Docker images using docker compose..."
	docker compose build
	echo "All Docker images built."

# Step to tag and push all Docker images to the registry
update-registry:
	echo "Tagging and pushing all Docker images to the registry..."
	docker tag roles-validator:latest $(REGISTRY_URL)/roles-validator:latest
	docker push $(REGISTRY_URL)/roles-validator:latest

	docker tag roles-renderer:latest $(REGISTRY_URL)/roles-renderer:latest
	docker push $(REGISTRY_URL)/roles-renderer:latest

	docker tag roles-assigner:latest $(REGISTRY_URL)/roles-assigner:latest
	docker push $(REGISTRY_URL)/roles-assigner:latest

	docker tag email-pre-renderer:latest $(REGISTRY_URL)/email-pre-renderer:latest
	docker push $(REGISTRY_URL)/email-pre-renderer:latest

	docker tag email-composer:latest $(REGISTRY_URL)/email-composer:latest
	docker push $(REGISTRY_URL)/email-composer:latest

	docker tag email-sender:latest $(REGISTRY_URL)/email-sender:latest
	docker push $(REGISTRY_URL)/email-sender:latest

	docker tag subs-to-queue:latest $(REGISTRY_URL)/subs-to-queue:latest
	docker push $(REGISTRY_URL)/subs-to-queue:latest

	echo "All Docker images tagged and pushed to the registry."

# Setup steps
setup: clean step_one step_two step_three step_four step_five

# Step One: Spin up RabbitMQ and MongoDB, then wait for 60 seconds
step_one:
	echo "Starting Step One: Spinning up RabbitMQ and MongoDB..."
	docker compose up -d rabbitmq mongo
	echo "Waiting for 60 seconds to ensure RabbitMQ and MongoDB are ready..."
	sleep 60
	echo "Step One completed: RabbitMQ and MongoDB are up."

# Step Two: Spin up subs-to-queue, then roles-renderer sequentially
step_two:
	echo "Starting Step Two: Spinning up subs-to-queue..."
	docker compose up subs-to-queue
	echo "subs-to-queue completed."
	echo "Starting roles-renderer..."
	docker compose up roles-renderer
	echo "roles-renderer completed."
	echo "Step Two completed: subs-to-queue and roles-renderer are up."

# Step Three: Spin up roles-assigner service with four replicas
step_three:
	echo "Starting Step Three: Spinning up roles-assigner with four replicas..."
	docker compose up -d --scale roles-assigner=4 roles-assigner
	echo "roles-assigner spun up with four replicas."
	$(MAKE) wait_for_shutdown_roles_assigner
	echo "Step Three completed: all roles-assigner replicas are down."

# Step Four: Spin up email-pre-renderer service with four replicas
step_four:
	echo "Starting Step Four: Spinning up email-pre-renderer with four replicas..."
	docker compose up -d --scale email-pre-renderer=4 email-pre-renderer
	echo "email-pre-renderer spun up with four replicas."
	$(MAKE) wait_for_shutdown_email_pre_renderer
	echo "Step Four completed: all email-pre-renderer replicas are down."

# Step Five: Spin up email-composer
step_five:
	echo "Starting Step Five: Spinning up email-composer..."
	docker compose up email-composer
	echo "Step Five completed: email-composer is up."

# Send emails after all steps are completed
send:
	echo "Starting the email sender service..."
	docker compose up email_sender
	echo "Email sender service completed."

# Function to wait for all roles-assigner containers to stop
wait_for_shutdown_roles_assigner:
	echo "Waiting for all roles-assigner replicas to shut down..."
	while [ `docker compose ps -q roles-assigner | wc -l` -ne 0 ]; do \
		sleep 2; \
	done
	echo "All roles-assigner replicas have shut down."

# Function to wait for all email-pre-renderer containers to stop
wait_for_shutdown_email_pre_renderer:
	echo "Waiting for all email-pre-renderer replicas to shut down..."
	while [ `docker compose ps -q email-pre-renderer | wc -l` -ne 0 ]; do \
		sleep 2; \
	done
	echo "All email-pre-renderer replicas have shut down."
