DROP TABLE IF EXISTS Characters;

CREATE TABLE Characters
(name VARCHAR(15) PRIMARY KEY,
class VARCHAR(15),
race VARCHAR(15),
lvl INTEGER,
str INTEGER,
dex INTEGER,
const INTEGER,
intl INTEGER,
wis INTEGER,
cha INTEGER,
prcp INTEGER,
memberId INTEGER);

INSERT INTO Characters
VALUES('Testname', 'Testclass', 'Testrace', '1', '2,', '3', '1', '2,', '3', '1', '2,', '1');