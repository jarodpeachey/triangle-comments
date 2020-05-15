import React, { useState, useContext, useEffect } from 'react';
import faunadb, { query as q } from 'faunadb';
import { AppContext } from './AppProvider';
import { isBrowser } from '../utils/isBrowser';
import { setCookie, getCookie, deleteCookie } from '../utils/cookies';

export const DatabaseContext = React.createContext({});

export const DatabaseReducer = (state, action) => {
  switch (action.type) {
    case 'login': {
      isBrowser() &&
        localStorage.setItem('faunaUser', JSON.stringify(action.data.user));

      if (isBrowser()) {
        setCookie('user_secret', action.data.secret);
        setCookie('user_id', action.data.user.data.id);
      }
      return {
        ...state,
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
        ...state,
        user: action.data.user,
        userClient: new faunadb.Client({
          secret: action.data.secret,
        }),
      };
    }
    case 'logout': {
      isBrowser() && localStorage.removeItem('faunaUser');
      if (isBrowser()) {
        deleteCookie('user_secret');
        deleteCookie('user_id');
        deleteCookie('site_secret');
        deleteCookie('site_id');
        // window.location.pathname = '/dashboard';
      }
      return { ...state, user: null, userClient: null };
    }
    case 'loginSite': {
      isBrowser() &&
        localStorage.setItem('site', JSON.stringify(action.data.site));

      if (isBrowser()) {
        setCookie('site_secret', action.data.secret);
        setCookie('site_id', action.data.site.data.id);
      }

      const siteClient = new faunadb.Client({
        secret: action.data.secret,
      });

      // siteClient
      //   .query(
      //     q.Map(
      //       [
      //         [
      //           'Jarod (Founder)',
      //           'Hey! Welcome to this comment. It\'s a long one, because I need to test the ability to shorten it so the table actually works.',
      //           new Date().getTime(),
      //           '/10-best-things-about-javascript',
      //           false,
      //           state.user,
      //           action.data.site,
      //         ],
      //         [
      //           'Jarod (Founder)',
      //           'Hey! Welcome to this comment. It\'s a long one, because I need to test the ability to shorten it so the table actually works.',
      //           new Date().getTime(),
      //           '/styled-components',
      //           true,
      //           state.user,
      //           action.data.site,
      //         ],
      //         [
      //           'Jarod (Founder)',
      //           'Hey! Welcome to this comment. It\'s a long one, because I need to test the ability to shorten it so the table actually works.',
      //           new Date().getTime(),
      //           '/10-programming-languages',
      //           true,
      //           state.user,
      //           action.data.site,
      //         ],
      //         [
      //           'Jarod (Founder)',
      //           'Hey! Welcome to this comment. It\'s a long one, because I need to test the ability to shorten it so the table actually works.',
      //           new Date().getTime(),
      //           '/best-react-tools',
      //           false,
      //           state.user,
      //           action.data.site,
      //         ],
      //         [
      //           'Jarod (Founder)',
      //           'Hey! Welcome to this comment. It\'s a long one, because I need to test the ability to shorten it so the table actually works.',
      //           new Date().getTime(),
      //           '/10-best-things-about-javascript',
      //           false,
      //           state.user,
      //           action.data.site,
      //         ],
      //       ],
      //       q.Lambda(
      //         'data',
      //         q.Call(
      //           q.Function('create_comment'),
      //           q.Select(0, q.Var('data')),
      //           q.Select(1, q.Var('data')),
      //           q.Select(2, q.Var('data')),
      //           q.Select(3, q.Var('data')),
      //           q.Select(4, q.Var('data')),
      //           q.Select(5, q.Var('data')),
      //           q.Select(6, q.Var('data'))
      //         )
      //       )
      //     )
      //   )
      //   .then((res) => console.log(res))
      //   .catch((err) => console.log(err));

      return {
        ...state,
        site: action.data.site,
        siteClient,
      };
    }
    case 'updateSite': {
      isBrowser() && localStorage.setItem('site', JSON.stringify(action.data));

      if (isBrowser()) {
        setCookie('site_id', action.data.data.id);
      }

      return {
        ...state,
        site: action.data,
      };
    }
    case 'logoutSite': {
      isBrowser() && localStorage.removeItem('site');

      console.log(state);

      if (state.siteClient) {
        state.siteClient
          .query(q.Logout(false))
          .then((repsonse) => console.log(repsonse))
          .catch((err) => console.log(err));
      }

      if (isBrowser()) {
        deleteCookie('site_secret');
        deleteCookie('site_id');
      }

      return {
        ...state,
        site: null,
        siteClient: null,
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

export const DatabaseProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(DatabaseReducer, {});
  const { signedIn } = useContext(AppContext);

  useEffect(() => {
    if (
      isBrowser() &&
      localStorage.getItem('firebaseUser') &&
      getCookie('user_secret') &&
      getCookie('user_id')
    ) {
      // const newUser = localStorage.getItem('faunaUser');

      // console.log(newUser);

      serverClient
        .query(q.Get(q.Match(q.Index('user_by_id'), getCookie('user_id'))))
        .then((response) => {
          console.log(response);
          dispatch({
            type: 'login',
            data: {
              secret: getCookie('user_secret'),
              user: response,
            },
          });
        })
        .catch((faunaErr) => {
          console.log(faunaErr);
        });
    } else if (
      isBrowser() &&
      localStorage.getItem('firebaseUser') &&
      getCookie('user_id')
    ) {
      console.log('User id found, user secret not found. Fetching user secret');
      // Login user and get new secret
      serverClient
        .query(q.Get(q.Match(q.Index('user_by_id'), getCookie('user_id'))))
        .then((response) => {
          console.log(response);
          serverClient
            .query(
              q.Login(q.Select('ref', response), {
                password: q.Select(['data', 'id'], response),
              })
            )
            .then((secretResponse) => {
              dispatch({
                type: 'login',
                data: {
                  secret: secretResponse.secret,
                  user: response,
                },
              });
            });
        })
        .catch((faunaErr) => {
          console.log(faunaErr);
        });
    }

    if (
      isBrowser() &&
      localStorage.getItem('firebaseUser') &&
      getCookie('site_id') &&
      getCookie('site_secret')
    ) {
      serverClient
        .query(q.Get(q.Match(q.Index('site_by_id'), getCookie('site_id'))))
        .then((response) => {
          console.log(response);
          dispatch({
            type: 'loginSite',
            data: {
              secret: getCookie('site_secret'),
              site: response,
            },
          });
        })
        .catch((faunaErr) => {
          console.log(faunaErr);
        });
    }

    // if (isBrowser() && !signedIn) {
    //   dispatch({ type: 'logout', data: {} });
    // }
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
