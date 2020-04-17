import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import Button from '../Button';

const Menu = ({ scrolled }) => {
  return (
    <MenuWrapper scrolled={scrolled}>
      {/* <MenuItem scrolled={scrolled}>
        <Link to='/'>Home</Link>
      </MenuItem> */}
      <MenuItem>
        <Button small outlined>
          Sign Up
        </Button>
      </MenuItem>
      <MenuItem>
        <Link to='/login'>
          <Button margin small>
            Login
          </Button>
        </Link>
      </MenuItem>
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
    display: block;
    padding: 8px 16px;
    font-weight: 500;
    transition-duration: 0.25s;
  }
  :hover a {
    transition-duration: 0.25s;
    color: ${(props) =>
      props.scrolled
        ? 'rgba(81, 160, 249, 1)'
        : 'rgba(81, 160, 249, 1)'} !important;
  }
`;

export default Menu;
