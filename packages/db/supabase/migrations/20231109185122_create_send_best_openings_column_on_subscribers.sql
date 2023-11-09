-- In your PostgreSQL migration file, for example, 2023110901_add_send_best_openings_column.sql

-- Add the new column "sendBestOpenings" to the "Subscribers" table
ALTER TABLE "Subscribers"
ADD COLUMN "sendBestOpenings" BOOLEAN DEFAULT false;
