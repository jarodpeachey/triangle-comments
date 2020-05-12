/* eslint-disable no-nested-ternary */
/* eslint-disable import/prefer-default-export */
import React from 'react';
import '../components/style.css';
import styled, { ThemeProvider } from 'styled-components';
import { theme, CustomThemeProvider } from '../components/theme';
import { isBrowser } from '../utils/isBrowser';

export const StylesProvider = (props) => {
  let scrollbarWidth = 10;

  if (isBrowser()) {
    const outer = isBrowser() && document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.overflow = 'scroll'; // forcing scrollbar to appear
    outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps
    isBrowser() && document.body.appendChild(outer);

    // Creating inner element and placing it in the container
    const inner = isBrowser() && document.createElement('div');
    outer.appendChild(inner);

    // Calculating difference between container's full width and the child width
    scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

    // Removing temporary elements from the DOM
    outer.parentNode.removeChild(outer);
  } else {
    scrollbarWidth = 10;
  }

  return (
    <CustomThemeProvider>
      <ThemeProvider theme={theme}>
        <StyleWrapper
          theme={theme}
          textColor={theme.color.text.heading}
          width={scrollbarWidth}
        >
          {props.children}
        </StyleWrapper>
      </ThemeProvider>
    </CustomThemeProvider>
  );
};

const StyleWrapper = styled.div`
  width: 100vw;
  overflow: hidden;
  height: 100%;
  padding-right: ${(props) => props.width}px;
  p,
  small,
  code {
    color: ${(props) => props.theme.color.text.paragraph};
  }
  strong {
    color: ${(props) => props.theme.color.text.dark};
  }
  p,
  small,
  span,
  div,
  select,
  input {
    font-family: 'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI',
      Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
      sans-serif !important;
    font-size: 16px;
    font-weight: 400;
  }
  .title {
    font-family: 'Fira Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
      Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif !important;
  }
  .subtitle {
    font-family: 'Heebo', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
      Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif !important;
  }
  p {
    line-height: 27px;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: ${(props) => props.theme.color.text.heading};
  }
`;
