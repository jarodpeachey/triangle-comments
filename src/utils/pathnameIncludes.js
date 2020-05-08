import { isBrowser } from './isBrowser';

/* eslint-disable import/prefer-default-export */
export const pathnameIncludes = (string) => {
  if (typeof window !== 'undefined') {
    if (isBrowser() && window.location.pathname.includes(string)) return true;
  }

  return false;
};
