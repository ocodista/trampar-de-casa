DROP VIEW "RolesSkillsView";
/*
  Warnings:

  - The primary key for the `Roles` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Roles` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Roles" DROP CONSTRAINT "Roles_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
ADD CONSTRAINT "Roles_pkey" PRIMARY KEY ("id");


CREATE OR REPLACE VIEW "RolesSkillsView" AS
SELECT
    r.id,
    r.ready,
    r.country,
    r.currency,
    r.description,
    r.language,
    r.salary,
    r.title,
    r.url,
    r."createdAt",
    ARRAY(SELECT s.name FROM "Skills" AS s WHERE s.id::text = ANY(r."skillsId")) AS "skillNames"
FROM
    "Roles" AS r;