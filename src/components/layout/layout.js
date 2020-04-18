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
} from '@fortawesome/free-solid-svg-icons';
import { fab, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import Footer from './footer';
import Header from './header';
import { AuthProvider } from '../../auth/AuthProvider';
import { AppProvider } from '../AppProvider';
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
  faUser
);

const Layout = (props) => {
  console.log(props.children);
  return (
    // <Security {...config}>
    <Wrapper>
      <AppProvider>
        <Header siteTitle={props.title} />
        <div id='blur'>
          {!pathnameIncludes('/signup') && !pathnameIncludes('/login') && (
            <ContentWrapper />
          )}
          {props.children}
          <Footer />
        </div>
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
`;

const ContentWrapper = styled.div`
  height: 100%;
  padding-top: ${(props) =>
    props.scrolled ? '50px' : '60px'};
`;

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
