export default {
  getUsers: () => '/api/user',
  upateUser: (user) => `/api/user/${user.id}`,
  login: () => '/api/auth/login',
};
