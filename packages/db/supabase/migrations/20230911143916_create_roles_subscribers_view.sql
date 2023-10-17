CREATE OR REPLACE VIEW "SubscriberSkillsView" AS
SELECT
    sub.name,
    sub.id,
    sub."linkedInUrl",
    sub."gitHub",
    sub."startedWorkingAt",
    sub."skillsId",
    sub."englishLevel",
    ARRAY(SELECT s.name FROM "Skills" AS s WHERE s.id::text = ANY(sub."skillsId")) AS "skillNames"
FROM
    "Subscribers" AS sub;