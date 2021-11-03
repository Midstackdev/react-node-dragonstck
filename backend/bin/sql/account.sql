CREATE TABLE account(
    id             SERIAL PRIMARY KEY,
    "usernameHash" CHAR(64) NOT NULL,
    "passwordHash" CHAR(64) NOT NULL,
    "sessionId" CHAR(36) 
)