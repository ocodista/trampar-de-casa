migrate:
	docker-compose exec app sh -c 'turbo run db:migrate --filter=db -- --db-url="$$DATABASE_URL"'
setup-env:
	cp .env.example .env && cp docker/.env.example docker/.env
	sed -i 's@INCLUDE_PATH=@INCLUDE_PATH="$(shell pwd)"@g' .env
