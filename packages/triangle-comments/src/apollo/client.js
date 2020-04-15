/* eslint-disable import/prefer-default-export */
import ApolloClient from 'apollo-boost';
import fetch from 'isomorphic-fetch';

export const client = new ApolloClient({
  uri: '/___graphql',
  fetch,
});
