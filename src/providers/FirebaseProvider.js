import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import firebaseConfig from '../../firebaseConfig';
import { isBrowser } from '../utils/isBrowser';

export const FirebaseContext = React.createContext({});

export const FirebaseProvider = ({ children }) => {
  if (isBrowser() && firebase.apps.length === 0) {
    isBrowser() && firebase.initializeApp(firebaseConfig);
  }

  isBrowser() && isBrowser() && firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      isBrowser() && localStorage.setItem('user', JSON.stringify(user));
    } else {
      isBrowser() && localStorage.setItem('user', JSON.stringify(user));
    }
  });

  const ctx = {
    firebase
  };

  return (
    <FirebaseContext.Provider value={{ ...ctx }}>
      {children}
    </FirebaseContext.Provider>
  );
};

FirebaseProvider.propTypes = {
  children: PropTypes.any.isRequired,
};
