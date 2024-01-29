DROP TABLE "rolesRecommendation";

CREATE TABLE "rolesRecommendation" (
    id SERIAL PRIMARY KEY,
    country VARCHAR(255),
    currency VARCHAR(10),
    description TEXT,
    salary DECIMAL(10, 2),
    title VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    url VARCHAR(255),
    language VARCHAR(50),
    minimum_years INTEGER,
    company VARCHAR(255),
    topic_id INTEGER REFERENCES "Topics"(id)
);