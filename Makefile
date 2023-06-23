build-docker:
	docker build -t trampar_de_casa -f ./Dockerfile .

run:
	@docker-compose -f docker-compose.yml up -d

dc-stop:
		docker-compose -f docker-compose.yml down

dc-clear:
		docker stop $$(docker ps -a -q); docker container prune ; docker image prune ; docker volume prune;
