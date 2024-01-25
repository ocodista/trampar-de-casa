CREATE SEQUENCE IF NOT EXISTS "rolesRecommendation_id_seq";

CREATE OR REPLACE FUNCTION set_default_id() RETURNS TRIGGER AS $$
BEGIN
  NEW.id := COALESCE(NEW.id, nextval("id"));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_default_id_trigger
BEFORE INSERT ON "rolesRecommendation"
FOR EACH ROW EXECUTE FUNCTION set_default_id();


ALTER TABLE "rolesRecommendation"
ALTER COLUMN created_at SET DEFAULT CURRENT_TIMESTAMP;