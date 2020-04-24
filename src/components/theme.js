/* eslint-disable import/prefer-default-export */
import React from 'react';

export const theme = {
  color: {
    success: '#00ab66',
    error: '#ff6347',
    text: {
      light: '#989fa7',
      dark: '#626f7f',
      heading: '#3a3e44',
    },
    primary: {
      backgroundLight: '#f6faff',
      text: '#0e3d69',
      backgroundDark: '#131b23',
      light: '#308cff',
      main: '#1758d1',
      dark: '#123cbe',
      light_rgb: 'rgb(48, 140, 255)',
      main_rgb: 'rgb(23, 88, 209)',
      dark_rgb: 'rgb(18, 60, 190)',
    },
    secondary: {
      light: '#fab86c',
      main: '#f9853a',
      dark: '#f76b2b',
    },
    gray: {
      one: '#f7f7f7',
      two: '#f3f3f3',
      three: '#e9e9e9',
    },
  },
};

export const ThemeContext = React.createContext();

export const CustomThemeProvider = (props) => {
  return (
    <ThemeContext.Provider value={theme}>
      {props.children}
    </ThemeContext.Provider>
  );
};
