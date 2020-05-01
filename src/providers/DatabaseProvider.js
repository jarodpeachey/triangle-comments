import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import faunadb, { query as q } from 'faunadb';
import { AppContext } from './AppProvider';
import { isBrowser } from '../utils/isBrowser';
import { FirebaseContext } from './FirebaseProvider';

export const DatabaseContext = React.createContext({});

export const DatabaseProvider = ({ children, firebase }) => {
  const { signedIn } = useContext(AppContext);
  const { firebaseUser } = useContext(FirebaseContext);
  const [faunaUser, setFaunaUser] = useState(null);

  useEffect(() => {
    console.log(firebaseUser);
    console.log(signedIn);
    if (signedIn) {
      const UID = firebase.firebaseUser && firebase.firebaseUser.uid;

      console.log(UID);
      serverClient
        .query(q.Get(q.Match(q.Index('user_by_id'), isBrowser() && UID)))
        .then((response) => {
          setFaunaUser(response);
          isBrowser() &&
            localStorage.setItem('faunaUser', JSON.stringify(response));
          console.log(response);
        })
        .catch((err) => console.log(err));
    } else {
      setFaunaUser(null);
      isBrowser() && localStorage.removeItem('faunaUser');
    }
  }, [firebase]);

  const adminClient = new faunadb.Client({
    secret: 'fnADqyhQ_dACEqW98J7zPaAqjOCJnTaLptiJ9Dzh',
  });

  const serverClient = new faunadb.Client({
    secret: 'fnADqyhZfWACFCX6hpVHgl9jV0TKx1IgS_99o4h-',
  });

  // Test user-based API keys
  // const serverClient = new faunadb.Client({
  //   secret: 'fnEDqdzwZlACEwOmCb0MkAIUAZG495CG3qRDCymFnbIZREOrEFc',
  // });

  const ctx = {
    adminClient,
    serverClient,
    q,
    faunaUser,
  };

  return (
    <DatabaseContext.Provider value={{ ...ctx }}>
      {children}
    </DatabaseContext.Provider>
  );
};

DatabaseProvider.propTypes = {
  children: PropTypes.any.isRequired,
};
