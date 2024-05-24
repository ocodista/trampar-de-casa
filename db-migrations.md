# Migrations

In this document, i explain how to create migrations and push to supabase. Keep in mind that all supabase setup is in the folder [`packages/db/supabase`](https://github.com/ocodista/trampar-de-casa/tree/main/packages/db/supabase).

## How create a new migration

To create a migration type the following command:

```bash
yarn db:migration:new [migration name]
```

> The migration file path should returned by command.

## How to push migration to the local database

This can make on the root of the project

1. Make sure that [supabase local](https://supabase.com/docs/guides/cli/local-development) is running with `yarn db:status`.

   The supabase local is very important. Is necessary to run the apps of the repo and make any changes on the DB.

   **Run `yarn db:start`** to init [supabase local](https://supabase.com/docs/guides/cli/local-development).

2. Type this command to apply migrations on the local database `yarn db:migration`

   This command runs two other commands. The `supabase migration up` to apply new migrations on supabase local and `yarn db:generate-types` to generate database types based on the local database.
