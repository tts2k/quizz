const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../.env')});

const envVarsSchema = Joi.object()
  .keys({
  NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
  PORT: Joi.number().default(3000),
  SQL_URL: Joi.string().required().description('SQL DB Url'),
  REDIS_URL: Joi.string().required().description('Redis url'),
  REDIS_KEY: Joi.string().required().description('Redis key name'),
  POSTGRESQL_HOSTNAME: Joi.string().required().description('POSTGRESQL host'),
  POSTGRESQL_USERNAME: Joi.string().required().description('POSTGRESQL username'),
  POSTGRESQL_PASSWORD: Joi.string().required().description('POSTGRESQL password'),
  POSTGRESQL_PORT: Joi.string().required().description('POSTGRESQL port'),
  POSTGRESQL_DB: Joi.string().required().description('POSTGRESQL Database'),
  JWT_SECRET: Joi.string().required().description("JWT secret key"),
  JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().default(30).description('minutes after which access token expire'),
  JWT_REFERSH_EXPIRATION_DAYS: Joi.number().default(30).description('days after which refresh token expire'),
})
.unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' }}).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  poolPostGre: {
    user: envVars.POSTGRESQL_USERNAME,
    host: envVars.POSTGRESQL_HOSTNAME,
    database: envVars.POSTGRESQL_DB,
    password: envVars.POSTGRESQL_PASSWORD,
    port: envVars.POSTGRESQL_PORT
  },
  sql: {
    url: envVars.SQL_URL + (envVars.NODE_ENV === 'test' ? '-test': ''),
    options: {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  },
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFERSH_EXPIRATION_DAYS
  },
  redis: {
    url: envVars.REDIS_URL,
    key: envVars.REDIS_KEY
  }
}
