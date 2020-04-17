import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import Row from '../grid/row';

const Footer = () => (
  <Wrapper>
    <Container className='container'>
      <Row spacing={[12, 0]} breakpoints={[576]}>
        <div widths={[6]}>
          <Title>
            <h2>Triangle</h2>
          </Title>
        </div>
        <Menu widths={[6]}>
          <MenuLink href='mailto:jwpeachey107@aol.com'>
            <FontAwesomeIcon icon='envelope' />
          </MenuLink>

          <MenuLink href='https://github.com/jarodpeachey'>
            <FontAwesomeIcon icon={['fab', 'github']} id='menu-toggle' />
          </MenuLink>

          <MenuLink href='https://linkedin.com/in/jarod-peachey'>
            <FontAwesomeIcon icon={['fab', 'linkedin']} id='menu-toggle' />
          </MenuLink>
        </Menu>
      </Row>
    </Container>
  </Wrapper>
);

const Wrapper = styled.div`
  width: 100%;
  background: rgb(81, 160, 249);
  color: white;
`;

const Title = styled.div`
  @media (max-width: 576px) {
    justify-content: center;
  }
  display: flex;
  height: 100%;
  align-items: center;
  height: 50px;
  h2 {
    margin: 0;
  }
`;

const Container = styled.div`
  padding-top: 16px;
  padding-bottom: 16px;
`;

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  @media (max-width: 576px) {
    justify-content: center;
  }
`;

const MenuLink = styled.a`
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
