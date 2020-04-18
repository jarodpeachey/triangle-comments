import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Row from '../grid/row';
import Button from '../Button';

const MobileNav = ({ scrolled }) => {
  const [open, setOpen] = useState(false);
  const [width, setWidth] = useState(0);

  // const closeMobileMenu = () => {
  //   setOpen(false);
  // };

  // const openMobileMenu = () => {
  //   setOpen(true);
  // };

  // const mobileMenuToggle = () => {
  //   if (open) {
  //     closeMobileMenu();
  //   } else {
  //     openMobileMenu();
  //   }
  // };

  useEffect(() => {
    const inner = document.getElementById('blur')
      ? document.getElementById('blur').offsetWidth
      : 0;
    const outer = document.getElementById('mobile-menu')
      ? document.getElementById('mobile-menu').offsetWidth
      : 0;

    setWidth(outer - inner);

    return () => {
      setWidth();
    };
  });

  const toggleFunction = () => {
    if (open) {
      document.getElementById('blur').classList.remove('blur');
    } else {
      document.getElementById('blur').classList.add('blur');
    }

    setOpen(!open);
  };

  return (
    <MobileMenuWrapper>
      <MobileMenuToggle onClick={toggleFunction} open={open}>
        <MobileMenuRotate open={open}>
          <span />
          <span />
          <span />
        </MobileMenuRotate>
      </MobileMenuToggle>
      <MobileMenu
        width={width}
        id='mobile-menu'
        scrolled={scrolled}
        open={open}
      >
        <div className='container'>
          <Row spacing={[12, 0]} breakpoints={[1]}>
            <div widths={[6]}>
              <Button className='full-width' outlined>
                Sign Up
              </Button>
            </div>
            <div widths={[6]}>
              <Button className='full-width' outlined>
                Log In
              </Button>
            </div>
          </Row>
          <MobileMenuItems open={open}>
            <MobileMenuItem open={open} href='/'>
              Home
            </MobileMenuItem>
            <MobileMenuItem
              open={open}
              href='https://github.com/jarodpeachey/triangle-comments'
            >
              Docs
            </MobileMenuItem>
          </MobileMenuItems>
        </div>
      </MobileMenu>
    </MobileMenuWrapper>
  );
};

const MobileMenuWrapper = styled.div`
  @media (min-width: 769px) {
    display: none;
  }
  margin-left: auto;
  height: 100%;
  display: block;
  transition-duration: 0.25s;
`;

const MobileMenuToggle = styled.div`
  z-index: 9999;
  width: 35px;
  height: 35px;
  transform: rotate(0deg);
  transition: 0.5s ease-out;
  cursor: pointer;
  margin-left: auto;
  position: ${(props) => (props.open ? 'relative' : 'static')};
  // right: ${(props) => (props.open ? '12px' : 'none')};
  span {
    display: block;
    position: absolute;
    height: 6px;
    width: 100%;
    background: #3e4348;
    border-radius: 9px;
    opacity: 1;
    left: 0;
    transform: rotate(0deg);
    transition: ${(props) =>
      props.open ? 'all 0.25s ease-in' : 'all 0.25s ease-out'};
  }

  span:nth-child(1) {
    top: ${(props) => (props.open ? 'calc(50% - 3px)' : '10%')};
    transform-origin: left center;
  }
  span:nth-child(2) {
    top: ${(props) => (props.open ? 0 : 'calc(50% - 3px)')};
    left: ${(props) => (props.open ? 'calc(50% - 3px)' : null)};
    width: ${(props) => (props.open ? '6px' : null)};
    height: ${(props) => (props.open ? '100%' : null)};
    transform-origin: left center;
  }
  span:nth-child(3) {
    top: calc(90% - 6px);
    transform-origin: left center;
    width: ${(props) => (props.open ? 0 : null)};
    opacity: ${(props) => (props.open ? 0 : 1)};
  }
`;

const MobileMenuRotate = styled.div`
  height: 100%;
  width: 100%;
  transition: ${(props) =>
    props.open ? 'all 0.25s ease-in' : 'all 0.25s ease-out'};
  transform: ${(props) => (props.open ? 'rotate(-45deg)' : 'none')};
`;

const MobileMenu = styled.div`
  position: absolute;
  width: 100vw;
  left: 0;
  top: 0;
  min-height: 100vh;
max-height: 99999999999999999px !important;
  transform: ${(props) => (props.open ? 'translateY(0)' : 'translateY(-150%)')};
  opacity: ${(props) => (props.open ? 1 : 1)};
  background: rgba(255, 255, 255, 0.5);
  transition: ${(props) =>
    props.open ? 'all 0.25s ease-in' : 'all 0.25s ease-out'} !important;
  .container {
    padding-top: ${(props) =>
      props.scrolled ? '64.2px' : '88.2px'} !important;
    padding-left: 0;
    padding-right: 0;
    padding-right: ${(props) => props.width}px;
  }
`;

const MobileMenuItems = styled.div`
  display: block;
`;

const MobileMenuItem = styled.a`
  text-decoration: none;
  display: block;
  width: 100%;
  font-weight: bold;
  font-size: 18px;
  text-align: center;
  padding: 14px 0;
  position: relative;
  left: 0;
  :first-child {
    margin-top: 32px;
  }
  :last-child {
    border-bottom: none;
  }
  border-bottom: 1px solid black;
  transition-duration: 0.2s;
  :hover {
    background: rgba(81, 160, 249, 0.2);
    transition-duration: 0.2s;
  }
`;

export default MobileNav;
