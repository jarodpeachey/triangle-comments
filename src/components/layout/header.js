import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import { Link } from 'gatsby';
import Menu from './Menu';
import MobileMenu from './MobileMenu';

const Header = ({ siteTitle }) => {
  const [scrolled, setHeaderState] = useState(false);
  const [menuOpen, setMenuState] = useState(false);

  const onScroll = () => {
    if (window.scrollY > 40) {
      setHeaderState(true);
    } else {
      setHeaderState(false);
    }
  };

  // const closeMobileMenu = () => {
  //   setMenuState(false);
  //   clearAllBodyScrollLocks();
  //   document.getElementById('mobile-menu-toggle').classList.remove('open');
  // };

  // const openMobileMenu = () => {
  //   setMenuState(true);
  //   disableBodyScroll(document.getElementById('mobile-menu-items'));
  //   document.getElementById('mobile-menu-toggle').classList.add('open');
  // };

  // const mobileMenuToggle = () => {
  //   if (menuOpen) {
  //     closeMobileMenu();
  //   } else {
  //     openMobileMenu();
  //   }
  // };

  // const mobileMenuClick = () => {
  //   closeMobileMenu();
  // };

  // const mobileMenuItemClick = () => {
  //   closeMobileMenu();
  // };

  useEffect(() => {
    window.addEventListener('scroll', onScroll);

    // document
    //   .getElementById('mobile-menu-toggle')
    //   .addEventListener('click', mobileMenuToggle);

    // document
    //   .getElementById('mobile-menu')
    //   .addEventListener('click', mobileMenuClick);

    // const mobileMenuItems = document.querySelectorAll('.mobile-menu-item');

    // mobileMenuItems.forEach((item) => {
    //   item.addEventListener('click', mobileMenuItemClick);
    // });

    return () => {
      window.removeEventListener('scroll', onScroll);
      // document
      //   .getElementById('mobile-menu-toggle')
      //   .removeEventListener('click', mobileMenuToggle);

      // document
      //   .getElementById('mobile-menu')
      //   .removeEventListener('click', mobileMenuClick);

      // mobileMenuItems.forEach((item) => {
      //   item.removeEventListener('click', mobileMenuItemClick);
      // });
    };
  });

  return (
    <Wrapper scrolled={scrolled}>
      <div className='container'>
        {' '}
        <Flex>
          <SiteTitle scrolled={scrolled}>Triangle</SiteTitle>
          <Menu scrolled={scrolled} />
          <MobileMenu scrolled={scrolled} />
        </Flex>
      </div>
    </Wrapper>
  );
};

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: '',
};

const Wrapper = styled.header`
  .container {
    padding-top: ${(props) => (props.scrolled ? '8px' : '24px')};
    padding-bottom: 8px;
  }
  background: ${(props) => (props.scrolled ? 'white' : 'transparent')};
  color: ${(props) =>
    props.scrolled ? 'inherit' : 'rgb(81, 160, 249)'} !important;
  position: fixed;
  backdrop-filter: blur(4px);
  width: 100%;
  transition-duration: 0.25s;
  box-shadow: ${(props) =>
    props.scrolled ? '1px 0px 60px -5px rgba(81, 160, 249, 0.4)' : ''};
  a {
    color: ${(props) => (props.scrolled ? 'black' : 'black')} !important;
  }
  z-index: 999;
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
`;

const SiteTitle = styled.h1`
  margin: 0;
  font-weight: 700;
  text-transform: uppercase;
  font-family: 'overpass', sans-serif !important;
  margin-bottom: -8px;
  font-size: ${(props) => (props.scrolled ? '32px' : '40px')};
  transition-duration: 0.25s;
  z-index: 999;
`;

export default Header;
