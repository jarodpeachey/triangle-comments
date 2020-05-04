/* eslint-disable react/jsx-fragments */
import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DatabaseContext } from '../../providers/DatabaseProvider';
import Section from '../layout/Section';
import Row from '../grid/Row';
import Spacer from '../Spacer';
import SiteSettings from './SiteSettings';
import SiteDashboard from './SiteDashboard';
import { isBrowser } from '../../utils/isBrowser';

const Site = () => {
  const [activeTab, setActiveTab] = useState(
    isBrowser() && window.location.pathname.includes('comments') ?
      'comments' :
      isBrowser() && window.location.pathname.includes('settings') ?
      'settings' :
      'home'
  );
  const { state } = useContext(DatabaseContext);
  const { user } = state;

  console.log(user);
  return (
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
            <Title className='mb-none'>{user && user.data.name}</Title>
            {/* <SiteLink href='https://google.com'>
                  https://google.com
                </SiteLink> */}
          </div>
          <div widths={['auto']}>
            <Tabs>
              <Tab
                active={
                  isBrowser() &&
                  window.location.pathname === '/dashboard/sites/staticbox'
                }
                onClick={() => {
                  if (isBrowser()) {
                    window.history.pushState(
                      {},
                      '',
                      '/dashboard/sites/staticbox'
                    );
                  }
                  setActiveTab('home');
                }}
              >
                <FontAwesomeIcon icon='home' />
                Dashboard
              </Tab>
              <Tab
                active={
                  isBrowser() && window.location.pathname.includes('/comments')
                }
                onClick={() => {
                  if (isBrowser()) {
                    window.history.pushState(
                      {},
                      '',
                      '/dashboard/sites/staticbox/comments'
                    );
                  }
                  setActiveTab('comments');
                }}
              >
                <FontAwesomeIcon icon='comment' />
                Comments
              </Tab>
              <Tab
                active={
                  isBrowser() && window.location.pathname.includes('/settings')
                }
                onClick={() => {
                  if (isBrowser()) {
                    window.history.pushState(
                      {},
                      '',
                      '/dashboard/sites/staticbox/settings'
                    );
                  }
                  setActiveTab('settings');
                }}
              >
                <FontAwesomeIcon icon='cog' />
                Site Settings
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
          {activeTab === 'home' && <SiteDashboard />}
          {activeTab === 'settings' && <SiteSettings />}
          {/* {activeTab === 'billing' && <Billing />} */}
          {/* </DelayedLoad>
                    </Router> */}
        </span>
      </Section>
    </div>
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

export default Site;
