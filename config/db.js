const { Sequelize } = require('sequelize');
const config = require('./config');
const logger = require('../config/logger');
let sequelize;

if (process.env.NODE_ENV === 'production') {
  logger.info('NODE_ENV = production');
  sequelize = new Sequelize(
    config.poolPostGre.database,
    config.poolPostGre.user,
    config.poolPostGre.password, {
      host: config.poolPostGre.host,
      dialect: 'postgres',
      port: config.poolPostGre.port,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      }
    }
  )
} else {
  logger.info('NODE_ENV = development');
  sequelize = new Sequelize(config.sql.url);
}

module.exports = sequelize
