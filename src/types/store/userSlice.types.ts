export interface User {
  email: string;
  groupId: number;
  id: number;
  index_umk: number;
  isAdmin: boolean;
  name: string;
  surname: string;
}

export interface UserStore {
  userInformation: User;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}
