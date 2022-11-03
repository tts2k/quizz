const Joi = require('joi')

const register = {
  body: Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string().required()
  })
};

const login = {
  body: Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required(),
  })
};

const logout = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required()
  })
};

const refreshTokens = {
  body: Joi.object().keys({
    refreshTokens: Joi.string().required()
  })
}

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
}
