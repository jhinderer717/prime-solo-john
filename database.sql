CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "round" (
    "id" SERIAL PRIMARY KEY,
    "date" date,
    "number_holes" INT NOT NULL,
    "score_to_par" INT NOT NULL,
    "putts" INT NOT NULL,
    "approach_shots" INT NOT NULL,
    "fairways_hit" INT NOT NULL,
    "possible_fairways" INT NOT NULL
);


CREATE TABLE "user_round" (
	"user_id" INT REFERENCES "user",
	"round_id" INT REFERENCES "round"
);