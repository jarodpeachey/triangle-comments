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
import { config } from '../../../okta-config';

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

  return (
    // <Security {...config}>
    <>
      <Header siteTitle={props.title} />
      <div id='blur'>
        <main>{props.children}</main>
      </div>

      <Footer />
    </>
    // </Security>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
