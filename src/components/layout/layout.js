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
  return (
    // <Security {...config}>
    <Wrapper>
      {typeof window !== 'undefined' &&
        window.location.pathname !== '/signup' &&
        window.location.pathname !== '/login' && (
          <Header siteTitle={props.title} />
        )}
      <div id='blur'>
        {typeof window !== 'undefined' &&
        window.location.pathname !== '/signup' &&
        window.location.pathname !== '/login' ? (
          <ContentWrapper>{props.children}</ContentWrapper>
        ) : (
          <>{props.children}</>
        )}
        {typeof window !== 'undefined' &&
          window.location.pathname !== '/signup' &&
          window.location.pathname !== '/login' && <Footer />}
      </div>
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
  padding-top: ${(props) => (props.scrolled ? '50px' : '60px')};
`;

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
