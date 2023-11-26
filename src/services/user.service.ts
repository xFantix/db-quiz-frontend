import { User } from '../types/store/userSlice.types';
import http from '../utils/api';
import config from '../utils/config';

const removeUserFromGroup = (id: number) => {
  return http
    .delete<Omit<User, 'isAdmin'>>(config.api.endpoints.user.removeUser(id))
    .then((res) => res.data);
};

const getAllUsers = () => {
  return http
    .get<Omit<User, 'isAdmin'>[]>(config.api.endpoints.user.allUsers)
    .then((res) => res.data);
};

const changeUserData = (id: number, groupId: number) => {
  return http
    .post<Omit<User, 'isAdmin'>>(config.api.endpoints.user.updateUser(id), {
      groupId,
    })
    .then((res) => res.data);
};

export const userService = {
  removeUserFromGroup,
  getAllUsers,
  changeUserData,
};
