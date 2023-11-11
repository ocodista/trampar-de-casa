migrate:
	docker-compose exec app sh -c 'turbo run db:migrate --filter=db -- --db-url="$$DATABASE_URL"'
