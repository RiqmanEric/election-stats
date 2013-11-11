UPDATE candidate AS C
SET results = true
WHERE  C.votes >= ALL  ( SELECT D.votes FROM  candidate D 
WHERE  C.constituencyname = D.constituencyname AND  C.statename = D.statename AND  C.year = D.year);

SELECT sum(votes) AS total, partyname, statename INTO tempTable FROM  candidate WHERE  year=2009 GROUP BY  partyname, statename;
SELECT T1.total, T1.partyname, T1.statename INTO temp FROM  temptable T1 
WHERE  T1.total = (SELECT max(total) FROM  temptable T2 WHERE  T2.statename = T1.statename) ORDER  BY  T1.statename;
DROP TABLE tempTable;
UPDATE state SET MajorPartyName = (SELECT partyname FROM  temp WHERE  statename = name);
DROP TABLE temp;

UPDATE constituency SET foundationyear = '1950';

SELECT C.constituencyname, C.statename, C.partyname into temp 
FROM  candidate C WHERE  C.year = 2009 AND  C.votes >= ALL  (SELECT D.votes FROM  candidate D 
WHERE  D.constituencyname = C.constituencyname AND  D.statename = C.statename AND  D.year = 2009) 
ORDER  BY  statename, constituencyname;
UPDATE constituency C 
SET majorparty = (SELECT partyname FROM  temp T WHERE  name = T.constituencyname AND  C.statename = T.statename)
WHERE  majorparty IS NULL;
DROP TABLE temp;
SELECT C.constituencyname, C.statename, C.partyname into temp 
FROM  candidate C WHERE  C.year = 2004 AND  C.votes >= ALL  (SELECT D.votes FROM  candidate D 
WHERE  D.constituencyname = C.constituencyname AND  D.statename = C.statename AND  D.year = 2004);
UPDATE constituency C 
SET majorparty = (SELECT partyname FROM  temp T WHERE  name = T.constituencyname AND  C.statename = T.statename)
WHERE  majorparty IS NULL;
DROP TABLE temp;
SELECT C.constituencyname, C.statename, C.partyname into temp 
FROM  candidate C WHERE  C.year = 1999 AND  C.votes >= ALL  (SELECT D.votes FROM  candidate D 
WHERE  D.constituencyname = C.constituencyname AND  D.statename = C.statename AND  D.year = 1999);
UPDATE constituency C 
SET majorparty = (SELECT partyname FROM  temp T WHERE  name = T.constituencyname AND  C.statename = T.statename)
WHERE  majorparty IS NULL;
DROP TABLE temp;
SELECT C.constituencyname, C.statename, C.partyname into temp 
FROM  candidate C WHERE  C.year = 1998 AND  C.votes >= ALL  (SELECT D.votes FROM  candidate D 
WHERE  D.constituencyname = C.constituencyname AND  D.statename = C.statename AND  D.year = 1998);
UPDATE constituency C 
SET majorparty = (SELECT partyname FROM  temp T WHERE  name = T.constituencyname AND  C.statename = T.statename)
WHERE  majorparty IS NULL;
UPDATE constituency SET majorparty = 'independent' WHERE  majorparty IS null;
DROP TABLE temp;