const server = require('./app/app');
const logger = require('./config/logger');
const config = require('./config/config');
const { sequelize } = require('./config/db');

sequelize
  .authenticate()
  .then(() => {
    logger.info('Connect DB success!');
    server.listen(3000, () => {
      logger.info(`Listening to port ${config.port}`)
    })
  })
  .catch(() => logger.error(`Connect DB fail ${process.env.PORT}`));

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM recevied');
  if (server) {
    server.close();
  }
});
