const getAccessToken = () => {
  return window.atob(window.localStorage.getItem('accessToken'));
}

const getRefreshToken = () => {
  return window.atob(window.localStorage.getItem('refreshToken'));
}

const setAccessToken = (token) => {
  window.localStorage.setItem('accessToken', window.btoa(token));
}

const setRefreshToken = (token) => {
  window.localStorage.setItem('refreshToken', window.btoa(token));
}

const clearAuthInfo = () => {
  window.localStorage.removeItem('accessToken');
  window.localStorage.removeItem('refreshToken');
  window.localStorage.removeItem('user');
}

const getUser = () => {
  const user = localStorage.getItem('user');
  return JSON.parse(user);
}

const setUser = (user) => {
  const userString = JSON.stringify(user);
  localStorage.setItem('user', userString);
}

export default {
  getAccessToken,
  getRefreshToken,
  getUser,
  setAccessToken,
  setRefreshToken,
  setUser,
  clearAuthInfo
}
