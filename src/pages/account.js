// src/pages/account.js
import React, { useContext } from 'react';
import { Router } from '@reach/router';
import { Link } from 'gatsby';
import styled from 'styled-components';
import Layout from '../components/layout/layout';
import Section from '../components/layout/Section';
import AccountHome from '../components/account/AccountHome';
import AccountSettings from '../components/account/AccountSettings';
import AccountBilling from '../components/account/AccountBilling';
import Row from '../components/grid/row';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AuthContext } from '../providers/AuthProvider';
import Card from '../components/Card';
import Button from '../components/Button';

const Account = () => {
  const { signedIn, user } = useContext(AuthContext);

  return (
    <Section>
      {signedIn && user ? (
        <Row breakpoints={[900]} spacing={[18, 18]}>
          <div widths={[3]}>
            <Tabs>
              <Tab
                active={
                  (typeof window !== 'undefined' &&
                    window.location.pathname === '/account') ||
                  window.location.pathname === '/account/'
                }
                to='/account'
              >
                <FontAwesomeIcon icon='home' />
                General
              </Tab>
              <Tab
                active={
                  typeof window !== 'undefined' &&
                  window.location.pathname.includes('/account/settings')
                }
                to='/account/settings'
              >
                <FontAwesomeIcon icon='cog' />
                Settings
              </Tab>
              <Tab
                active={
                  typeof window !== 'undefined' &&
                  window.location.pathname.includes('/account/billing')
                }
                to='/account/billing'
              >
                <FontAwesomeIcon icon='dollar-sign' />
                Billing
              </Tab>
            </Tabs>
          </div>
          <div widths={[9]}>
            <Router>
              <AccountHome path='/account' />
              <AccountSettings path='/account/settings' />
              <AccountBilling path='/account/billing' />
            </Router>
          </div>
        </Row>
      ) : (
        <Card>
          <h1>
            This page is top-secret!
            <span aria-label='Shushing Emoji' role='img'>
              🤫
            </span>
          </h1>
          <p>
            This page is only available to Triangle users. You can join the club
            by signing up for an account.
          </p>
          <Button link='/signup' secondary>
            Let's Go!
          </Button>
        </Card>
      )}
    </Section>
  );
};

const Tabs = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  @media (min-width: 900px) {
    flex-direction: column;
  }
`;

const Tab = styled(Link)`
  width: fit-content;
  display: block;
  text-align: center;
  padding: 8px 16px;
  background: white;
  border-radius: 50px;
  margin-right: 8px;
  border: 1px solid ${(props) => props.theme.color.gray.three};
  color: ${(props) =>
    props.active
      ? props.theme.color.primary.main
      : props.theme.color.text.heading};
  :hover {
    cursor: pointer;
  }
  svg {
    margin-right: 8px;
    color: ${(props) =>
      props.active ? props.theme.color.primary.dark : 'inherit'};
  }
  text-decoration: none;
  @media (min-width: 900px) {
    // padding: 8px 0;
    margin: 4px 0;
    // background: transparent;
    // border: none;
    // border-radius: none;
  }
`;

export default Account;
