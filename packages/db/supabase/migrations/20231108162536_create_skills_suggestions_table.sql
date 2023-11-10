-- Create a new table called "skillsSuggestions"
CREATE TABLE "skillsSuggestions" (
    -- Auto-generated UUID column as primary key
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    -- Column for user ID, referencing the "id" column in the "Subscribers" table
    "userId" UUID REFERENCES "Subscribers"(id),
    -- Column for skill name, a simple string
    "skillName" VARCHAR(255) NOT NULL,
    -- Column for approval status, a boolean value
    "isApproved" BOOLEAN NOT NULL
);

