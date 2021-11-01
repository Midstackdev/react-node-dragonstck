CREATE TABLE dragon(
    id             SERIAL PRIMARY KEY, 
    birthday       TIMESTAMP NOT NULL, 
    nickname       VARCHAR(64) NOT NULL, 
    "generationId" INTEGER,
    FOREIGN KEY ("generationId") REFERENCES generation(id)
);