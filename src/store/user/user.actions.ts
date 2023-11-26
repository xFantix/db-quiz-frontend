import { createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from '../../services/auth.service';
import { LoginForm } from '../../types/services/auth';
import { errorHandler } from '../hooks';
import { userService } from '../../services/user.service';

const loginUser = createAsyncThunk('user/loginUser', (data: LoginForm) => {
  return authService
    .login(data)
    .then((data) => data)
    .catch((err) =>
      errorHandler(err.response.data.message || err.response.data.error),
    );
});

const getAllUsers = createAsyncThunk('user/getAllUsers', () => {
  return userService
    .getAllUsers()
    .then((data) => data)
    .catch((err) =>
      errorHandler(err.response.data.message || err.response.data.error),
    );
});

export const userActions = {
  loginUser,
  getAllUsers,
};
