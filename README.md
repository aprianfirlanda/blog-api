# BLOG API

Requirement:
- node js version 22.16.0 (current LTS when the project created)
- MySQL database version 8.0 (or you can use docker-compose `docker-compose up -d`).

Library note:
- `mysql2` is required for Sequelize to connect to MySQL.
- `sequelize-cli` is included for migration commands.
- `jest` is set up for unit testing.
- `nodemon` is for development auto-reloading.

## Folder Structure

```
blog-api/
│
├── package.json        # Project metadata, scripts, dependencies.
├── .env                # Environment variables (e.g., DB credentials, secrets).
├── .gitignore          # Lists files/folders to be ignored by Git.
├── README.md           # Project documentation.
├── index.js            # Main entry point; starts your Express app.
│
├── config/
│   └── config.js       # Configuration for database and possibly other app settings.
│
├── src/
│   ├── controllers/    # Functions that process HTTP requests (business logic for each route).
│   ├── middlewares/    # Functions processing requests before controllers (e.g., authentication, logging).
│   ├── models/         # Database models (data structures, used by Sequelize).
│   ├── routes/         # Defines API endpoints (URL patterns and handler connections).
│   ├── services/       # Business logic or operations reused by controllers (like fetching or updating data).
│   └── utils/          # Helper functions and utility modules for general use.
│
├── migrations/         # Database migration scripts (auto-generated/managed by Sequelize CLI).
├── seeders/            # Seed files for populating or cleaning database data (e.g., mock data).
│
└── tests/              # Unit and integration tests, often matching /src structure.
```


## Database Migration

This project uses **Sequelize CLI** to handle database migrations and seeders. Please ensure you have configured your database connection in `config/config.js` as required.

---

### Running Migrations
Generate new migration file.
```shell
npx sequelize-cli migration:generate --name your-migration-name
```
this command creates a new file in the folder where you define how to create or change tables. `migrations`


Run all pending migrations to set up or update your database schema:
```shell
npm run db:migrate
```
This will set up your database structure based on your latest migration files.

If you make a mistake and need to undo the last change, you can run:
```shell
npm run db:migrate:undo
```


### Running Seeders
Generate a new migration file.
```shell
npx npx sequelize-cli seed:generate --name your-seed-name
```
This creates a file in the seeders folder where you write the data you want to insert.

Run all seeders.
```shell
npx sequelize-cli db:seed:all
```
- This executes all seeder files and populates your database.

If you make a mistake and need to undo the last change, you can run:
```shell
npx sequelize-cli db:seed:undo
```
This removes the last batch of seeded data.

