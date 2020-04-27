import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import firebaseConfig from '../../firebaseConfig';
import { isBrowser } from '../utils/isBrowser';
import { AppContext } from './AppProvider';

export const FirebaseContext = React.createContext({});

export const FirebaseProvider = ({ children }) => {
  const { setSignedIn, setShouldUpdate } = useContext(AppContext);
  const [firebaseUser, setFirebaseUser] = useState(null);

  if (isBrowser() && firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }

  isBrowser() &&
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setSignedIn(true);
        localStorage.setItem('firebaseUser', JSON.stringify(user));
        setFirebaseUser(user);
      } else {
        setSignedIn(false);
        localStorage.removeItem('firebaseUser');
        setFirebaseUser(null);
      }
    });

  const ctx = {
    firebase,
    firebaseUser,
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
