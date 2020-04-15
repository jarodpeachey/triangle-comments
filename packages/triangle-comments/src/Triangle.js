import { useStaticQuery } from 'gatsby';
import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { client } from './apollo/client';

export const TriangleContext = React.createContext({});

/**
 * Manages the shopping cart, which is persisted in local storage.
 * The cart and related methods are shared through context.
 */

export class TriangleConstructor {
  color = 'tomato';

  apiKey = '';

  siteID = '';

  constructor(options) {
    console.log(options);

    this.apiKey = options.apiKey;
    this.color = options.color;
    this.siteID = options.siteID;
  }
}

export const Triangle = ({ options, children }) => {
  const { apiKey, siteID, color } = options;

  window.triangle = new TriangleConstructor(options);

  const ctx = {
    apiKey,
    siteID,
    color,
  };

  return (
    <ApolloProvider client={client}>
      <TriangleContext.Provider value={{ ...ctx }}>
        {children}
      </TriangleContext.Provider>
    </ApolloProvider>
  );
};
