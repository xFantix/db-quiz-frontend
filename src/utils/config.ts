// const prod = {
//   apiUrl: '',
//   socketUrl: '',
// };

const local = {
  apiUrl: 'http://localhost:8000',
  socketUrl: 'ws://localhost:8001',
};

const config = {
  ...local,
};

export default {
  api: {
    endpoints: {
      auth: {
        login: '/user/login',
        refreshToken: '/user/refreshToken',
      },
      user: {
        addUser: '/user/register',
        removeUser: (id: number) => `/group/remove-user/${id}/`,
        allUsers: '/user/all',
        updateUser: (id: number) => `/user/update-user/${id}`,
      },
      questions: {
        allQuestions: '/question/all',
      },
      quizDatabase: {
        configure: 'quiz-database/configuration',
      },
      group: {
        group: (id: number) => `/group/${id}/`,
        allGroups: '/group/all',
        addGroup: '/group/add',
        removeGroup: (id: number) => `/group/remove/${id}/`,
        addUsersFromFile: '/user/registerByCSV/',
        reminderMessage: (id: number) => `/group/email-reminder/${id}`,
        passwordMessageToGroup: (id: number) =>
          `/group/email-password/group/${id}`,
        passwordMessageToUser: (id: number) =>
          `/group/email-password/user/${id}`,
      },
    },
  },
  routes: {
    login: '/user/login',
    dashboard: '/dashboard',
    group: '/group/:id',
    configuration: '/configuration',
  },
  ...config,
};
