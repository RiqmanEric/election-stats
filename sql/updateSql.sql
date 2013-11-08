UPDATE candidate AS C
SET results = true
WHERE C.votes >= ALL ( SELECT D.votes FROM candidate D 
WHERE C.constituencyname = D.constituencyname AND C.statename = D.statename AND C.year = D.year);