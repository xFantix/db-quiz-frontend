import { Tokens, User } from '../types/store/userSlice.types';

export const getLocalStorageUser = () => {
  if (localStorage.getItem('user') !== null)
    return JSON.parse(localStorage.getItem('user') as string) as User;
  return null;
};

export const getLocalStorageTokens = () => {
  if (localStorage.getItem('tokens') !== null)
    return JSON.parse(localStorage.getItem('tokens') as string) as Tokens;
  return null;
};

export const setLocalStorageTokens = (tokens: Tokens) => {
  return localStorage.setItem('tokens', JSON.stringify(tokens));
};

export const setLocalStorageUser = (user: User) => {
  return localStorage.setItem('user', JSON.stringify(user));
};

export const removeLocalStorageUser = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('tokens');
};

export const isUserAuthenticated = () => {
  return getLocalStorageUser() !== null;
};
