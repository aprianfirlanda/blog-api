const sequelize = require('../../config/database');
const UserModel = require('./user');

const User = UserModel(sequelize, require('sequelize').DataTypes);

module.exports = {
  User
};
