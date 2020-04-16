import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import { Link } from 'gatsby';

const Header = ({ siteTitle }) => {
  const [headerScrolled, setHeaderState] = useState(false);
  const [menuOpen, setMenuState] = useState(false);

  const onScroll = () => {
    if (window.scrollY > 78) {
      setHeaderState(true);
    } else {
      setHeaderState(false);
    }
  };

  const closeMobileMenu = () => {
    setMenuState(false);
    clearAllBodyScrollLocks();
    document.getElementById('mobile-menu-toggle').classList.remove('open');
  };

  const openMobileMenu = () => {
    setMenuState(true);
    disableBodyScroll(document.getElementById('mobile-menu-items'));
    document.getElementById('mobile-menu-toggle').classList.add('open');
  };

  const mobileMenuToggle = () => {
    if (menuOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  };

  const mobileMenuClick = () => {
    closeMobileMenu();
  };

  const mobileMenuItemClick = () => {
    closeMobileMenu();
  };

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

    // return () => {
    //   window.removeEventListener('scroll', onScroll);
    //   document
    //     .getElementById('mobile-menu-toggle')
    //     .removeEventListener('click', mobileMenuToggle);

    //   document
    //     .getElementById('mobile-menu')
    //     .removeEventListener('click', mobileMenuClick);

    //   mobileMenuItems.forEach((item) => {
    //     item.removeEventListener('click', mobileMenuItemClick);
    //   });
    // };
  });

  return (
    <Wrapper scrolled={headerScrolled} className='container'>
      <Flex>
        <SiteTitle>Triangle</SiteTitle>
        <Menu>
          <MenuItem>
            <Link to='/'>Home</Link>
          </MenuItem>
        </Menu>
      </Flex>
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
  padding-top: ${(props) => (props.scrolled ? '8px' : '24px')};
  padding-bottom: ${(props) => (props.scrolled ? '8px' : '24px')};
  background: ${(props) =>
    props.scrolled ? 'rgb(81, 160, 249)' : 'transparent'};
  color: ${(props) =>
    props.scrolled ? 'white' : 'rgb(81, 160, 249)'} !important;
  position: fixed;
  backdrop-filter: blur(4px);
  width: 100%;
  transition-duration: 0.25s;
  a {
    color: ${(props) =>
      props.scrolled ? 'white' : 'black'} !important;
  }
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
`;

const SiteTitle = styled.h1`
  margin: 0;
`;

const Menu = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  height: 100%;
  display: block;
`;

const MenuItem = styled.div`
  height: 100%;
  a {
    height: 100%;
    display: block;
    padding: 8px 16px;
    font-weight: 500;
  }
  :hover a {
    color: rgba(81, 160, 249, 1);
  }
`;

export default Header;
