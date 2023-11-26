import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User, UserStore } from '../../types/store/userSlice.types';
import { userActions } from './user.actions';
import { LoginRequest } from '../../types/services/auth';
import {
  getLocalStorageUser,
  setLocalStorageTokens,
  setLocalStorageUser,
} from '../../utils/auth';
import { history } from '../../utils/history';
import config from '../../utils/config';

const emptyUser = {
  email: '',
  groupId: 0,
  id: 0,
  index_umk: 0,
  isAdmin: false,
  name: '',
  surname: '',
};
const user = getLocalStorageUser() || emptyUser;

const initialState: UserStore = {
  userInformation: user,
  allUsers: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveUser: (store: UserStore, action: PayloadAction<User>) => {
      store.userInformation = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      userActions.loginUser.fulfilled,
      (store: UserStore, action: PayloadAction<LoginRequest>) => {
        store.userInformation = action.payload.user;
        setLocalStorageUser(action.payload.user);
        setLocalStorageTokens({
          accessToken: action.payload.accessToken,
          refreshToken: action.payload.refreshToken,
        });
        history.push(config.routes.dashboard);
      },
    );
    builder.addCase(
      userActions.getAllUsers.fulfilled,
      (store: UserStore, action: PayloadAction<Omit<User, 'isAdmin'>[]>) => {
        store.allUsers = action.payload;
      },
    );
  },
});

export default userSlice.reducer;
export const { saveUser } = userSlice.actions;
