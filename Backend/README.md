### 2. Backend/README.md

# Backend Setup

ASP.NET Core 9.0 backend application using Entity Framework Core and PostgreSQL.

## Requirements
- .NET 9.0 SDK
- PostgreSQL

## Configuring the database
1. Create a database and a user:
   createdb -U postgres todo
   psql -U postgres -d todo -c "CREATE USER todo_user WITH PASSWORD 'secret'"
   psql -U postgres -d todo -c "GRANT ALL PRIVILEGES ON DATABASE todo TO todo_user"