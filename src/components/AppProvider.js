// src/react-auth0-spa.js
import React, { useState } from 'react';

export const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const [scrolled, setScrolled] = useState();

  return (
    <AppContext.Provider
      value={{
        scrolled,
        setScrolled,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
