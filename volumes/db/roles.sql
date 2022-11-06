-- NOTE: change to your own passwords for production environments
\set pgpass `echo "$PGPASSWORD"`

ALTER USER authenticator WITH PASSWORD :'pgpass';
ALTER USER pgbouncer WITH PASSWORD :'pgpass';
ALTER USER auth_admin WITH PASSWORD :'pgpass';
