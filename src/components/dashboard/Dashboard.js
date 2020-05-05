/* eslint-disable react/jsx-fragments */
// src/pages/Dashboard.js
import React, { useContext, useEffect, useState } from 'react';
import { Router } from '@reach/router';
import { Link } from 'gatsby';
import styled, { keyframes } from 'styled-components';
import Card from '../Card';
import Button from '../Button';
import Spacer from '../Spacer';
import Loader from '../Loader';
import DelayedLoad from '../DelayedLoad';
import EditPersonalInfoModal from './EditPersonalInfoModal';
import { AppContext } from '../../providers/AppProvider';
import { FirebaseContext } from '../../providers/FirebaseProvider';
import { isBrowser } from '../../utils/isBrowser';
import { DatabaseContext } from '../../providers/DatabaseProvider';
import Row from '../grid/Row';
import { formatDate } from '../../utils/formatDate';

const Dashboard = () => {
  const { setEditModalOpen } = useContext(AppContext);
  const { firebase, firebaseUser } = useContext(FirebaseContext);
  const [sites, setSites] = useState([]);
  const { state, q } = useContext(DatabaseContext);
  const { user, userClient } = state;

  useEffect(() => {
    userClient
      .query(
        q.Map(
          q.Paginate(q.Match(q.Index('all_sites'))),
          q.Lambda(
            'sitesRef',
            q.Let(
              {
                sites: q.Get(q.Var('sitesRef')),
                user: q.Get(q.Select(['data', 'user'], q.Var('sites'))),
              },
              {
                user: q.Select(['ref'], q.Var('user')),
                site: q.Var('sites'),
              }
            )
          )
        )
      )
      .then((response) => {
        console.log(response);
        setSites(response.data);
      })
      .catch((error) => console.log(error));
  }, [user]);

  return (
    // <DelayedLoad>
    <SlideWrapper>
      <Row spacing={[12]} breakpoints={[0]}>
        <div widths={[6]}>
          <h2 className='m-none'>Sites</h2>
        </div>
        <div widths={[6]}>
          <Button link='/dashboard/new' right small secondary>
            <span
              style={{
                fontSize: 26,
                lineHeight: '8px',
                position: 'relative',
                top: 5,
              }}
            >
              +
            </span>{' '}
            New Site
          </Button>
        </div>
      </Row>
      {sites && sites.length > 0 ? (
        <Row breakpoints={[0, 576, 769]} spacing={[24]}>
          {sites.map(({ site }) => {
            console.log(site);

            return (
              <Site
                widths={[12, 6, 4]}
                to={`/dashboard/sites/${site.data.name
                  .toLowerCase()
                  .replace(/ /g, '-')
                  .replace("'", '')}`}
              >
                <Card
                  customStyles={`
                    height: 100%;
                    text-align: center;
                    display: flex;
                    align-items: center;
                    flex-direction: column;
                    justify-content: center;
                    height: 225px;
                  `}
                >
                  <SiteName>{site.data.name}</SiteName>
                  <SiteDate>
                    Created on {formatDate(site.ts)}
                  </SiteDate>
                </Card>
              </Site>
            );
          })}
        </Row>
      ) : (
        <Card>No sites!</Card>
      )}
    </SlideWrapper>
  );
};

const Site = styled(Link)`
  width: 100%;
  height: 100%;
  // max-width: 300px;
  height: 225px;
  display: block;
  // border-bottom: 2px solid ${(props) => props.theme.color.gray.three};
  text-decoration: none;
`;

const SiteName = styled.h2`
  margin-top: 0;
`;

const SiteDate = styled.small`
  color: ${(props) => props.theme.color.text.paragraph};
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

export default Dashboard;
