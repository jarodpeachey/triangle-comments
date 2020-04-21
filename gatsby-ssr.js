import React from 'react';
import { StylesProvider } from './src/providers/StylesProvider';
import Layout from './src/components/layout/layout';

export const wrapRootElement = ({ element }) => {
  return <StylesProvider>{element}</StylesProvider>;
};

export const wrapPageElement = ({ element }) => {
  return <Layout>{element}</Layout>;
};
