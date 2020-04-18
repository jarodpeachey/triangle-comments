// src/pages/account.js
import React from 'react';
import { Router } from '@reach/router';
import { Link } from 'gatsby';
import styled from 'styled-components';
import Layout from '../components/layout/layout';
import Section from '../components/layout/Section';

const Home = () => <p>Home</p>;
const Settings = () => <p>Settings</p>;
const Billing = () => <p>Billing</p>;

const Account = () => (
  <Section>
    <AccountTabs>
      <Link to='/account'>Home</Link>{' '}
      <Link to='/account/settings'>Settings</Link>{' '}
      <Link to='/account/billing'>Billing</Link>{' '}
    </AccountTabs>
    <Router>
      <Home path='/account' />
      <Settings path='/account/settings' />
      <Billing path='/account/billing' />
    </Router>
  </Section>
);

const AccountTabs = styled.div`
  display: flex;
  justify-content: flex-start;
`;

export default Account;
