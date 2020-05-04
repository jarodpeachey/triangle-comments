import React, { useState, useContext, useEffect } from 'react';
import faunadb, { query as q } from 'faunadb';
import { AppContext } from './AppProvider';
import { isBrowser } from '../utils/isBrowser';
import { FirebaseContext } from './FirebaseProvider';
import { setCookie, getCookie } from '../utils/cookies';

export const DatabaseContext = React.createContext({});

export const DatabaseReducer = (state, action) => {
  switch (action.type) {
    case 'login': {
      isBrowser() &&
        localStorage.setItem('faunaUser', JSON.stringify(action.data.user));

      if (isBrowser()) {
        setCookie('user_secret', action.data.secret);
        window.location.pathname = '/dashboard';
      }
      return {
        user: action.data.user,
        userClient: new faunadb.Client({
          secret: action.data.secret,
        }),
      };
    }
    case 'register': {
      console.log(action.data);

      isBrowser() &&
        localStorage.setItem('faunaUser', JSON.stringify(action.data.user));

      if (isBrowser()) {
        setCookie('user_secret', action.data.secret);
        // window.location.pathname = '/dashboard';
      }

      return {
        user: action.data.user,
        userClient: new faunadb.Client({
          secret: action.data.secret,
        }),
      };
    }
    case 'logout': {
      isBrowser() && localStorage.removeItem('faunaUser');
      return { user: null };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

export const DatabaseProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(DatabaseReducer, { user: null });

  useEffect(() => {
    if (isBrowser() && localStorage.getItem('firebaseUser') && getCookie('user_secret')) {
      // const newUser = localStorage.getItem('faunaUser');

      // console.log(newUser);

      serverClient
        .query(q.Get(q.Match(q.Index('user_by_id'), getCookie('user_id'))))
        .then((response) => {
          console.log(response);
          dispatch({
            type: 'register',
            data: {
              secret: getCookie('user_secret'),
              user: response,
            },
          });
        })
        .catch((faunaErr) => {
          console.log(faunaErr);
        });
    }
  }, []);

  const serverClient = new faunadb.Client({
    secret: 'fnADq29sx9ACE4FItI0Ps8suOAzL0UHyqDNFNjgV',
  });

  // Test user-based API keys
  // const serverClient = new faunadb.Client({
  //   secret: 'fnEDqdzwZlACEwOmCb0MkAIUAZG495CG3qRDCymFnbIZREOrEFc',
  // });

  const ctx = {
    serverClient,
    q,
    state,
    dispatch,
  };

  return (
    <DatabaseContext.Provider value={{ ...ctx }}>
      {children}
    </DatabaseContext.Provider>
  );
};

export const DatabaseConsumer = DatabaseContext.Consumer;
