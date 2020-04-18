const React = require('react');
const { StyleWrapper } = require('./src/components/layout/StyleWrapper');
const { AuthProvider } = require('./src/auth/AuthProvider');
const { AppProvider } = require('./src/components/AppProvider');

exports.wrapRootElement = ({ element }) => {
  return (
    <AuthProvider>
      <AppProvider>
        <StyleWrapper>{element}</StyleWrapper>
      </AppProvider>
    </AuthProvider>
  );
};
