CREATE OR REPLACE VIEW vw_countries_in_roles AS
SELECT DISTINCT r.country
FROM "Roles" r
WHERE r.country IS NOT NULL AND LENGTH(r.country) > 0 AND r.ready = true;