-- NOTE: change to your own passwords for production environments
\set pgpass `echo "$PGPASSWORD"`

ALTER USER authenticator WITH PASSWORD :'pgpass';
ALTER USER pgbouncer WITH PASSWORD :'pgpass';
-- NOTE: These usernames seems to be set in stone by supabase/postgres
ALTER USER supabase_auth_admin WITH PASSWORD :'pgpass';
ALTER USER supabase_storage_admin WITH PASSWORD :'pgpass';
