/* eslint-disable react/jsx-fragments */
// src/pages/account.js
import React, { useContext, useState, useEffect } from 'react';
import { Router } from '@reach/router';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Section from '../components/layout/Section';
import AccountHome from '../components/account/AccountHome';
import AccountSettings from '../components/account/AccountSettings';
import AccountBilling from '../components/account/AccountBilling';
import DelayedLoad from '../components/DelayedLoad';
import Row from '../components/grid/Row';
import Card from '../components/Card';
import Button from '../components/Button';
import Loader from '../components/Loader';
import { FirebaseContext } from '../providers/FirebaseProvider';

const Account = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [loading, setLoading] = useState(true);
  const firebase = useContext(FirebaseContext);
  const [state, setState] = useState({});

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);

    // console.log(user.id);
    // serverClient
    //   .query(q.Get(q.Match(q.Index('userByID'), user.id)))
    //   .then((res) => {
    //     console.log(res);

    //     setState({ name: res.data.name, email: res.data.email, ...state });
    //   });
  }, []);

  return (
    <div id='blur'>
      <Section>
        <DelayedLoad>
          {signedIn ? (
            <span>
              {loading ? (
                <Loader text='Preparing dashboard...' />
              ) : (
                <Row breakpoints={[900]} spacing={[18, 18]}>
                  <div widths={[3]}>
                    <Tabs>
                      <Tab
                        active={
                          (typeof window !== 'undefined' &&
                            window.location.pathname === '/account') ||
                          window.location.pathname === '/account/'
                        }
                        onClick={() => {
                          if (typeof window !== 'undefined') {
                            window.history.pushState({}, '', '/account');
                          }
                          setActiveTab('home');
                        }}
                      >
                        <FontAwesomeIcon icon='home' />
                        General
                      </Tab>
                      <Tab
                        active={
                          typeof window !== 'undefined' &&
                          window.location.pathname.includes('/account/settings')
                        }
                        onClick={() => {
                          if (typeof window !== 'undefined') {
                            window.history.pushState({}, '', '/settings');
                          }
                          setActiveTab('settings');
                        }}
                      >
                        <FontAwesomeIcon icon='cog' />
                        Settings
                      </Tab>
                      <Tab
                        active={
                          typeof window !== 'undefined' &&
                          window.location.pathname.includes('/account/settings')
                        }
                        onClick={() => {
                          if (typeof window !== 'undefined') {
                            window.history.pushState({}, '', '/account/billing');
                          }
                          setActiveTab('billing');
                        }}
                      >
                        <FontAwesomeIcon icon='dollar-sign' />
                        Billing
                      </Tab>
                    </Tabs>
                  </div>
                  <div widths={[9]}>
                    {/* <Router>
                      <DelayedLoad> */}
                    {activeTab === 'home' && (
                      <AccountHome data={userAccountInfo.data} />
                    )}
                    {activeTab === 'settings' && (
                      <AccountSettings data={userAccountInfo.data} />
                    )}
                    {activeTab === 'billing' && (
                      <AccountBilling data={userAccountInfo.data} />
                    )}
                    {/* </DelayedLoad>
                    </Router> */}
                  </div>
                </Row>
              )}
            </span>
          ) : (
            <Card>
              <h1>
                This page is top-secret!
                <span aria-label='Shushing Emoji' role='img'>
                  🤫
                </span>
              </h1>
              <p>
                This page is only available to Triangle users. You can join the
                club by signing up for an account.
              </p>
              <Button link='/signup' secondary>
                Let's Go!
              </Button>
            </Card>
          )}
        </DelayedLoad>
      </Section>
    </div>
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

const Tab = styled.div`
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
      props.active ? props.theme.color.primary.main : 'inherit'};
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
