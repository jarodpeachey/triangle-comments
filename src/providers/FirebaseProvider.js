import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import firebaseConfig from '../../firebaseConfig';

export const FirebaseContext = React.createContext({});

export const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [signedIn, setSignedIn] = useState(false);

  firebase.initializeApp(firebaseConfig);

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log('User is signed in!', user);
      setUser(user);
      setSignedIn(true);
    } else {
      console.log('User is not signed in!', user);
      setUser(user);
      setSignedIn(false);
    }
  });

  const ctx = {
    firebase,
    signedIn,
    user,
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
