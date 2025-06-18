# BLOG API

Requirement:
- node js version 22.16.0 (current LTS when the project created)
- MySQL database version 8.0 (or you can use docker-compose `docker-compose up -d`).

Library note:
- `mysql2` is required for Sequelize to connect to MySQL.
- `sequelize-cli` is included for migration commands.
- `jest` is set up for unit testing.
- `nodemon` is for development auto-reloading.


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

