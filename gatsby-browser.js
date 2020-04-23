import React from 'react';
import { StylesProvider } from './src/providers/StylesProvider';
import Layout from './src/components/layout/layout';
import { FirebaseProvider } from './src/providers/FirebaseProvider';
// import { AuthProvider } from './src/providers/AuthProvider';
import { AppProvider } from './src/providers/AppProvider';

export const wrapRootElement = ({ element }) => {
  console.log(element);

  return (
    <FirebaseProvider>
      <AppProvider>
        <StylesProvider>{element}</StylesProvider>
      </AppProvider>
    </FirebaseProvider>
  );
};

export const wrapPageElement = ({ element }) => {
  return <Layout>{element}</Layout>;
};
