-- Create view for countries in roles
CREATE OR REPLACE VIEW vw_countries_in_roles AS
SELECT DISTINCT r.country
FROM "Roles" r
WHERE r.country IS NOT NULL AND LENGTH(r.country) > 0 AND r.ready = true;

-- Create view for skills in roles
CREATE OR REPLACE VIEW vw_skills_in_roles AS 
SELECT *
FROM "Skills"
WHERE id IN (
    SELECT DISTINCT CAST(UNNEST("skillsId") AS INTEGER) AS skillId
    FROM "Roles"
    WHERE ready = true
)
ORDER BY name;