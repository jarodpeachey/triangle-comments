import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import GoTrue from 'gotrue-js';

export const AuthContext = React.createContext({});

export const AuthProvider = ({ children }) => {
  const [signedIn, setSignedInState] = useState(false);
  const [user, setUser] = useState(false);

  console.log('Signed In: ', signedIn);

  useEffect(() => {
    console.log(auth);
    console.log(auth.currentUser());
    // if (localStorage.getItem("signedIn")) {

    // }
    if (user !== auth.currentUser() && auth.currentUser() !== null) {
      console.log('Setting user?');
      setUser(auth.currentUser());
      setSignedInState(true);

      typeof localStorage !== 'undefined' && localStorage.setItem('signedIn', true);
      typeof localStorage !== 'undefined' && localStorage.setItem('user', auth.currentUser());
    } else {
      typeof localStorage !== 'undefined' && localStorage.setItem('signedIn', false);
      typeof localStorage !== 'undefined' && localStorage.setItem('user', false);
    }
  });

  const auth = new GoTrue({
    APIUrl: 'https://trianglecomments.netlify.app/.netlify/identity',
    audience: '',
    setCookie: true
  });

  const ctx = {
    auth,
    signedIn,
    user,
  };

  return (
    <AuthContext.Provider value={{ ...ctx }}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.any.isRequired
};
