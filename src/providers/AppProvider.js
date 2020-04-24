// src/react-auth0-spa.js
import React, { useState, useContext, useEffect } from 'react';
import { FirebaseContext } from './FirebaseProvider';

export const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const [scrolled, setScrolled] = useState();
  const [notificationType, setNotificationType] = useState('info');
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [returnFunction, setFunction] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setNotificationMessage(null);
    }, 3000);
  }, [notificationType]);

  return (
    <AppContext.Provider
      value={{
        scrolled,
        setScrolled,
        editModalOpen,
        setEditModalOpen,
        passwordModalOpen,
        setPasswordModalOpen,
        notificationType,
        setNotificationMessage,
        setNotificationType,
        notificationMessage,
        returnFunction,
        setFunction
        // userAccountInfo,
        // setUserAccountInfo
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
