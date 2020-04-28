/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-fragments */
// src/pages/DelayedLoad.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Loader from './Loader';

const DelayedLoad = ({ fullHeight, condition, delay, render, fail }) => {
  const [state, setState] = useState('load');
  const [passedMin, setPassedMin] = useState(false);
  const [globalState, setGlobalState] = useState('');

  console.log(condition);

  const callback = () => {};

  setTimeout(() => {
    setPassedMin(true);
  }, 2000)

  const timeout = (function (condition) {
    return setTimeout(function () {
      console.log('Condition inside of callback: ', condition);
      if (!condition && globalState !== 'success') {
        setState('fail');
      } else {
        setState('success');
      }
    }, delay);
  })(condition);
  // window.setTimeout(callback, delay);

  useEffect(() => {
    if (condition && condition.data) {
      setState('success');
      setGlobalState('success');
      clearTimeout(timeout);

      return () => clearTimeout(timeout);
    }
  }, [condition]);

  useEffect(() => {
    if (state === 'success') {
      console.log('State is success. Clearing ', timeout);
      setGlobalState('success');
      clearTimeout(timeout);
    }
  }, [state]);

  return (
    <span>
      {state === 'load' || !passedMin ? (
        <span>
          {fullHeight ? (
            <Wrapper>
              <Loader color='#ffffff' size={75} text='Loading...' />
            </Wrapper>
          ) : (
            <Loader size={75} text='Loading...' />
          )}
        </span>
      ) : globalState === 'success' ? (
        <span>{render}</span>
      ) : (
        <span>{fail}</span>
      )}
    </span>
  );
};

const Wrapper = styled.div`
  top: 0;
  position: absolute;
  height: 100vh !important;
  min-height: 100% !important;
  width: 100vw;
  background: ${(props) => props.theme.color.primary.backgroundDark};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999999999;
`;

export default DelayedLoad;
