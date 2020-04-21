import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faBolt,
  faDesktop,
  faBars,
  faPuzzlePiece,
  faCog,
  faUser,
  faEnvelope,
  faShapes,
  faHome,
  faDollarSign,
} from '@fortawesome/free-solid-svg-icons';
import { fab, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import Footer from './footer';
import Header from './header';
import { AuthProvider } from '../../providers/AuthProvider';
import { AppProvider } from '../../providers/AppProvider';
import { pathnameIncludes } from '../../utils/pathnameIncludes';

library.add(
  faBars,
  faBolt,
  faDesktop,
  faPuzzlePiece,
  faCog,
  faEnvelope,
  faLinkedin,
  faGithub,
  faUser,
  faShapes,
  faHome,
  faDollarSign
);

const Layout = (props) => {
  console.log(props.children);

  return (
    // <Security {...config}>
    <Wrapper
      gray={
        typeof window !== 'undefined' &&
        window.location.pathname.includes('account')
      }
    >
      <AppProvider>
        <AuthProvider>
          <Header siteTitle={props.title} />
          <div id='blur'>
            {!pathnameIncludes('/signup') && !pathnameIncludes('/login') && (
              <ContentWrapper />
            )}
            {props.children}
            <Footer />
          </div>
        </AuthProvider>
      </AppProvider>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
  max-height: 99999999999999999px !important;
  background: ${(props) => (props.gray ? props.theme.color.gray.one : 'white')};
`;

const ContentWrapper = styled.div`
  height: 100%;
  padding-top: ${(props) => (props.scrolled ? '50px' : '60px')};
`;

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
