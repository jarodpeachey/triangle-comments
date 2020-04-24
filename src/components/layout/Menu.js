import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import Button from '../Button';
import { FirebaseContext } from '../../providers/FirebaseProvider';
import { isBrowser } from '../../utils/isBrowser';

const Menu = ({ scrolled }) => {
  const { firebase } = useContext(FirebaseContext);

  return (
    <MenuWrapper scrolled={scrolled}>
      {/* <MenuItem scrolled={scrolled}>
        <Link to='/'>Home</Link>
      </MenuItem> */}
      {isBrowser() && firebase.auth().currentUser ? (
        <>
          <MenuItem>
            <Link to='/account'>Account</Link>
          </MenuItem>
          <MenuItem button>
            <Button small outlined>
              Log Out
            </Button>
          </MenuItem>
        </>
      ) : (
        <>
          <MenuItem>
            <Link to='/'>Home</Link>
          </MenuItem>
          <MenuItem button>
            <Button link='/signup' small outlined>
              Sign Up
            </Button>
          </MenuItem>
          <MenuItem button>
            <Button link='/login' margin small>
              Log In
            </Button>
          </MenuItem>
        </>
      )}
    </MenuWrapper>
  );
};

const MenuWrapper = styled.div`
  @media (min-width: 769px) {
    display: flex;
  }
  margin-left: auto;
  display: none;
  align-items: center;
  height: 100%;
  transition-duration: 0.25s;
`;

const MenuItem = styled.div`
  height: 100%;
  transition-duration: 0.25s;
  a {
    height: 100%;
    text-decoration: none;
    display: block;
    padding: ${(props) => (props.button ? '0' : '8px 24px')};
    font-weight: 500;
    transition-duration: 0.25s;
    color: ${props => props.theme.color.text.heading};
  }
  :hover a {
    transition-duration: 0.25s;
    color: ${(props) =>
      props.button
        ? ''
        : props.scrolled
        ? 'rgba(81, 160, 249, 1)'
        : 'rgba(81, 160, 249, 1)'} !important;
  }
`;

export default Menu;
