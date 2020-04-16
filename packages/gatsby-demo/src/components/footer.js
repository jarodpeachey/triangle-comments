import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

const Footer = () => (
  <Wrapper>
    <Container className='container'>
      <div className='row v-align-center'>
        <div className='col col-6 center-text tablet-align-text-left'>
          <h2 className='navbar-title'>Jarod Peachey</h2>
        </div>
        <div className='col col-6 center-text tablet-align-text-left'>
          <div className='row mobile align-center tablet-align-right'>
            <div className='menu-item'>
              <MenuLink href='mailto:jwpeachey107@aol.com'>
                <FontAwesomeIcon icon='envelope' />
              </MenuLink>
            </div>
            <div className='menu-item'>
              <MenuLink href='https://github.com/jarodpeachey'>
                <FontAwesomeIcon icon={['fab', 'github']} id='menu-toggle' />
              </MenuLink>
            </div>
            <div className='menu-item'>
              <MenuLink href='https://linkeding.com/in/jarod-peachey'>
                <FontAwesomeIcon icon={['fab', 'linkedin']} id='menu-toggle' />
              </MenuLink>
            </div>
          </div>
        </div>
      </div>
    </Container>
  </Wrapper>
);

const Wrapper = styled.div`
  width: 100%;
  background: rgb(81, 160, 249)  ;
  color: white;
`;

const Container = styled.div`
  padding-top: 16px;
  padding-bottom: 16px;
`;

const MenuLink = styled.a`
  padding: 12px !important;
  font-size: 26px !important;
`;

export default Footer;
