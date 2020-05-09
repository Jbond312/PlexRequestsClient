import cookie from 'react-cookies';

export function setCookie(name, value, expiryMinutes) {
  const options = {
    path: '/',
    //domain: 'https://*.yourdomain.com' //TODO: This should be set in prod once domain is available
    secure: process.env.NODE_ENV === 'production',
    expires: new Date(Date.now() + 1000 * 60 * expiryMinutes),
  };
  cookie.save(name, value, options);
}

export function getCookie(name) {
  return cookie.load(name);
}
