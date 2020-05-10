export default {
  getUsers: (includeDisabled) => `/api/user?includeDisabled=${includeDisabled}`,
  getUserRoles: () => '/api/user/roles',
  updateUser: (user) => `/api/user/${user.id}`,
  login: () => '/api/auth/login',
  refreshToken: () => '/api/auth/refresh',
};
