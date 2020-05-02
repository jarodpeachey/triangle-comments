import React, { useState, useContext } from 'react';
import faunadb, { query as q } from 'faunadb';
import { AppContext } from './AppProvider';
import { isBrowser } from '../utils/isBrowser';
import { FirebaseContext } from './FirebaseProvider';
import { setCookie } from '../utils/cookies';

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

  if (isBrowser() && localStorage.getItem('faunaUser')) {
    const newUser = localStorage.getItem('faunaUser');
    dispatch({
      type: 'login',
      data: JSON.parse(newUser),
    });
  }

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
