/* eslint-disable import/prefer-default-export */
export const isBrowser = () => {
  return typeof window.location !== 'undefined';
};
