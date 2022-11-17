import config from './config';

const baseUrl = config.baseUrl;

const login = `${baseUrl}/api/v1/auth/login`;
const register = `${baseUrl}/api/v1/auth/logout`;
const logout = `${baseUrl}/api/v1/auth/logout`;
const refreshTokens = `${baseUrl}/api/v1/auth/refresh-tokens`;
const user = `${baseUrl}/api/v1/account`;
const question = `${baseUrl}/api/v1/question`;

export default {
  login,
  register,
  logout,
  refreshTokens,
  user,
  question
}
