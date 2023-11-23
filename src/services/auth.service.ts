import { LoginForm, LoginRequest } from '../types/services/auth';
import http from '../utils/api';
import config from '../utils/config';

const login = (loginFormData: LoginForm) => {
  return http
    .post<LoginRequest>(config.api.endpoints.auth.login, loginFormData)
    .then((res) => res.data);
};

const refreshToken = (token: string) => {
  return http
    .post<Pick<LoginRequest, 'accessToken'>>(
      config.api.endpoints.auth.refreshToken,
      { token },
    )
    .then((res) => res.data);
};

export const authService = {
  login,
  refreshToken,
};
