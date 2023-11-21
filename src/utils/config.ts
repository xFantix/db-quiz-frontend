const prod = {
  apiUrl: "",
  socketUrl: "",
};

const local = {
  apiUrl: "http://localhost:8000",
  socketUrl: "ws://localhost:8001",
};

const config = {
  ...local,
};

export default {
  api: {
    endpoints: {
      auth: {
        login: "/user/login",
        refreshToken: "/user/refreshToken",
      },
      group: {
        allGroups: "/group/all",
        addGroup: "/group/add",
        removeGroup: (id: number) => `/group/remove/${id}/`,
        addUsersFromFile: "/user/registerByCSV/",
      },
    },
  },
  routes: {
    login: "/user/login",
    dashboard: "/dashboard",
    group: (id: number) => `/group/${id}`,
  },
  ...config,
};
