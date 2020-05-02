// import React, { useState, useContext } from 'react';
// import faunadb, { query as q } from 'faunadb';
// import { AppContext } from './AppProvider';
// import { isBrowser } from '../utils/isBrowser';
// import { FirebaseContext } from './FirebaseProvider';

// const SessionContext = React.createContext({});

// export const sessionReducer = (state, action) => {
//   switch (action.type) {
//     case 'login': {
//       isBrowser() &&
//         localStorage.setItem('faunaUser', JSON.stringify(action.data));
//       return { user: action.data };
//     }
//     case 'register': {
//       console.log(action.data);
//       isBrowser() &&
//         localStorage.setItem('faunaUser', JSON.stringify(action.data));
//       return { user: action.data };
//     }
//     case 'logout': {
//       isBrowser() && localStorage.removeItem('faunaUser');
//       return { user: null };
//     }
//     default: {
//       throw new Error(`Unhandled action type: ${action.type}`);
//     }
//   }
// };

// export const SessionProvider = ({ children }) => {
//   const { signedIn } = useContext(AppContext);
//   const { firebaseUser } = useContext(FirebaseContext);
//   const [faunaUser, setFaunaUser] = useState(null);
//   const [siteSecret, setSiteSecret] = useState('');
//   const [userSecret, setUserSecret] = useState('');

//   const serverClient = new faunadb.Client({
//     secret: 'fnADq29sx9ACE4FItI0Ps8suOAzL0UHyqDNFNjgV',
//   });

//   let userClient = null;
//   let siteClient = null;

//   if (userSecret) {
//     userClient = new faunadb.Client({
//       secret: userSecret,
//     });
//   }

//   if (siteSecret) {
//     siteClient = new faunadb.Client({
//       secret: siteSecret,
//     });
//   }

//   // Test user-based API keys
//   // const serverClient = new faunadb.Client({
//   //   secret: 'fnEDqdzwZlACEwOmCb0MkAIUAZG495CG3qRDCymFnbIZREOrEFc',
//   // });

//   const ctx = {
//     serverClient,
//     userClient,
//     siteClient,
//     q,
//     faunaUser,
//     setUserSecret,
//     setSiteSecret,
//     siteSecret,
//     userSecret,
//   };

//   return (
//     <SessionContext.Provider value={{ ...ctx }}>
//       {children}
//     </SessionContext.Provider>
//   );
// };

// export const SessionProvider = SessionContext.Provider;
// export const SessionConsumer = SessionContext.Consumer;
// export default SessionContext;
