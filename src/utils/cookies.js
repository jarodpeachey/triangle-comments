import { isBrowser } from './isBrowser';

/* eslint-disable import/prefer-default-export */
export const setCookie = (name, value) => {
  if (isBrowser()) {
    document.cookie = `${name}=${value}`;
  }
};

export const getCookie = (cookieName) => {
  const name = `${cookieName}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');

  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }

  return '';
};
