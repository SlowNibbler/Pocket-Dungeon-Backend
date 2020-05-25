DROP TABLE IF EXISTS Members;
CREATE TABLE Members (MemberID SERIAL PRIMARY KEY,
                        Email VARCHAR(50) NOT NULL UNIQUE,
                        Password VARCHAR(50) NOT NULL,
                        Salt VARCHAR(255));

DROP TABLE IF EXISTS Characters;
CREATE TABLE Characters (CharacterID SERIAL PRIMARY KEY,
                         CharacterObject BLOB,
                         MemberID INT REFERENCES Members (MemberID));

DROP TABLE IF EXISTS Campaigns;
CREATE TABLE Campaigns (CampaignObject BLOB PRIMARY KEY,
                        MemberID INT REFERENCES Members (MemberID));