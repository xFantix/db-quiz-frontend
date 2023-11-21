import { AddGroupData, GroupList } from "../types/services/group";
import http from "../utils/api";
import config from "../utils/config";

const getAllGroups = () => {
  return http
    .get<GroupList[]>(config.api.endpoints.group.allGroups)
    .then((res) => res.data);
};

const addGroup = (data: AddGroupData) => {
  return http
    .post<GroupList>(config.api.endpoints.group.addGroup, data)
    .then((res) => res.data);
};

const removeGroup = (id: number) => {
  return http
    .delete(config.api.endpoints.group.removeGroup(id))
    .then((res) => res.data);
};

const addUsersFromFile = (payload: FormData) => {
  return http
    .post<GroupList[]>(config.api.endpoints.group.addUsersFromFile, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res.data);
};

export const groupService = {
  getAllGroups,
  addGroup,
  removeGroup,
  addUsersFromFile,
};
