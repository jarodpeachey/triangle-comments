import React from 'react';
import '../style.css';

export const StyleWrapper = (props) => {
  return (
    <div>
      {props.children}
    </div>
  );
}
