/* eslint-disable import/prefer-default-export */
export const isBrowser = () => {
  if (typeof window !== 'undefined') {
    return true;
  }

  return false;
};
