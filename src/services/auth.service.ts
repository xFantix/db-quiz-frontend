import { LoginForm, LoginRequest } from "../types/services/auth";
import http from "../utils/api";
import config from "../utils/config";

const login = (loginFormData: LoginForm) => {
  return http
    .post<LoginRequest>(config.api.endpoints.auth.login, loginFormData)
    .then((res) => res.data);
};

export const AuthService = {
  login,
};
