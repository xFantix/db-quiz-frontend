import { User } from '../store/userSlice.types';

export interface GroupList {
  id: number;
  name: string;
  time: number;
  startTimeQuiz: string;
  endTimeQuiz: string;
  users: Omit<User, 'isAdmin'>[];
}

export interface AddGroupData {
  name: string;
  time: number;
  startTimeQuiz: string;
  endTimeQuiz: string;
}

export interface AddUserToGroup extends Omit<User, 'id' | 'isAdmin'> {
  password: string;
  userId?: number;
}

export interface UpdateUserData {
  id: number;
  groupId: number;
}
