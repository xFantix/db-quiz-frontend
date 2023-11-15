import { User } from "../store/userSlice.types";

export interface LoginForm {
  email: string;
  password: string;
}

export interface LoginRequest {
  user: User;
  accessToken: string;
  refreshToken: string;
}
