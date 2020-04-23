/* eslint-disable react/jsx-fragments */
// src/pages/DelayedLoad.js
import React, { useState, useEffect } from 'react';

const DelayedLoad = ({ children }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 250);
  }, []);

  return <span>{loading ? null : <span>{children}</span>}</span>;
};

export default DelayedLoad;
