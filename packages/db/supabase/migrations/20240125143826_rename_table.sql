CREATE TABLE "rolesRecommendation" AS SELECT * FROM rolesrecommendations;

INSERT INTO "rolesRecommendation" SELECT * FROM rolesrecommendations;

DROP TABLE rolesrecommendations;