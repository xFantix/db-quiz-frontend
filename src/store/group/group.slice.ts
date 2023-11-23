import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { GroupStore } from '../../types/store/groupSlice.types';
import { groupActions } from './group.actions';
import { GroupList } from '../../types/services/group';

const initialState: GroupStore = {
  groups: [],
};

export const groupSlice = createSlice({
  name: 'group',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      groupActions.getAllGroups.fulfilled,
      (store: GroupStore, action: PayloadAction<GroupList[]>) => {
        store.groups = action.payload;
      },
    ),
      builder.addCase(
        groupActions.addGroup.fulfilled,
        (store: GroupStore, action: PayloadAction<GroupList>) => {
          console.log(action.payload);
          store.groups = [...store.groups, action.payload];
        },
      ),
      builder.addCase(
        groupActions.removeGroup.fulfilled,
        (store: GroupStore, action: PayloadAction<number>) => {
          store.groups = store.groups.filter((el) => el.id !== action.payload);
        },
      );
    // builder.addCase(
    //   groupActions.addUserToGroup.fulfilled,
    //   (store: GroupStore, action: PayloadAction<User>) => {
    //     store.groups.users = [];
    //   },
    // );
  },
});

export default groupSlice.reducer;
