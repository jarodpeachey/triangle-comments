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
          width={scrollbarWidth}
          gray={
            isBrowser()
              ? window.location.pathname.includes('account')
                ? theme.color.gray.one
                : 'white'
              : 'white'
          }
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
  height: auto;
  display: inline-block;
  background: ${(props) => (props.gray ? props.gray : 'white')};
  padding-right: ${(props) => props.width}px;
`;
