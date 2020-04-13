// import React, { useState, useContext, useEffect } from 'react';
// import PropTypes from 'prop-types';

// export const TriangleContext = React.createContext({});

// const TriangleProvider = ({ children }) => {
//   const [comments, setComments] = useState([]);
//   const [apiKey, setApiKey] = useState('');
//   const [siteUrl, setSiteUrl] = useState('');

//   const ctx = {
//     comments,
//     apiKey,
//     siteUrl,
//     setComments,
//     setApiKey,
//     setSiteUrl,
//   };

//   return (
//     <TriangleContext.Provider value={{ ...ctx }}>
//       {children}
//     </TriangleContext.Provider>
//   );
// };

// TriangleProvider.propTypes = {
//   children: PropTypes.any.isRequired,
// };

// export default TriangleProvider;
