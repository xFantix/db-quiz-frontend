import axios from 'axios';
import { history } from './history';
import {
  getLocalStorageTokens,
  removeLocalStorageUser,
  setLocalStorageTokens,
} from './auth';
import config from './config';
import { authService } from '../services/auth.service';

const http = axios.create({
  baseURL: config.apiUrl,
  headers: { 'Content-Type': 'application/json' },
});

http.interceptors.request.use(
  (config) => {
    const tokens = getLocalStorageTokens();
    if (tokens) config.headers.Authorization = `Bearer ${tokens.accessToken}`;
    return config;
  },
  (error) => Promise.reject(error),
);

http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 500 || error?.response?.status === 404)
      return Promise.reject(null);
    else if (error?.response?.status === 403) {
      const tokens = getLocalStorageTokens();

      if (tokens?.refreshToken) {
        return authService
          .refreshToken(tokens.refreshToken)
          .then((data) => {
            setLocalStorageTokens({ ...tokens, accessToken: data.accessToken });
            error.config?.headers &&
              (error.config.headers.Authorization = `Bearer ${data.accessToken}`);
            return axios.request(error.config);
          })
          .catch(() => {
            removeLocalStorageUser();
            history.push(config.routes.login);
          });
      } else {
        removeLocalStorageUser();
        history.push(config.routes.login);
      }
    }
    return Promise.reject(error);
  },
);

export default http;
