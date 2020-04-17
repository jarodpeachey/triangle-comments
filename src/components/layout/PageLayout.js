import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import '../breeze_layout.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faBolt,
  faDesktop,
  faBars,
  faPuzzlePiece,
  faCog,
  faEnvelope,
} from '@fortawesome/free-solid-svg-icons';
import { fab, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import Footer from './footer';
import Header from './header';
import { AuthProvider } from '../../auth/AuthProvider';
import { config } from '../../../auth-config';

library.add(
  faBars,
  faBolt,
  faDesktop,
  faPuzzlePiece,
  faCog,
  faEnvelope,
  faLinkedin,
  faGithub
);

const Layout = (props) => {
  console.log(props);

  const onRedirectCallback = (appState) => {
    window.location =
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname;
  };

  return (
    // <Security {...config}>
    <AuthProvider
      domain={config.domain}
      client_id={config.clientId}
      redirect_uri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
    >
      <Header siteTitle={props.title} />
      <div id='blur'>
        <main>{props.children}</main>
      </div>

      <Footer />
    </AuthProvider>
    // </Security>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
