import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import faunadb, { query as q } from 'faunadb';

export const DatabaseContext = React.createContext({});

export const DatabaseProvider = ({ children }) => {
  useEffect(() => {});

  const adminClient = new faunadb.Client({
    secret: 'fnADqD4nZUACFDVsydrwShq80zbDeHUy_KhTsyGs',
  });

  const serverClient = new faunadb.Client({
    secret: 'fnADqD4tupACFNbomOWpD8aq3Iq2mJhymQZJDAd-',
  });

  const ctx = {
    adminClient,
    serverClient,
    q
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
