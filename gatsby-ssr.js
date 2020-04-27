import React from 'react';
import { StylesProvider } from './src/providers/StylesProvider';
import Layout from './src/components/layout/layout';
import { FirebaseProvider } from './src/providers/FirebaseProvider';
import { DatabaseProvider } from './src/providers/DatabaseProvider';
import { AppProvider } from './src/providers/AppProvider';
import { isBrowser } from './src/utils/isBrowser';

export const wrapRootElement = ({ element }) => {
  console.log(element);

  return (
    <AppProvider>
      <FirebaseProvider>
        <DatabaseProvider>
          <StylesProvider>{element}</StylesProvider>
        </DatabaseProvider>
      </FirebaseProvider>
    </AppProvider>
  );
};

export const wrapPageElement = ({ element }) => {
  return (
    <Layout
      color={
        isBrowser() && window.location.pathname.includes('account')
          ? '#f7f7f7'
          : 'white'
      }
    >
      {element}
    </Layout>
  );
};
