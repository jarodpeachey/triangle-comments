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
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { fab, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import Footer from './Footer';
import Header from './Header';
import { AuthProvider } from '../../providers/AuthProvider';
import { AppProvider, AppContext } from '../../providers/AppProvider';
import { pathnameIncludes } from '../../utils/pathnameIncludes';
import EditPersonalInfoModal from '../account/EditPersonalInfoModal';

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
  faDollarSign,
  faTimes
);

const Layout = (props) => {
  const { editModalOpen, userAccountInfo } = useContext(AppContext);

  return (
    <Wrapper>
      <Header siteTitle={props.title} />
      {!pathnameIncludes('/signup') && !pathnameIncludes('/login') && (
        <ContentWrapper />
      )}
      {props.children}
      <Footer />
      {editModalOpen && (
        <EditPersonalInfoModal
          data={{ name: userAccountInfo.data.name, email: userAccountInfo.data.email }}
        />
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-height: 100vh;
  max-height: 99999999999999999px !important;
`;

const ContentWrapper = styled.div`
  height: 100%;
  padding-top: ${(props) => (props.scrolled ? '66px' : '94px')};
`;

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
