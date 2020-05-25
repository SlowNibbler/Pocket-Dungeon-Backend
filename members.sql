DROP TABLE IF EXISTS Members;
CREATE TABLE Members (
                        Email VARCHAR(255) NOT NULL UNIQUE,
                        Password VARCHAR(255) NOT NULL);

