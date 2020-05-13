/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-fragments */
import PropTypes from 'prop-types';
import React, { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { Link } from 'gatsby';
import Menu from './Menu';
// import MobileMenu from './MobileMenu';
import { AppContext } from '../../providers/AppProvider';
import Button from '../Button';
import Row from '../grid/Row';
import { FirebaseContext } from '../../providers/FirebaseProvider';
import { DatabaseContext } from '../../providers/DatabaseProvider';
import { isBrowser } from '../../utils/isBrowser';

const Header = ({ siteTitle }) => {
  const {
    scrolled,
    setScrolled,
    setNotificationMessage,
    setNotificationType,
  } = useContext(AppContext);
  const { firebase } = useContext(FirebaseContext);
  const [open, setOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [width, setWidth] = useState(0);
  const { dispatch } = useContext(DatabaseContext);

  useEffect(() => {
    window.addEventListener('scroll', onScroll);

    const inner = document.getElementById('blur')
      ? document.getElementById('blur').offsetWidth
      : 0;
    const outer = document.getElementById('mobile-menu')
      ? document.getElementById('mobile-menu').offsetWidth
      : 0;

    setWidth(outer - inner);

    return () => {
      setWidth();
      window.removeEventListener('scroll', onScroll);
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

  const accountToggleFunction = () => {
    setAccountOpen(!accountOpen);
  };

  const onScroll = () => {
    if (
      window.scrollY > 40 &&
      isBrowser() &&
      !window.location.pathname.includes('dashboard')
    ) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  return (
    <div>
      {typeof window !== 'undefined' &&
      !window.location.pathname.includes('/signup') &&
      !window.location.pathname.includes('/login') ? (
        <>
          <Wrapper
            id='header'
            open={open}
            dashboard={
              isBrowser() && window.location.pathname.includes('dashboard')
            }
            scrolled={scrolled}
          >
            <div className='container'>
              <Flex>
                <SiteTitle
                  className='logo'
                  light={
                    isBrowser() &&
                    window.location.pathname.includes('dashboard')
                  }
                  scrolled={scrolled}
                >
                  <FontAwesomeIcon icon='comment-alt' />
                  Staticbox
                </SiteTitle>
                {isBrowser() &&
                !window.location.pathname.includes('dashboard') ? (
                  <>
                    <Menu scrolled={scrolled} />
                    {/* <MobileMenu scrolled={scrolled} /> */}
                    <MobileMenuToggle
                      scrolled={scrolled}
                      onClick={toggleFunction}
                      open={open}
                    >
                      <MobileMenuRotate open={open}>
                        <span />
                        <span />
                        <span />
                      </MobileMenuRotate>
                    </MobileMenuToggle>
                  </>
                ) : (
                  <AccountMenuToggle
                    scrolled={scrolled}
                    onClick={accountToggleFunction}
                    open={accountOpen}
                  >
                    <FontAwesomeIcon icon='user' />
                    <AccountMenu open={accountOpen} scolled={scrolled}>
                      <MobileMenuItems open={accountOpen}>
                        <AccountMenuItem to='/'>Home</AccountMenuItem>
                        <AccountMenuItem to='/dashboard/profile'>
                          Profile
                        </AccountMenuItem>
                        <AccountMenuItem
                          onClick={() => {
                            firebase
                              .auth()
                              .signOut()
                              .then(function () {
                                console.log('Signed out!');
                                setNotificationType('success');
                                setNotificationMessage(
                                  'You are now signed out.'
                                );
                                // window.location.href = '/';
                                dispatch({ type: 'logout', data: {} });
                                dispatch({ type: 'logoutSite', data: {} });
                              })
                              .catch(function (error) {
                                console.log(error);
                                setNotificationType('error');
                                setNotificationMessage(
                                  'There was an error signing you out.'
                                );
                              });
                          }}
                          to=''
                        >
                          Log Out
                        </AccountMenuItem>
                      </MobileMenuItems>
                    </AccountMenu>
                  </AccountMenuToggle>
                )}
              </Flex>
            </div>
            {/* <MobileMenuOverlay open={open}> */}
            {/* </MobileMenuOverlay> */}
          </Wrapper>
          <MobileMenu
            width={width}
            id='mobile-menu'
            scrolled={scrolled}
            open={open}
          >
            <div className='container'>
              <Row spacing={[8]} breakpoints={[576]} flexDirections={['row']}>
                <div
                  widths={
                    isBrowser() && firebase.auth().currentUser ? [12] : [8]
                  }
                >
                  <MobileMenuItems open={open}>
                    <MobileMenuItem to='/'>Home</MobileMenuItem>
                    {isBrowser() && firebase.auth().currentUser && (
                      <MobileMenuItem to='/dashboard'>Account</MobileMenuItem>
                    )}
                    <MobileMenuItem to='https://github.com/jarodpeachey/triangle-comments'>
                      Docs
                    </MobileMenuItem>
                  </MobileMenuItems>
                </div>
                {!isBrowser() && firebase.auth().currentUser && (
                  <div widths={[4]}>
                    <Row
                      spacing={[8]}
                      breakpoints={[0, 576]}
                      flexDirections={['row', 'column']}
                    >
                      <div widths={[6, 12]}>
                        <Button
                          light={
                            isBrowser() &&
                            window.location.pathname.includes('dashboard')
                          }
                          link='/signup'
                          medium
                          className='full-width'
                          outlined
                        >
                          Sign Up
                        </Button>
                      </div>
                      <div widths={[6, 12]}>
                        <Button
                          link='/login'
                          medium
                          className='full-width'
                          outlined
                        >
                          Log In
                        </Button>
                      </div>
                    </Row>
                  </div>
                )}
              </Row>
            </div>
          </MobileMenu>
        </>
      ) : null}
    </div>
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
    padding-top: ${(props) =>
      props.dashboard ? '32px' : props.scrolled ? '18px' : '32px'};
    padding-bottom: ${(props) =>
      props.dashboard ? '32px' : props.scrolled ? '18px' : '32px'};
    transition: all 0.25s ease-in;
  }
  z-index: 999999999999999;
  background: ${(props) =>
    props.dashboard
      ? 'transparent'
      : props.open
      ? 'white'
      : props.scrolled
      ? 'white'
      : 'transparent'};
  color: ${(props) =>
    props.scrolled
      ? props.theme.color.primary.main
      : props.theme.color.primary.main} !important;
  transition-duration: 0.25s;
  transition: all 0.25s ease-in;
  box-shadow: ${(props) =>
    props.dashboard
      ? 'none'
      : props.open
      ? 'none'
      : props.scrolled
      ? `0 5px 60px -20px ${props.theme.color.primary.light}60`
      : ''};
  border-bottom: ${(props) =>
    props.dashboard
      ? 'none'
      : props.open
      ? '2px solid #e8e8e8'
      : props.scrolled
      ? `2px solid #e8e8e8`
      : '2px solid transparent'};
  position: ${(props) => (props.dashboard ? 'absolute' : 'fixed')};
  left: 0;
  top: 0;
  right: 0;
  bottom: auto;
  z-index: 999;
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
`;

const SiteTitle = styled.h1`
  margin: 0;
  margin-bottom: -1px;
  transition: all 0.25s ease-in;
  // letter-spacing: 5px;
  text-transform: uppercase;
  font-size: 22px;
  margin-left: -8px;
  color: ${(props) => (props.light ? 'white' : 'inherit')} !important;
  @media (min-width: 769px) {
    font-size: 26px;
  }
  z-index: 999;
  position: relative;
  ::after {
    content: 'S';
    display: block;
    position: absolute;
    height: 100%;
    color: ${(props) =>
      props.light
        ? props.theme.color.primary.backgroundDark
        : 'white'} !important;
    font-size: 31px;
    top: -2px;
    left: 16px;
    font-weight: 900 !important;
    @media (min-width: 769px) {
      font-size: 41px;
      left: 17px;
      top: -4px;
    }
    z-index: -1;

    transform: rotate(-10deg);
    font-family: Exo, Segoe UI;
  }
  svg {
    color: ${(props) => (props.light ? 'white' : 'inherit')} !important;

    margin-right: 16px;
    position: relative;
    top: 6px;
    left: 12px;
    z-index: -1;
    font-size: 28px;
    @media (min-width: 769px) {
      font-size: 36px;
    }
  }
`;

const MobileMenuToggle = styled.div`
  display: none;
  z-index: 9999;
  width: 30px;
  height: 30px;
  @media (max-width: 768px) {
    display: block;
  }
  transform: rotate(0deg);
  transition: all 0.25s ease-in;
  cursor: pointer;
  margin-left: auto;
  position: ${(props) => (props.open ? 'relative' : 'static')};
  // right: ${(props) => (props.open ? '12px' : 'none')};
  span {
    display: block;
    position: absolute;
    height: 4px;
    width: 100%;
    background: ${(props) => props.theme.color.text.heading};
    border-radius: 10px;
    opacity: 1;
    left: 0;
    transform: rotate(0deg);
    transition: ${(props) =>
      props.open ? 'all 0.25s ease-in' : 'all 0.25s ease-out'};
  }

  span:nth-child(1) {
    top: ${(props) => (props.open ? 'calc(50% - 2px)' : '10%')};
    transform-origin: left center;
  }
  span:nth-child(2) {
    top: ${(props) => (props.open ? 0 : 'calc(50% - 2px)')};
    left: ${(props) => (props.open ? 'calc(50% - 2px)' : null)};
    width: ${(props) => (props.open ? '4px' : null)};
    height: ${(props) => (props.open ? '100%' : null)};
    transform-origin: left center;
  }
  span:nth-child(3) {
    top: calc(90% - 4px);
    transform-origin: left center;
    width: ${(props) => (props.open ? 0 : null)};
    opacity: ${(props) => (props.open ? 0 : 1)};
  }
`;

const MobileMenuRotate = styled.div`
  height: 100%;
  width: 100%;
  transition: ${(props) =>
    props.open ? 'all 0.25s ease-in-out' : 'all 0.25s ease-in-out'};
  transform: ${(props) => (props.open ? 'rotate(-45deg)' : 'none')};
`;

const MobileMenu = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: block;
  }
  line-height: 1;
  // display: ${(props) => (props.open ? 'block' : 'none')};
  position: fixed;
  overflow: hidden;
  top: ${(props) => (props.open ? '0' : '-100%')};
  margin-top: ${(props) => (props.scrolled ? '66px' : '94px')};
  background: white;
  z-index: 999;
  width: 100%;
  transition: ${(props) =>
    props.open ? 'all 0.25s ease-out' : 'all 0.6s ease-out'};
  box-shadow: none;
  border-bottom: 1px solid #e8e8e8;

  .container {
    padding: 12px 10vw;
  }
`;

const AccountMenu = styled.div`
  display: ${(props) => (props.open ? 'block' : 'none')};
  height: fit-content;
  width: fit-content;
  top: 45px;
  line-height: 1;
  background: white;
  position: absolute;
  z-index: 99999999999999999;
  transition: ${(props) =>
    props.open ? 'all 0.25s ease-out' : 'all 0.6s ease-out'};
  border-radius: 5px;
  box-shadow: 2px 2px 20px -5px #00000050;
  right: 0;
  min-width: 150px;
`;

const AccountMenuItem = styled(Link)`
  text-decoration: none;
  transition-duration: 0.2s;
  color: ${(props) => props.theme.color.text.heading} !important;
  font-weight: 700;
  text-align: center;
  font-size: 16px;
  border-bottom: 1px solid #e8e8e8;
  display: block;
  padding: 16px 24px;
  border-radius: 5px;
  width: 100%;
  :last-child {
    border: none;
  }
  transition-duration: 0.2s;
  :hover {
    background: #f7f7f7;
    transition-duration: 0.2s;
  }
`;

const AccountMenuToggle = styled.div`
  z-index: 9999;
  width: 40px;
  height: 40px;
  transform: rotate(0deg);
  transition: all 0.25s ease-in;
  cursor: pointer;
  margin-left: auto;
  border-radius: 50px;
  padding: 6px;
  background: ${(props) => (props.open ? '#ffffff60' : 'transparent')};
  border: 1px solid #fff;
  :hover {
    background: ${(props) => (props.open ? '#ffffff60' : '#ffffff30')};
  }
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    color: white;
    font-size: 20px;
  }
`;

const ButtonsContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const MobileMenuItems = styled.div`
  display: block;
`;

const MobileMenuItem = styled(Link)`
  text-decoration: none;
  transition-duration: 0.2s;
  color: ${(props) => props.theme.color.text.heading} !important;
  font-weight: 700;
  text-align: center;
  font-size: 16px;
  border-bottom: 1px solid #e8e8e8;
  display: block;
  padding: 16px 0;
  width: 100%;
  :last-child {
    border: none;
  }
  transition-duration: 0.2s;
  :hover {
    background: #f7f7f7;
    transition-duration: 0.2s;
  }
`;

export default Header;
