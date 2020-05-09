// src/pages/settings.js
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

const SiteSettings = ({ setLoadedKeys, loadedKeys }) => {
  const { setEditSiteInfoModalOpen } = useContext(AppContext);
  const [reRender, setRender] = useState(false);
  const [activeTab, setActiveTab] = useState(
    isBrowser() && window.location.pathname.includes('api') ? 'api' : 'general'
  );
  const [keys, setKeys] = useState([]);

  const { state, q, serverClient } = useContext(DatabaseContext);
  const { site, user, siteClient } = state;

  useEffect(() => {
    if (loadedKeys && loadedKeys.length > 0) {
      setKeys(loadedKeys);
    } else {
      siteClient
        .query(
          q.Map(
            q.Paginate(q.Match(q.Index('all_keys'))),
            q.Lambda(
              'keysRef',
              q.Let(
                {
                  keys: q.Get(q.Var('keysRef')),
                  site: q.Get(q.Select(['data', 'site'], q.Var('keys'))),
                },
                {
                  site: q.Select(['ref'], q.Var('site')),
                  key: q.Select(['data', 'key'], q.Var('keys')),
                }
              )
            )
          )
        )
        .then((keysResponse) => {
          console.log('Keys from site: ', keysResponse.data);
          setLoadedKeys(keysResponse.data);
          setKeys(keysResponse.data);
        })
        .catch((keysError) => console.log(keysError));
    }
  }, []);

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
  //               site: q.Get(q.Select(['data', 'site'], q.Var('keys'))),
  //             },
  //             {
  //               site: q.Select(['data', 'name'], q.Var('site')),
  //               key: q.Select(['data', 'key'], q.Var('keys')),
  //             }
  //           )
  //         )
  //       ),
  //       { secret: key }
  //     )
  //     .then((keysResponse) => {
  //       console.log('Keys from site: ', keysResponse);
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
  //               site: q.Get(q.Select(['data', 'site'], q.Var('keys'))),
  //             },
  //             {
  //               site: q.Select(['data', 'name'], q.Var('site')),
  //               key: q.Select(['data', 'key'], q.Var('keys')),
  //             }
  //           )
  //         )
  //       )
  //     )
  //     .then((keysResponse) => {
  //       console.log('Keys from all sites: ', keysResponse);
  //     })
  //     .catch((keysError) => console.log(keysError));
  // }

  const openEditSiteInfoModal = () => {
    setEditSiteInfoModalOpen(true);
  };

  const createAPIKey = () => {
    siteClient
      .query(
        q.Login(q.Match(q.Index('site_by_id'), site.data.id), {
          password: site.data.id,
        })
      )
      .then((secretResponse) => {
        console.log('Secret: ', secretResponse);

        alert(`New API key created: ${secretResponse.secret}`);

        siteClient
          .query(
            q.Call(q.Function('create_key'), secretResponse.secret, user, site)
          )
          .then((keysResponseTwo) => {
            console.log(keysResponseTwo);

            const oldKeys = [...keys];

            oldKeys.push(keysResponseTwo.data);

            setKeys(oldKeys);
            // setRender(true);
          })
          .catch((keysErrorTwo) => console.log(keysErrorTwo));
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
              active={activeTab === 'general'}
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.history.pushState(
                    {},
                    '',
                    `/dashboard/sites/${site.data.id}/settings`
                  );
                }
                setActiveTab('general');
              }}
            >
              <FontAwesomeIcon icon='home' />
              General
            </Tab>
            <Tab
              active={activeTab === 'api'}
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.history.pushState(
                    {},
                    '',
                    `/dashboard/sites/${site.data.id}/settings/api`
                  );
                }
                setActiveTab('api');
              }}
            >
              <FontAwesomeIcon icon='cog' />
              API
            </Tab>
          </Tabs>
        </div>
        <div widths={[9]}>
          {activeTab === 'general' && (
            <Card title='Details'>
              <p className='small m-none'>Site Name: {site.data.name || 'Guest'}</p>
              <Spacer />
              <Button onClick={() => openEditSiteInfoModal(true)} gray small>
                Edit
              </Button>
            </Card>
          )}
          {activeTab === 'api' && (
            <Card
              title='API Keys'
              subtitle='Your API keys grant access to all your keys. Keep them safe.'
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

export default SiteSettings;
