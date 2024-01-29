ALTER TABLE "rolesRecommendation"
ADD CONSTRAINT fk_topics
    FOREIGN KEY (topic_id)
    REFERENCES "Topics"(id);