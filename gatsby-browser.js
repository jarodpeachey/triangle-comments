import React from 'react';
import { StylesProvider } from './src/providers/StylesProvider';
import Layout from './src/components/layout/layout';
import { DatabaseProvider } from './src/providers/DatabaseProvider';
import { AuthProvider } from './src/providers/AuthProvider';
import { AppProvider } from './src/providers/AppProvider';

export const wrapRootElement = ({ element }) => {
  return (
    <AuthProvider>
      <DatabaseProvider>
        <AppProvider>
          <StylesProvider>{element}</StylesProvider>
        </AppProvider>
      </DatabaseProvider>
    </AuthProvider>
  );
};

export const wrapPageElement = ({ element }) => {
  return <Layout>{element}</Layout>;
};
