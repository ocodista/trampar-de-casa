-- Assuming the table already exists, if not, create it first using the previous migration script

-- Alter the createdAt column to have the current date as default
ALTER TABLE testimonial
ALTER COLUMN createdat SET DEFAULT CURRENT_DATE;
