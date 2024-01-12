-- Remove SentRoles relationship of Roles table
BEGIN;

-- Step 1: Drop the foreign key constraint
ALTER TABLE "Roles" DROP CONSTRAINT IF EXISTS "Roles_SentRolesId_fkey";

-- Step 2: Drop the column
ALTER TABLE "Roles" DROP COLUMN IF EXISTS "sentRolesId";

COMMIT;

DROP TABLE IF EXISTS "SentRoles" CASCADE;

DROP TABLE IF EXISTS "SubscribersSkills";
