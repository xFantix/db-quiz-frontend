import { User } from '../store/userSlice.types';

export interface GroupList {
  id: number;
  name: string;
  startTimeQuiz: string;
  endTimeQuiz: string;
  users: User['id'][];
}

export interface AddGroupData {
  name: string;
  startTimeQuiz: string;
  endTimeQuiz: string;
}

export interface AddUserToGroup extends Omit<User, 'id' | 'isAdmin'> {
  password: string;
}
