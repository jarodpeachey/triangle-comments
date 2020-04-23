// src/react-auth0-spa.js
import React, { useState, useContext, useEffect } from 'react';
import { FirebaseContext } from './FirebaseProvider';

export const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const [scrolled, setScrolled] = useState();
  const [userAccountInfo, setUserAccountInfo] = useState({});
  const [editModalOpen, setEditModalOpen] = useState(false);

  console.log('Edit modal open: ', editModalOpen);

  // useEffect(() => {
  //   if (signedIn) {
  //     serverClient
  //       .query(q.Get(q.Match(q.Index('userByID'), user.id)))
  //       .then((res) => {
  //         console.log(res);

  //         setUserAccountInfo(res);
  //       });
  //   }
  // }, [user]);

  return (
    <AppContext.Provider
      value={{
        scrolled,
        setScrolled,
        editModalOpen,
        setEditModalOpen,
        // userAccountInfo,
        // setUserAccountInfo
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
