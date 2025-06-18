const { Sequelize } = require('sequelize');
require('dotenv').config();

const DB_NAME = process.env.DB_NAME || 'blog_db';
const DB_USER = process.env.DB_USER || 'blog_user';
const DB_PASSWORD = process.env.DB_PASSWORD || 'blog_password';
const DB_HOST = process.env.DB_HOST || 'localhost';

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'mysql',
  logging: false,
});

module.exports = sequelize;
