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
  faComment,
  faCommentAlt,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';
import { fab, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import Footer from './Footer';
import Header from './Header';
import { AppContext } from '../../providers/AppProvider';
import { pathnameIncludes } from '../../utils/pathnameIncludes';
import EditUserInfoModal from '../dashboard/EditUserInfoModal';
import Notification from '../Notification';
import PasswordModal from '../auth/PasswordModal';
import { isBrowser } from '../../utils/isBrowser';
import EditSiteInfoModal from '../dashboard/EditSiteInfoModal';
import { DatabaseContext } from '../../providers/DatabaseProvider';

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
  faTimes,
  faComment,
  faCommentAlt,
  faCheck
);

const Layout = (props) => {
  const {
    editUserInfoModalOpen,
    passwordModalOpen,
    notificationMessage,
    notificationType,
    editSiteInfoModalOpen,
  } = useContext(AppContext);
  const { state, dispatch } = useContext(DatabaseContext);
  const { user, site } = state;

  console.log(
    'Test for',
    window.location.pathname,
    ': ',
    /\/sites\/(.*)/.test(window.location.pathname)
  );

  if (isBrowser() && !/\/sites\/(.*)/.test(window.location.pathname) && site) {
    // dispatch({ type: 'logoutSite', data: {} });
  } else {
  }

  return (
    <Wrapper>
      <Header siteTitle={props.title} />
      {!pathnameIncludes('/signup') && !pathnameIncludes('/login') && (
        <ContentWrapper />
      )}
      {props.children}
      <Footer />
      {editUserInfoModalOpen && <EditUserInfoModal />}
      {editSiteInfoModalOpen && <EditSiteInfoModal />}
      {passwordModalOpen && <PasswordModal />}
      {notificationMessage && (
        <Notification message={notificationMessage} type={notificationType} />
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
