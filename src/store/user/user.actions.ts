import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthService } from "../../services/auth.service";
import { LoginForm } from "../../types/services/auth";
import { errorHandler } from "../hooks";

const loginUser = createAsyncThunk("user/loginUser", (data: LoginForm) => {
  return AuthService.login(data)
    .then((data) => data)
    .catch((err) =>
      errorHandler(err.response.data.message || err.response.data.error)
    );
});

export const userActions = {
  loginUser,
};
