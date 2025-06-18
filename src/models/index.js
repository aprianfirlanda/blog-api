const sequelize = require('../../config/database');
const User = require('./user')(sequelize);
const Post = require('./post')(sequelize);

module.exports = {
  User,
  Post,
  sequelize
};
