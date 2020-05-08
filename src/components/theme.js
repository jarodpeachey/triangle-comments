/* eslint-disable import/prefer-default-export */
import React from 'react';

export const theme = {
  color: {
    success: '#00ab66',
    error: '#ff6347',
    text: {
      paragraph: '#636d72',
      heading: '#2e3c42',
      dark: '#0e1e24',
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
      one: '#F7F7F7',
      two: '#F1F1F1',
      three: '#EBEBEB',
      four: '#DADBDB',
      five: '#C8CACB',
      six: '#ABAEB0',
      seven: '#929699',
      eight: '#787D81',
      nine: '#464C52',
      ten: '#131B23',
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
