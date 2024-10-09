# Supabase Synchronization Guide

## Scenario 1: Local Changes to Remote

If you've made changes to your local database and want to apply them to the remote Supabase database, follow these steps:

1. **Generate a migration script:**

   ```bash
   supabase db diff -f migration_name
   ```

   This will create a migration file in the `supabase/migrations` folder.

2. **Review the migration script:**
   Open the generated file and verify that the changes are correct.

3. **Apply the migration locally (optional, but recommended):**

   ```bash
   supabase db reset
   ```

   This will apply all migrations locally to ensure they work.

4. **Push the changes to the remote database:**

   ```bash
   supabase db push
   ```

5. **Verify the changes:**
   Access the Supabase dashboard or use `supabase db pull` to confirm that the changes were applied correctly.

## Scenario 2: Remote Changes to Local

If changes were made directly to the remote Supabase database and you need to update them locally:

1. **Pull the changes from the remote database:**

   ```bash
   supabase db pull
   ```

   This will update your local schema with the changes from the remote database.

2. **Generate a migration script for the changes:**

   ```bash
   supabase db diff -f migration_name
   ```

   This will create a migration file based on the differences between your local and remote databases.

3. **Review the migration script:**
   Check the generated file to ensure the changes are correct.

4. **Apply the migration locally:**

   ```bash
   supabase db reset
   ```

   This will apply all migrations, including the new one, to your local database.

5. **Commit the changes:**
   Add the new migration file to your version control system:
   ```bash
   git add supabase/migrations/migration_name.sql
   git commit -m "Add migration for remote changes"
   ```

## Important Notes:

- Always backup before applying significant changes.
- Use `supabase db reset` with caution, as it recreates the local database.
- If there are conflicts, you may need to resolve them manually by editing the migration scripts.
- Keep your Supabase CLI updated to avoid compatibility issues.
