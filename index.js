const express = require('express');
const sequelize = require('./config/database');
const app = express();

// Test database connection
async function testDB() {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error.message);
    process.exit(1);
  }
}

testDB();

app.use(express.json());

// Example: import and use your API routes
const routes = require('./src/routes');
app.use('/api', routes);

// Default health check route
app.get('/', (req, res) => {
  res.json({ message: 'Blog API is running!' });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = app;
