const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const bcrypt = require("bcryptjs");
const now = require('moment');
const logger = require('../config/logger');

const users = sequelize.define("users", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    unique: {
      args: true,
      msg: "Msg from db: username is already in use!"
    },
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      args: true,
      msg: "Msg from db: email address is already in use!"
    },
    validate: {
      isEmail: { msg: "Must be a valid email address" },
    }
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },

  createdAt: DataTypes.DATE(now()),
  updatedAt: DataTypes.DATE(now())
}, { underscored: true });

users.beforeCreate(async (user, options) => {
  user.password = await bcrypt.hash(user.password, 8);
});

users.isUsernameTaken = async (_username) => {
  const user = await users.findOne({ where: { username: _username }});
  return !!user;
};

users.isEmailTaken = async (_email) => {
  const user = await users.findOne({ where: { email: _email }});
  return !!user;
};

users.prototype.checkPassword = async (password, truePassword) => {
  return bcrypt.compare(password, truePassword);
}

(async function() {
  await sequelize.sync().then(() => {
      logger.info("Sync users Table success!");
  });
})().catch((error) => {
    logger.error("Sync users Table fail");
    logger.error(error);
});

module.exports = users;
