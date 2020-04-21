/* eslint-disable import/prefer-default-export */
import React from 'react';
import '../components/style.css';
import { ThemeProvider } from 'styled-components';
import { theme, CustomThemeProvider } from '../components/theme';

export const StylesProvider = (props) => {
  return (
    <CustomThemeProvider>
      <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
    </CustomThemeProvider>
  );
};
