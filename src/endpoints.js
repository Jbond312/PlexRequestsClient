export default {
  getUsers: (includeDisabled) => `/api/user?includeDisabled=${includeDisabled}`,
  upateUser: (user) => `/api/user/${user.id}`,
  login: () => '/api/auth/login',
  refreshToken: () => '/api/auth/refresh',
};
