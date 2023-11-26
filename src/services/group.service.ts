import {
  AddGroupData,
  AddUserToGroup,
  GroupList,
} from '../types/services/group';
import { User } from '../types/store/userSlice.types';
import http from '../utils/api';
import config from '../utils/config';

const getAllGroups = () => {
  return http
    .get<GroupList[]>(config.api.endpoints.group.allGroups)
    .then((res) => res.data);
};

const addGroup = (data: AddGroupData) => {
  return http
    .post<GroupList>(config.api.endpoints.group.addGroup, data)
    .then((res) => res.data);
};

const removeGroup = (id: number) => {
  return http
    .delete(config.api.endpoints.group.removeGroup(id))
    .then((res) => res.data);
};

const addUsersFromFile = (payload: FormData) => {
  return http
    .post<GroupList[]>(config.api.endpoints.group.addUsersFromFile, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => res.data);
};

const sendReminderEmail = (id: number) => {
  return http
    .post(config.api.endpoints.group.reminderMessage(id), { id })
    .then((res) => res.data);
};

const sendPasswordEmail = (id: number) => {
  return http
    .post(config.api.endpoints.group.passwordMessage(id), { id })
    .then((res) => res.data);
};

const addUserToGroup = (data: AddUserToGroup) => {
  return http
    .post<Omit<User, 'isAdmin'>>(config.api.endpoints.user.addUser, {
      ...data,
      isAdmin: false,
    })
    .then((res) => res.data);
};

const getGroup = (id: number) => {
  return http
    .get<GroupList>(config.api.endpoints.group.group(id))
    .then((res) => res.data);
};

export const groupService = {
  getAllGroups,
  addGroup,
  removeGroup,
  addUsersFromFile,
  sendReminderEmail,
  sendPasswordEmail,
  addUserToGroup,

  getGroup,
};
