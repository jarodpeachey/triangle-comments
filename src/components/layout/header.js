import PropTypes from 'prop-types';
import React, { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import { Link } from 'gatsby';
import Menu from './Menu';
import MobileMenu from './MobileMenu';
import { AppContext } from '../../providers/AppProvider';

const Header = ({ siteTitle }) => {
  const { scrolled } = useContext(AppContext);

  const { setScrolled } = useContext(AppContext);

  const onScroll = () => {
    if (window.scrollY > 40) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  });

  return (
    <>
      {typeof window !== 'undefined' &&
      !window.location.pathname.includes('/signup') &&
      !window.location.pathname.includes('/login') ? (
        <Wrapper scrolled={scrolled}>
          <div className='container'>
            {' '}
            <Flex>
              <SiteTitle className='logo' scrolled={scrolled}>
                Triangle
              </SiteTitle>
              <Menu scrolled={scrolled} />
              <MobileMenu scrolled={scrolled} />
            </Flex>
          </div>
        </Wrapper>
      ) : null}
    </>
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
  // a {
  //   color: ${(props) => (props.scrolled ? 'black' : 'black')} !important;
  // }
  z-index: 999;
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
`;

const SiteTitle = styled.h1`
  margin: 0;
  text-transform: uppercase;
  margin-bottom: -8px;
  font-size: ${(props) => (props.scrolled ? '32px' : '40px')};
  transition-duration: 0.25s;
  z-index: 999;
`;

export default Header;
