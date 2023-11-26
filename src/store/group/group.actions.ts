import { createAsyncThunk } from '@reduxjs/toolkit';
import { errorHandler } from '../hooks';
import { groupService } from '../../services/group.service';
import {
  AddGroupData,
  AddUserToGroup,
  UpdateUserData,
} from '../../types/services/group';
import { userService } from '../../services/user.service';

const getAllGroups = createAsyncThunk('group/getAll', () => {
  return groupService
    .getAllGroups()
    .then((data) => data)
    .catch((err) =>
      errorHandler(err.response.data.message || err.response.data.error),
    );
});

const addGroup = createAsyncThunk('group/addGroup', (data: AddGroupData) => {
  return groupService
    .addGroup(data)
    .then((data) => data)
    .catch((err) =>
      errorHandler(err.response.data.message || err.response.data.error),
    );
});

const removeGroup = createAsyncThunk('group/removeGroup', (id: number) => {
  return groupService
    .removeGroup(id)
    .then(() => id)
    .catch((err) =>
      errorHandler(err.response.data.message || err.response.data.error),
    );
});

const addUsersFromFile = createAsyncThunk(
  'group/addUsersFromFile',
  (data: FormData, { dispatch }) => {
    return groupService
      .addUsersFromFile(data)
      .then((data) => {
        dispatch(getAllGroups());
        return data;
      })
      .catch((err) =>
        errorHandler(err.response.data.message || err.response.data.error),
      );
  },
);

const sendReminderEmail = createAsyncThunk(
  'group/sendReminderEmail',
  (id: number) => {
    return groupService
      .sendReminderEmail(id)
      .catch((err) =>
        errorHandler(err.response.data.message || err.response.data.error),
      );
  },
);

const sendPasswordEmail = createAsyncThunk(
  'group/sendPasswordEmail',
  (id: number) => {
    return groupService
      .sendPasswordEmail(id)
      .catch((err) =>
        errorHandler(err.response.data.message || err.response.data.error),
      );
  },
);

const addUserToGroup = createAsyncThunk(
  'group/addUserToGroup',
  (data: AddUserToGroup) => {
    return groupService
      .addUserToGroup(data)
      .then((data) => data)
      .catch((err) =>
        errorHandler(err.response.data.message || err.response.data.error),
      );
  },
);

const getGroup = createAsyncThunk('group/getGroup', (id: number) => {
  return groupService
    .getGroup(id)
    .then((data) => data)
    .catch((err) =>
      errorHandler(err.response.data.message || err.response.data.error),
    );
});

const removeUserFromGroup = createAsyncThunk(
  'group/removeUserFromGroup',
  (id: number) => {
    return userService
      .removeUserFromGroup(id)
      .then((data) => data)
      .catch((err) =>
        errorHandler(err.response.data.message || err.response.data.error),
      );
  },
);

const changeUserData = createAsyncThunk(
  'group/addUserToGroup',
  ({ id, groupId }: UpdateUserData, { dispatch }) => {
    return userService
      .changeUserData(id, groupId)
      .then((data) => {
        dispatch(getGroup(groupId));
        return data;
      })
      .catch((err) =>
        errorHandler(err.response.data.message || err.response.data.error),
      );
  },
);

export const groupActions = {
  getAllGroups,
  addGroup,
  removeGroup,
  addUsersFromFile,
  sendPasswordEmail,
  sendReminderEmail,
  addUserToGroup,
  removeUserFromGroup,
  getGroup,
  changeUserData,
};
