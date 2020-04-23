/* eslint-disable react/jsx-fragments */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import Row from '../grid/Row';

const Footer = () => {
  return (
    <>
      {typeof window !== 'undefined' &&
      !window.location.pathname.includes('/signup') &&
      !window.location.pathname.includes('/login') ? (
        <FooterWrapper>
          <FooterContainer className='container'>
            <Row spacing={[12, 0]} breakpoints={[1]}>
              <div widths={[6]}>
                <FooterTitle>
                  <h2 className='logo'>Staticbox</h2>
                </FooterTitle>
              </div>
              <FooterMenu widths={[6]}>
                <FooterMenuLink href='mailto:jwpeachey107@aol.com'>
                  <FontAwesomeIcon icon='envelope' />
                </FooterMenuLink>

                <FooterMenuLink href='https://github.com/jarodpeachey'>
                  <FontAwesomeIcon icon={['fab', 'github']} id='menu-toggle' />
                </FooterMenuLink>

                <FooterMenuLink href='https://linkedin.com/in/jarod-peachey'>
                  <FontAwesomeIcon
                    icon={['fab', 'linkedin']}
                    id='menu-toggle'
                  />
                </FooterMenuLink>
              </FooterMenu>
            </Row>
          </FooterContainer>
        </FooterWrapper>
      ) : null}
    </>
  );
};

const FooterWrapper = styled.div`
  width: 100%;
  background: ${props => props.theme.color.primary.backgroundDark};
  color: white;
  display: block;
  margin-top: auto;
`;

const FooterTitle = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  height: 50px;
  h2 {
    margin: 0;
    
  }
`;

const FooterContainer = styled.div`
  padding-top: 10px !important;
  padding-bottom: 10px !important;
`;

const FooterMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const FooterMenuLink = styled.a`
  padding: 12px !important;
  font-size: 26px !important;
  text-decoration: none;
  color: white !important;
  display: block;
  display: flex;
  align-items: center;
  justify-content: center;
  * {
    width: 30px !important;
    height: 30px !important;
  }
  :hover {
    background: #ffffff30;
  }
`;

export default Footer;
