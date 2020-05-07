/* eslint-disable react/jsx-fragments */
import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DatabaseContext } from '../../providers/DatabaseProvider';
import Section from '../layout/Section';
import Row from '../grid/Row';
import Spacer from '../Spacer';
import SiteSettings from './SiteSettings';
import SiteDashboard from './SiteDashboard';
import { isBrowser } from '../../utils/isBrowser';
import DelayedLoad from '../DelayedLoad';
import Card from '../Card';
import Button from '../Button';
import { AppContext } from '../../providers/AppProvider';
import SiteComments from './SiteComments';

const Site = () => {
  const [activeTab, setActiveTab] = useState(
    isBrowser() && window.location.pathname.includes('comments')
      ? 'comments'
      : isBrowser() && window.location.pathname.includes('settings')
      ? 'settings'
      : 'home'
  );
  const [loading, setLoading] = useState(true);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [siteNameIndex, setSiteNameIndex] = useState(3);
  const { setNotificationMessage, setNotificationType } = useContext(
    AppContext
  );
  const { state, q, dispatch } = useContext(DatabaseContext);
  const { user, site, userClient, siteClient } = state;

  useEffect(() => {
    const pathnames = window.location.pathname.split('/');

    console.log(pathnames);

    pathnames.forEach((item, index) => {
      if (item === 'sites') {
        setSiteNameIndex(index + 1);
      }
    });

    userClient
      .query(
        q.Get(
          q.Match(q.Index('site_by_id'), isBrowser() && q.Select(siteNameIndex, pathnames))
        )
      )
      .then((response) => {
        console.log(response);

        userClient
          .query(
            q.Login(q.Select('ref', response), {
              password: q.Select(['data', 'id'], response),
            })
          )
          .then((responseTwo) => {
            dispatch({
              type: 'loginSite',
              data: {
                secret: responseTwo.secret,
                site: response,
              },
            });
            setLoading(false);
          })
          .catch((errorTwo) => {
            setNotificationType('error');
            setNotificationMessage(
              'There was an error accessing your site data.'
            );
            // window.location.href = '/dashboard/sites';
            console.log('Error getting and logging in site: ', errorTwo);
          });
      })
      .catch((errorTwo) => {
        setNotificationType('error');
        setNotificationMessage('There was an error accessing your site data.');
        // window.location.href = '/dashboard/sites';
        console.log('Error getting site data: ', errorTwo);
      });
  }, [user]);

  useEffect(() => {
    window.addEventListener('resize', onResize);
    document.addEventListener('readystatechange', onResize);
  }, []);

  const onResize = () => {
    setHeaderHeight(document.getElementById('background').clientHeight);
  };

  console.log(site);
  return (
    <span>
      {loading ? (
        <DelayedLoad fullHeight infinite />
      ) : (
        <div id='blur'>
          <Section
            id='background'
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
              <div widths={[4]}>
                {' '}
                <Title className='mb-none'>{site && site.data.name}</Title>
                {/* <SiteLink href='https://google.com'>
                  https://google.com
                </SiteLink> */}
                <SubTitle>{site && site.data.id}</SubTitle>
              </div>
              <div widths={['auto']}>
                <Tabs>
                  <Tab
                    active={activeTab === 'home'}
                    onClick={() => {
                      if (isBrowser()) {
                        window.history.pushState(
                          {},
                          '',
                          `/dashboard/sites/${site.data.name
                            .toLowerCase()
                            .replace(/ /g, '-')}`
                        );
                      }
                      setActiveTab('home');
                    }}
                  >
                    <FontAwesomeIcon icon='home' />
                    Dashboard
                  </Tab>
                  <Tab
                    active={activeTab === 'comments'}
                    onClick={() => {
                      if (isBrowser()) {
                        window.history.pushState(
                          {},
                          '',
                          `/dashboard/sites/${site.data.name
                            .toLowerCase()
                            .replace(/ /g, '-')}/comments`
                        );
                      }
                      setActiveTab('comments');
                    }}
                  >
                    <FontAwesomeIcon icon='comment' />
                    Comments
                  </Tab>
                  <Tab
                    active={activeTab === 'settings'}
                    onClick={() => {
                      if (isBrowser()) {
                        window.history.pushState(
                          {},
                          '',
                          `/dashboard/sites/${site.data.name
                            .toLowerCase()
                            .replace(/ /g, '-')}/settings`
                        );
                      }
                      setActiveTab('settings');
                    }}
                  >
                    <FontAwesomeIcon icon='cog' />
                    <span className='tablet inline'>Site</span> Settings
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
              padding-top: 175px;
              @media(min-width: 435px) {
                padding-top: 151px;
              }
              @media(min-width: 769px) {
                padding-top: 87px;
              }
              padding-top: ${
                headerHeight > 0 ? headerHeight - 94 : null
              }px !important;
            `}
          >
            <span>
              {/* <Router>
                      <DelayedLoad> */}
              {activeTab === 'home' && <SiteDashboard />}
              {activeTab === 'settings' && <SiteSettings />}
              {activeTab === 'comments' && <SiteComments />}
              {/* {activeTab === 'billing' && <Billing />} */}
              {/* </DelayedLoad>
                    </Router> */}
            </span>
          </Section>
        </div>
      )}
    </span>
  );
};

const Title = styled.h1`
  color: white !important;
`;

const SubTitle = styled.p`
  color: #ffffffcc !important;
  margin: 0;
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
  align-items: center;
  @media(min-width: 480px) {
    flex-direction: row;
    margin-bottom -12px;
    margin-left: -16px;
  }
  @media(min-width: 769px) {
    justify-content: flex-end;
    margin-left: 0;
    margin-right: -20px;
  }
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
    color: inherit;
    @media (min-width: 435px) {
      margin-right: 8px;
    }
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
