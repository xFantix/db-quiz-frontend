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
      },
      group: {
        allGroups: "/group/all",
      },
    },
  },
  routes: {
    login: "/user/login",
    dashboard: "/dashboard",
  },
  ...config,
};
