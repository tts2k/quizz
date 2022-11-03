const httpStatus = require("http-status");
const { authService, userService, sessionService } = require("../services");
const response = require("../utils/responseTemp");

/*
 * Registger an user
 */
const register = async (req, res, next) => {
  try {
    await userService.createUser(req.body);
    res.send(response(httpStatus.CREATED, 'User has been successfully created.'))
  } catch (error) {
    next(error)
  }
}

/*
 * Login and save refresh token to DB
 */
const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await authService.loginUsernameAndPassword(username, password);
    const tokens = await sessionService.generateAuthTokens(user);
    res.send(response(httpStatus.OK, "Login success", { user, tokens }));
  }
  catch (error) {
    next(error);
  }
}

/*
 * Logout with refresh token
 */
const logout = async (req, res, next) => {
  try {
    await authService.logout(req.body.refreshToken);
    res.send(response(httpStatus.OK, 'Log out success'));
  } catch (error) {
    next(error);
  }
}

/*
 * Request new tokens
 */
const refreshTokens = async (req, res, next) => {
  try {
    const tokens = await authService.refreshTokens(req.body.refreshToken);
    res.send(response(httpStatus.OK, 'Refresh token success', { ...tokens }));
  } catch (error) {
    next(error);
  }
}

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
}
