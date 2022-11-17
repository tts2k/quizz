import axios from "axios";
import httpStatus from "http-status";
import api from "./api";
import config from "./config";
import router from "../router/router";
import localStorageService from "../services/localStorageService";

const axiosInstance = axios.create({
  baseURL: config.baseUrl,
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${localStorageService.getAccessToken()}`
  }
});

axiosInstance.interceptors.request.use(async req => {
  const accessToken = localStorageService.getAccessToken();
  const refreshToken = localStorageService.getRefreshToken();

  if (accessToken)
    return req;

  if (refreshToken) {
    try {
      const res = await axios.post(api.refreshTokens, {
        "refreshTokens": refreshToken
      })
      localStorageService.setAccessToken(res.data.data.tokens.access.token);
      localStorageService.setRefreshToken(res.data.data.tokens.refresh.token);
      req.headers.Authorization = `Bearer ${accessToken}`;
    } catch (error) {
      return Promise.reject(error);
    }
  }
  else {
    return req;
  }
},
error => {
  Promise.reject(error)
});

axiosInstance.interceptors.response.use(res => {
  return res;
}, async err => {

  if (err.response.status === httpStatus.UNAUTHORIZED) {
    localStorageService.clearAuthInfo();
    const pathname = window.location.pathname;
    if (pathname === '/login' || pathname === '/register' || pathname === '/forgot') {
      router.navigate('/login');
    }
  }

  return Promise.reject(err);
});

export default axiosInstance;
