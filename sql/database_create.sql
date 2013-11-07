CREATE USER elecstat WITH PASSWORD 'elecstat';
CREATE DATABASE election_stats_india;
GRANT ALL PRIVILEGES ON DATABASE election_stats_india to elecstat;
# psql -h localhost -p 5432  -U elecstat -d election_stats_india -W -- to connect