/* eslint-disable react/jsx-fragments */
// src/pages/DelayedLoad.js
import React, { useState, useEffect } from 'react';
import Loader from './Loader';

const DelayedLoad = ({ children, delay }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, delay);
  }, []);

  return (
    <span>
      {loading ? <Loader size={100} text='Loading...' /> : <span>{children}</span>}
    </span>
  );
};

export default DelayedLoad;
