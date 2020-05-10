import cookie from 'react-cookies';

const refreshTokenName = 'refreshToken';
const tokenName = 'token';
const defaultExpiry = 60 * 24 * 30; //30 days

export function setCookie(name, value, expiryMinutes) {
  const options = {
    path: '/',
    //domain: 'https://*.yourdomain.com' //TODO: This should be set in prod once domain is available
    secure: process.env.NODE_ENV === 'production',
    expires: new Date(Date.now() + 1000 * 60 * expiryMinutes),
  };
  cookie.save(name, value, options);
}

export function getToken() {
  return cookie.load(tokenName);
}

export function getRefreshToken() {
  return cookie.load(refreshTokenName);
}

export function setToken(value) {
  setCookie(tokenName, value, defaultExpiry);
}

export function setRefreshToken(value) {
  setCookie(refreshTokenName, value, defaultExpiry);
}

export function clearCookies() {
  cookie.remove(tokenName);
  cookie.remove(refreshTokenName);
}
