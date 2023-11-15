import { createAsyncThunk } from "@reduxjs/toolkit";
import { errorHandler } from "../hooks";
import { groupService } from "../../services/group.service";

const getAllGroups = createAsyncThunk("group/getAll", () => {
  return groupService
    .getAllGroups()
    .then((data) => data)
    .catch((err) =>
      errorHandler(err.response.data.message || err.response.data.error)
    );
});

export const groupActions = {
  getAllGroups,
};
