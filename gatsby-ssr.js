import React from 'react';
import { StylesProvider } from './src/providers/StylesProvider';
import Layout from './src/components/layout/Layout';
import { FirebaseProvider } from './src/providers/FirebaseProvider';
// import { DatabaseProvider } from './src/providers/DatabaseProvider';
import { AppProvider } from './src/providers/AppProvider';
import { isBrowser } from './src/utils/isBrowser';
import {
  DatabaseProvider,
  DatabaseReducer,
} from './src/providers/DatabaseProvider';

export const wrapRootElement = ({ element }) => {
  console.log(element);
  // const [state, dispatch] = React.useReducer(DatabaseReducer, { user: null });

  return (
    <AppProvider>
      <FirebaseProvider>
        {/* <DatabaseProvider> */}
        <DatabaseProvider>
          <StylesProvider>{element}</StylesProvider>
        </DatabaseProvider>
        {/* </DatabaseProvider> */}
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
