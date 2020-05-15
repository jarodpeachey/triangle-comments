// src/react-auth0-spa.js
import React, { useState, useContext, useEffect } from 'react';
import { isBrowser } from '../utils/isBrowser';

export const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const [scrolled, setScrolled] = useState();
  const [notificationType, setNotificationType] = useState('info');
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [editUserInfoModalOpen, setEditUserInfoModalOpen] = useState(false);
  const [editSiteInfoModalOpen, setEditSiteInfoModalOpen] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [returnFunction, setFunction] = useState(null);
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setNotificationMessage(null);
    }, 3000);
  }, [notificationType, notificationMessage]);

  return (
    <AppContext.Provider
      value={{
        scrolled,
        setScrolled,
        editUserInfoModalOpen,
        setEditUserInfoModalOpen,
        editSiteInfoModalOpen,
        setEditSiteInfoModalOpen,
        passwordModalOpen,
        setPasswordModalOpen,
        notificationType,
        setNotificationMessage,
        setNotificationType,
        notificationMessage,
        returnFunction,
        setFunction,
        signedIn,
        setSignedIn,
        // userAccountInfo,
        // setUserAccountInfo
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
