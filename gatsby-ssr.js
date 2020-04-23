import React from 'react';
import { StylesProvider } from './src/providers/StylesProvider';
import Layout from './src/components/layout/layout';
import { DatabaseProvider } from './src/providers/DatabaseProvider';
import { AuthProvider } from './src/providers/AuthProvider';

export const wrapRootElement = ({ element }) => {
  return (
    <AuthProvider>
      <DatabaseProvider>
        <StylesProvider>{element}</StylesProvider>
      </DatabaseProvider>
    </AuthProvider>
  );
};

export const wrapPageElement = ({ element }) => {
  return <Layout>{element}</Layout>;
};
