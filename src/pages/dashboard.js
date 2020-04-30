/* eslint-disable react/jsx-fragments */
// src/pages/dashboard.js
import React, { useContext, useState, useEffect } from 'react';
import { Router } from '@reach/router';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Section from '../components/layout/Section';
import Dashboard from '../components/dashboard/Dashboard';
import Settings from '../components/dashboard/Settings';
import Billing from '../components/dashboard/Billing';
import DelayedLoad from '../components/DelayedLoad';
import Row from '../components/grid/Row';
import Card from '../components/Card';
import Button from '../components/Button';
import Loader from '../components/Loader';
import { FirebaseContext } from '../providers/FirebaseProvider';
import { isBrowser } from '../utils/isBrowser';
import { DatabaseContext } from '../providers/DatabaseProvider';
import { AppContext } from '../providers/AppProvider';
import Spacer from '../components/Spacer';

const Account = () => {
  const [activeTab, setActiveTab] = useState(
    isBrowser() && window.location.pathname.includes('settings')
      ? 'settings'
      : isBrowser() && window.location.pathname.includes('comments')
      ? 'comments'
      : 'home'
  );
  const { firebase, firebaseUser } = useContext(FirebaseContext);
  const { faunaUser } = useContext(DatabaseContext);
  const { signedIn } = useContext(AppContext);
  const [state, setState] = useState({});

  useEffect(() => {
    console.log(faunaUser);
  }, [faunaUser]);

  return (
    <DelayedLoad
      fullHeight
      condition={faunaUser || null}
      delay={4000}
      render={
        <div id='blur'>
          <Section
            thin
            customStyles={`
          position: absolute;
          top: 0;
          padding: 96px 0 24px;
          display: block;
          width: 100%;
        `}
            dark
          >
            <Row
              customStyles={`
              align-items: flex-end !important;
            `}
              spacing={[12]}
              breakpoints={[769]}
            >
              <div widths={['auto']}>
                {' '}
                <Title className='mb-none'>
                  {faunaUser && faunaUser.data.name}
                </Title>
                <SiteLink href='https://google.com'>
                  https://google.com
                </SiteLink>
              </div>
              <div widths={['auto']}>
                {' '}
                <Tabs>
                  <Tab
                    active={
                      (isBrowser() &&
                        window.location.pathname === '/dashboard') ||
                      (isBrowser() &&
                        window.location.pathname === '/dashboard/')
                    }
                    onClick={() => {
                      if (typeof window !== 'undefined') {
                        window.history.pushState({}, '', '/dashboard');
                      }
                      setActiveTab('home');
                    }}
                  >
                    <FontAwesomeIcon icon='home' />
                    Dashboard
                  </Tab>
                  <Tab
                    active={
                      isBrowser() &&
                      window.location.pathname.includes('/comments')
                    }
                    onClick={() => {
                      if (isBrowser()) {
                        window.history.pushState({}, '', '/dashboard/comments');
                      }
                      setActiveTab('comments');
                    }}
                  >
                    <FontAwesomeIcon icon='comment' />
                    Comments
                  </Tab>
                  <Tab
                    active={
                      isBrowser() &&
                      window.location.pathname.includes('/settings')
                    }
                    onClick={() => {
                      if (isBrowser()) {
                        window.history.pushState({}, '', '/dashboard/settings');
                      }
                      setActiveTab('settings');
                    }}
                  >
                    <FontAwesomeIcon icon='cog' />
                    Settings
                  </Tab>
                  {/* <Tab
                      active={
                        typeof window !== 'undefined' &&
                        window.location.pathname.includes('/dashboard/settings')
                      }
                      onClick={() => {
                        if (typeof window !== 'undefined') {
                          window.history.pushState({}, '', '/dashboard/dashboard/billing');
                        }
                        setActiveTab('billing');
                      }}
                    >
                      <FontAwesomeIcon icon='dollar-sign' />
                      Billing
                    </Tab> */}
                </Tabs>
              </div>
            </Row>
          </Section>
          <Section
            customStyles={`
        padding-top: 80px;
                  @media(min-width: 769px) {
            padding-top: 48px;
          }
      `}
          >
            <span>
              <Spacer height={36} />
              {/* <Router>
                      <DelayedLoad> */}
              {activeTab === 'home' && <Dashboard />}
              {activeTab === 'settings' && <Settings />}
              {/* {activeTab === 'billing' && <Billing />} */}
              {/* </DelayedLoad>
                    </Router> */}
            </span>
          </Section>
        </div>
      }
      fail={
        <div id='blur'>
          <Card>
            <h1>
              This page is top-secret!
              <span aria-label='Shushing Emoji' role='img'>
                🤫
              </span>
            </h1>
            <p>
              This page is only available to Triangle users. You can join the
              club by signing up for an dashboard.
            </p>
            <Button link='/signup' secondary>
              Let's Go!
            </Button>
          </Card>
        </div>
      }
    />
  );
};

const Title = styled.h1`
  color: white !important;
`;

const SiteLink = styled.a`
  margin: 0;
  text-decoration: none;
  color: #ffffffcc !important;
  :hover {
    color: ${(props) => props.theme.color.primary.light};
  }
`;

const Tabs = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
  @media(min-width: 769px) {
    justify-content: flex-end;
  }
  margin-bottom -12px;
  margin-left: -16px;
`;

const Tab = styled.div`
  width: fit-content;
  display: block;
  text-align: center;
  padding: 8px 16px;
  border-radius: 50px;
  margin-right: 8px;
  transition-duration: 0.25s;
  color: ${(props) => (props.active ? 'white' : '#ffffff90')};
  :hover {
    cursor: pointer;
    background: #00000060;
    transition-duration: 0.25s;
  }
  svg {
    margin-right: 8px;
    color: inherit;
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
