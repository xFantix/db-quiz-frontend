import { createAsyncThunk } from "@reduxjs/toolkit";
import { errorHandler } from "../hooks";
import { groupService } from "../../services/group.service";
import { AddGroupData } from "../../types/services/group";

const getAllGroups = createAsyncThunk("group/getAll", () => {
  return groupService
    .getAllGroups()
    .then((data) => data)
    .catch((err) =>
      errorHandler(err.response.data.message || err.response.data.error)
    );
});

const addGroup = createAsyncThunk("group/addGroup", (data: AddGroupData) => {
  return groupService
    .addGroup(data)
    .then((data) => data)
    .catch((err) =>
      errorHandler(err.response.data.message || err.response.data.error)
    );
});

const removeGroup = createAsyncThunk("group/removeGroup", (id: number) => {
  return groupService
    .removeGroup(id)
    .then(() => id)
    .catch((err) =>
      errorHandler(err.response.data.message || err.response.data.error)
    );
});

const addUsersFromFile = createAsyncThunk(
  "group/addUsersFromFile",
  (data: FormData, { dispatch }) => {
    return groupService
      .addUsersFromFile(data)
      .then((data) => {
        dispatch(getAllGroups());
        return data;
      })
      .catch((err) =>
        errorHandler(err.response.data.message || err.response.data.error)
      );
  }
);

export const groupActions = {
  getAllGroups,
  addGroup,
  removeGroup,
  addUsersFromFile,
};
