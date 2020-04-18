import React from 'react';
import { StyleWrapper } from './src/components/layout/StyleWrapper';
import Layout from './src/components/layout/layout';

export const wrapRootElement = ({ element }) => {
  return <StyleWrapper>{element}</StyleWrapper>;
};

export const wrapPageElement = ({ element }) => {
  return <Layout>{element}</Layout>;
};
