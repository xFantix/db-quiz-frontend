import { User } from "../store/userSlice.types";

export interface GroupList {
  id: number;
  name: string;
  startTimeQuiz: string;
  endTimeQuiz: string;
  users: User[];
}
