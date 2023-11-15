import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { GroupStore } from "../../types/store/groupSlice.types";
import { groupActions } from "./group.actions";
import { GroupList } from "../../types/services/group";

const initialState: GroupStore = {
  groups: [],
};

export const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      groupActions.getAllGroups.fulfilled,
      (store: GroupStore, action: PayloadAction<GroupList[]>) => {
        store.groups = action.payload;
      }
    );
  },
});

export default groupSlice.reducer;
// export const { saveUser } = userSlice.actions;
