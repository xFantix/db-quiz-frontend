import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { GroupStore } from '../../types/store/groupSlice.types';
import { groupActions } from './group.actions';
import { GroupList } from '../../types/services/group';
import { User } from '../../types/store/userSlice.types';

const initialState: GroupStore = {
  groups: [],
  group: null,
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
    builder.addCase(
      groupActions.getGroup.fulfilled,
      (store: GroupStore, action: PayloadAction<GroupList>) => {
        store.group = action.payload;
      },
    );
    builder.addCase(
      groupActions.addUserToGroup.fulfilled,
      (store: GroupStore, action: PayloadAction<Omit<User, 'isAdmin'>>) => {
        if (store.group?.users) {
          store.group.users = [...store.group.users, action.payload];
        }
      },
    );
    builder.addCase(
      groupActions.removeUserFromGroup.fulfilled,
      (store: GroupStore, action: PayloadAction<Omit<User, 'isAdmin'>>) => {
        if (store.group)
          store.group = {
            ...store.group,
            users: store.group?.users.filter(
              (user) => user.id !== action.payload.id,
            ),
          };
      },
    );
  },
});

export default groupSlice.reducer;
