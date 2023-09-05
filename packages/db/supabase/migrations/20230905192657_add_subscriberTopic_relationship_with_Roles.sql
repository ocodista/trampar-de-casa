-- Add the "topicId" column to the "Roles" table
ALTER TABLE "Roles" ADD COLUMN "topicId" INT;

-- Add the foreign key constraint
ALTER TABLE "Roles"
ADD CONSTRAINT "Roles_topicId_fkey"
FOREIGN KEY ("topicId")
REFERENCES "Topics" ("id");