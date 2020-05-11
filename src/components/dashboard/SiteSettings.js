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
import SiteKeyTable from '../SiteKeyTable';

const SiteSettings = ({ setLoadedKeys, loadedKeys }) => {
  const { setEditSiteInfoModalOpen } = useContext(AppContext);
  const [reRender, setRender] = useState(false);
  const [activeTab, setActiveTab] = useState(
    isBrowser() && window.location.pathname.includes('api') ? 'api' : 'general'
  );
  const [keys, setKeys] = useState(
    loadedKeys && loadedKeys.length > 0 ? loadedKeys : []
  );
  const [loading, setLoading] = useState(
    !(loadedKeys && loadedKeys.length > 0)
  );
  const [showItems, setShowItems] = useState(
    loadedKeys && loadedKeys.length > 0
  );
  const [animate, setAnimate] = useState(false);
  const [animateItems, setAnimateItems] = useState(false);

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
        .then((resTwo) => {
          console.log(resTwo);
          setLoadedKeys(resTwo.data);
          setKeys(resTwo.data);

          console.log(resTwo);
          setLoadedKeys(resTwo.data);
          setKeys(resTwo.data);
          setTimeout(() => {
            setShowItems(true);
            setAnimate(true);
            // setTimeout(() => {
            setAnimateItems(true);
            // }, 200);
            // setTimeout(() => {
            setLoading(false);
            setAnimate(false);
            setAnimateItems(false);
            // }, 200);
          }, 1000);
        })
        .catch((errTwo) => {
          console.log(errTwo);
          setShowItems(true);
          setAnimate(true);
          setTimeout(() => {
            setAnimateItems(true);
          }, 200);
          setTimeout(() => {
            setLoading(false);
            setAnimate(false);
            setAnimateItems(false);
          }, 200);
        });
    }
  }, []);

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
            q.Call(
              q.Function('create_key'),
              secretResponse.secret,
              user,
              site,
              'site'
            )
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

  const formatKeys = () => {
    const newKeys = [];

    keys.forEach((key) => {
      console.log(key);
      if (key.site) {
        newKeys.push({
          key: key.key,
          type: 'Site',
          site: key.site.name,
        });
      } else {
        newKeys.push({
          key: key.key,
          type: 'User',
          site: null,
        });
      }
    });

    return newKeys;
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
              <p className='small m-none'>
                Site Name: {site.data.name || 'Guest'}
              </p>
              <Spacer />
              <Button onClick={() => openEditSiteInfoModal(true)} gray small>
                Edit
              </Button>
            </Card>
          )}
          {activeTab === 'api' && (
            <Card
              title='API Keys'
              subtitle='Your API keys grant access to all your comments. Keep them safe.'
            >
              {/* {keys.map((key) => {
                return (
                  <APIKey key={`api-key-${key.key}`}>
                    <strong>Key:</strong> {key.key}
                  </APIKey>
                );
              })} */}
              <SiteKeyTable
                animate={animate}
                animateItems={animateItems}
                showItems={showItems}
                loading={loading}
                title='Keys'
                data={formatKeys()}
              />
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
