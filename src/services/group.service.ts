import { GroupList } from "../types/services/group";
import http from "../utils/api";
import config from "../utils/config";

const getAllGroups = () => {
  return http
    .get<GroupList[]>(config.api.endpoints.group.allGroups)
    .then((res) => res.data);
};

export const groupService = {
  getAllGroups,
};
