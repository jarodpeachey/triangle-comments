// src/pages/Settings.js
import React, { useContext, useEffect, useState } from 'react';
import { Router } from '@reach/router';
import { Link } from 'gatsby';
import styled, { keyframes } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Card from '../Card';
import Button from '../Button';
import Spacer from '../Spacer';
import { AppContext } from '../../providers/AppProvider';
import { isBrowser } from '../../utils/isBrowser';
import { DatabaseContext } from '../../providers/DatabaseProvider';
import Row from '../grid/Row';

const Settings = () => {
  const { setEditModalOpen } = useContext(AppContext);
  const [reRender, setRender] = useState(false);
  const [activeTab, setActiveTab] = useState(
    isBrowser() && window.location.pathname.includes('api') ? 'api' : 'general'
  );
  const [keys, setKeys] = useState([]);
  const [key, setKey] = useState('');

  const { state, userClient, q } = useContext(DatabaseContext);
  const { user } = state;

  useEffect(() => {
    setRender(false);

    // console.log(faunaUser.ref);

    // if (!reRender) {
    //   serverClient
    //     .query(
    //       q.Map(
    //         q.Paginate(q.Match(q.Index('all_keys'))),
    //         q.Lambda(
    //           'keysRef',
    //           q.Let(
    //             {
    //               keys: q.Get(q.Var('keysRef')),
    //               user: q.Get(q.Select(['data', 'user'], q.Var('keys'))),
    //             },
    //             {
    //               user: q.Select(['ref'], q.Var('user')),
    //               key: q.Select(['data', 'key'], q.Var('keys')),
    //             }
    //           )
    //         )
    //       ),
    //       { secret: 'fnEDqswJoPACEgOmCb0MkAIUO0Mtcu5wDWGg5PSvigYek3Aac8s' }
    //     )
    //     .then((keysResponse) => {
    //       console.log('Keys from user: ', keysResponse.data);
    //       setKeys(keysResponse.data);
    //     })
    //     .catch((commentsError) => console.log(commentsError));
    // }
  }, [reRender]);

  // if (key) {
  //   serverClient
  //     .query(
  //       q.Map(
  //         q.Paginate(q.Match(q.Index('all_keys'))),
  //         q.Lambda(
  //           'keysRef',
  //           q.Let(
  //             {
  //               keys: q.Get(q.Var('keysRef')),
  //               user: q.Get(q.Select(['data', 'user'], q.Var('keys'))),
  //             },
  //             {
  //               user: q.Select(['data', 'name'], q.Var('user')),
  //               key: q.Select(['data', 'key'], q.Var('keys')),
  //             }
  //           )
  //         )
  //       ),
  //       { secret: key }
  //     )
  //     .then((keysResponse) => {
  //       console.log('Keys from user: ', keysResponse);
  //       setKeys(keysResponse.data);
  //     })
  //     .catch((keysError) => console.log(keysError));
  // } else {
  //   serverClient
  //     .query(
  //       q.Map(
  //         q.Paginate(q.Match(q.Index('all_keys'))),
  //         q.Lambda(
  //           'keysRef',
  //           q.Let(
  //             {
  //               keys: q.Get(q.Var('keysRef')),
  //               user: q.Get(q.Select(['data', 'user'], q.Var('keys'))),
  //             },
  //             {
  //               user: q.Select(['data', 'name'], q.Var('user')),
  //               key: q.Select(['data', 'key'], q.Var('keys')),
  //             }
  //           )
  //         )
  //       )
  //     )
  //     .then((keysResponse) => {
  //       console.log('Keys from all users: ', keysResponse);
  //     })
  //     .catch((keysError) => console.log(keysError));
  // }

  const openEditModal = () => {
    setEditModalOpen(true);
  };

  const createAPIKey = () => {
    userClient
      .query(
        q.Login(q.Match(q.Index('user_by_id'), user.data.id), {
          password: user.data.id,
        })
      )
      .then((secretResponse) => {
        console.log('Secret: ', secretResponse);

        alert(`New API key created: ${secretResponse.secret}`);

        userClient
          .query(
            q.Create(q.Collection('keys'), {
              data: {
                user: q.Select(
                  'ref',
                  q.Get(q.Match(q.Index('user_by_id'), user.data.id))
                ),
                key: secretResponse.secret,
              },
            })
          )
          .then((commentsResponseTwo) => {
            console.log(commentsResponseTwo);

            setKey(secretResponse.secret);
            // setRender(true);
          })
          .catch((commentsErrorTwo) => console.log(commentsErrorTwo));
      })
      .catch((secretErr) => console.log(secretErr));
  };

  return (
    // <DelayedLoad>
    <span>
      <Row spacing={[32]} breakpoints={[769]}>
        <div widths={[3]}>
          <Tabs>
            <Tab
              active={
                (isBrowser() &&
                  window.location.pathname === '/dashboard/settings/') ||
                (isBrowser() &&
                  window.location.pathname === '/dashboard/settings')
              }
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.history.pushState({}, '', '/dashboard/settings');
                }
                setActiveTab('general');
              }}
            >
              <FontAwesomeIcon icon='home' />
              General
            </Tab>
            <Tab
              active={
                isBrowser() &&
                window.location.pathname.includes('/settings/api')
              }
              onClick={() => {
                if (isBrowser()) {
                  window.history.pushState({}, '', '/dashboard/settings/api');
                }
                setActiveTab('api');
              }}
            >
              <FontAwesomeIcon icon='cog' />
              API
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
        <div widths={[9]}>
          {activeTab === 'general' && (
            <Card title='Account'>
              <p className='small m-none'>Name: {user.data.name || 'Guest'}</p>
              <p className='small m-none'>Email: {user.data.email}</p>
              <Spacer />
              <Button onClick={() => openEditModal(true)} gray small>
                Edit
              </Button>
            </Card>
          )}
          {activeTab === 'api' && (
            <Card
              title='API Keys'
              subtitle='Your API keys grant access to all your comments. Keep them safe.'
            >
              {keys.map((key) => {
                return (
                  <APIKey key={`api-key-${key.key}`}>
                    <strong>Key:</strong> {key.key}
                  </APIKey>
                );
              })}
              {/* <Spacer /> */}
              <Button onClick={() => createAPIKey()} small>
                Create New
              </Button>
            </Card>
          )}
        </div>
      </Row>
    </span>
  );
};

const Tabs = styled.div`
  width: 100%;
  position: relative;
`;

const Tab = styled.div`
  width: fit-content;
  width: 100%;
  display: block;
  padding: 8px 16px;
  border-radius: 50px;
  margin-right: 8px;
  transition-duration: 0.25s;
  background: ${(props) =>
    props.active ? props.theme.color.primary.backgroundDark : 'transparent'};
  color: ${(props) => (props.active ? 'white' : 'initial')};
  :hover {
    cursor: pointer;
    background: ${(props) =>
      props.active
        ? `${props.theme.color.primary.backgroundDark}`
        : props.theme.color.gray.three};
    transition-duration: 0.25s;
  }
  svg {
    margin-right: 8px;
    color: inherit;
  }
  text-decoration: none;
`;

const APIKey = styled.p`
  margin-top: 4px;
  margin-bottom: 0;
  border-radius: 5px;
  border: 1px solid ${(props) => props.theme.color.gray.three};
  padding: 12px;
  margin: 16px 0;
`;

const CommentWrapper = styled.div`
  border: 2px solid ${(props) => props.theme.color.gray.two};
  padding: 12px;
  border-radius: 3px;
  margin: 16px 0;
`;

const CommentTitle = styled(Link)`
  margin: 0;
  margin-bottom: 8px;
  text-decoration: none;
  color: ${(props) => props.theme.color.text.heading} !important;
  :hover {
    color: ${(props) => props.theme.color.primary.main} !important;
  }
`;

const animation = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateY(0);
  }
`;

const SlideWrapper = styled.div`
  animation: ${animation} 250ms ease-out;
`;

export default Settings;
