DROP VIEW "RolesSkillsView";
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
    r."company",
    ARRAY(SELECT s.name FROM "Skills" AS s WHERE s.id::text = ANY(r."skillsId")) AS "skillNames"
FROM
    "Roles" AS r
WHERE r.ready = true;