export default {
  getUsers: () => '/api/users',
  upateUser: (user) => `/api/users/${user.id}`,
  login: () => '/api/auth/login',
};
