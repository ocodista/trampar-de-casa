-- Create the trigger function
CREATE OR REPLACE FUNCTION update_roles_recommendation()
RETURNS TRIGGER AS $$
BEGIN
  -- Check if the row was updated and isApproved is true
  IF NEW.isApproved = true THEN
    -- Insert the row into the 'roles' table
    INSERT INTO "Roles" (country, currency, description, salary, title, url, language, "minimumYears", company, "topicId", "updatedAt")
    VALUES (NEW.country, NEW.currency, NEW.description, NEW.salary, NEW.title, NEW.url, NEW.language::"RoleLanguage", NEW.minimum_years, NEW.company, NEW.topic_id, CURRENT_TIMESTAMP);

    -- Delete the row from 'rolesRecommendation'
    DELETE FROM "rolesRecommendation" WHERE id = NEW.id;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create the trigger
CREATE TRIGGER update_roles_recommendation_trigger
AFTER UPDATE ON "rolesRecommendation"
FOR EACH ROW EXECUTE FUNCTION update_roles_recommendation();
