# Backend Setup

## Requirements
- .NET 8.0 SDK
- PostgreSQL

## Database Setup
```bash
createdb -U postgres todo
psql -U postgres -d todo -c "CREATE USER todo_user WITH PASSWORD 'secret'"
psql -U postgres -d todo -c "GRANT ALL PRIVILEGES ON DATABASE todo TO todo_user"