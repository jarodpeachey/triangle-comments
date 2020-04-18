/* eslint-disable import/prefer-default-export */
import React from 'react';
import '../components/style.css';

export const StylesProvider = (props) => {
  return (
    <div>
      {props.children}
    </div>
  );
}
