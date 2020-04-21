import React from 'react';
import { StylesProvider } from './src/providers/StylesProvider';
import Layout from './src/components/layout/layout';

export const wrapRootElement = ({ element }) => {
  return (
    <StylesProvider>
      <Layout>{element}</Layout>
    </StylesProvider>
  );
};
