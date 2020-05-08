/* eslint-disable react/jsx-key */
/* eslint-disable react/jsx-fragments */
// src/pages/Dashboard.js
import React, { useContext, useEffect, useState } from 'react';
import { Router } from '@reach/router';
import { Link } from 'gatsby';
import styled, { keyframes, css } from 'styled-components';
import Card from '../Card';
import Button from '../Button';
import { AppContext } from '../../providers/AppProvider';
import { FirebaseContext } from '../../providers/FirebaseProvider';
import { DatabaseContext } from '../../providers/DatabaseProvider';
import Row from '../grid/Row';
import { formatDate } from '../../utils/formatDate';
import Spacer from '../Spacer';
import { formatSiteId } from '../../utils/formatSiteId';

const Dashboard = ({ setSitesFunction, loadedSites }) => {
  const { setEditModalOpen } = useContext(AppContext);
  const { firebase, firebaseUser } = useContext(FirebaseContext);
  const [sites, setSites] = useState(loadedSites && loadedSites.length > 0 ? loadedSites : []);
  const { state, q } = useContext(DatabaseContext);
  const { user, userClient } = state;
  const [loading, setLoading] = useState(!(loadedSites && loadedSites.length > 0));
  const [showItems, setShowItems] = useState((loadedSites && loadedSites.length > 0));
  const [animate, setAnimate] = useState(false);
  const [animateItems, setAnimateItems] = useState(false);

  useEffect(() => {
    if (loadedSites && loadedSites.length > 0) {
      // setSites(loadedSites);
    } else {
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
          setSitesFunction(response.data);
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
        })
        .catch((error) => {
          console.log(error);
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
  }, [user]);

  return (
    // <DelayedLoad>
    <span>
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
      <Spacer height={48} />
      {loading && (
        <Row breakpoints={[0, 576, 769]} spacing={[24]}>
          <div widths={[12, 6, 4]}>
            <Site to='#' widths={[12, 6, 4]}>
              <Skeleton animate={animate}>
                <SiteName skeleton />
                <SiteDate skeleton />
              </Skeleton>
            </Site>
          </div>
          <div widths={[12, 6, 4]}>
            <Site to='#' widths={[12, 6, 4]}>
              <Skeleton animate={animate}>
                <SiteName skeleton />
                <SiteDate skeleton />
              </Skeleton>
            </Site>
          </div>
          <div widths={[12, 6, 4]}>
            <Site to='#' widths={[12, 6, 4]}>
              <Skeleton animate={animate}>
                <SiteName skeleton />
                <SiteDate skeleton />
              </Skeleton>
            </Site>
          </div>
        </Row>
      )}
      {showItems && (
        <>
          {sites && sites.length > 0 ? (
            <div
              style={{
                position: animateItems ? 'absolute' : 'static',
                top: 0,
                left: 0,
                width: '100%',
              }}
            >
              <Row breakpoints={[0, 576, 769]} spacing={[24]}>
                {sites.map(({ site }) => {
                  return (
                    <Site
                      widths={[12, 6, 4]}
                      to={`/dashboard/sites/${formatSiteId(site.data.name)}`}
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
                        transform: scale(${animateItems ? 1 : loading ? 0 : 1});
                        transition: transform .2s ease-out;
                       `}
                      >
                        <SiteName>{site.data.name}</SiteName>
                        <SiteDate>Created on {formatDate(site.ts)}</SiteDate>
                      </Card>
                    </Site>
                  );
                })}
              </Row>
            </div>
          ) : (
            <Card
              customStyles={`
                transform: scale(${animateItems ? 1 : loading ? 0 : 1});
                transition: transform .2s ease-out;`}
            >
              No sites!
            </Card>
          )}
        </>
      )}
    </span>
  );
};

const shimmer = keyframes`
  100% {
    transform: translateX(100%);
  }
`;

const Skeleton = styled.div`
  padding: 16px;
  // margin-bottom: 32px;
  background: white;
  border-radius: 5px;
  border: 1px solid ${(props) => props.theme.color.gray.three};
  height: 100%;
  text-align: center;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  height: 225px;
  overflow: hidden;
  position: relative;
  transform: scale(${(props) => (props.animate ? 0 : 1)});
  opacity: ${(props) => (props.animate ? 0 : 1)};
  transition: all 0.2s ease-in;
  ::after {
    content: '' !important;
    position: absolute !important;
    top: 0 !important;
    right: 0 !important;
    left: 0 !important;
    height: 100% !important;
    bottom: 0 !important;
    transform: translateX(-100%) !important;
    background-image: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0,
      rgba(255, 255, 255, 0.5) 30%,
      rgba(255, 255, 255, 0) 50%,
      rgba(255, 255, 255, 0.5) 70%,
      rgba(255, 255, 255, 0) 100%
    ) !important;
    animation: ${shimmer} 2s infinite !important;
  }
`;

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
  ${(props) =>
    props.skeleton &&
    css`
      width: 60%;
      height: 20px;
      border-radius: 5px;
      background: ${props.theme.color.gray.four};
      margin: 0 auto;
      display: block;
      margin: 0 0 12px 0;
      overflow-x: hidden;
      position: relative;
    `};
`;

const SiteDate = styled.small`
  color: ${(props) => props.theme.color.text.paragraph};
  margin-top: 0;
  ${(props) =>
    props.skeleton &&
    css`
      width: 30%;
      height: 20px;
      border-radius: 5px;
      background: ${props.theme.color.gray.four};
      margin: 0 auto;
      display: block;
      overflow-x: hidden;
    //   ::after {
    //     content: '';
    //     position: absolute;
    //     top: 0;
    //     right: 0;
    //     left: 0;
    //     bottom: 0;
    //     transform: translateX(-100%);
    //     background-image: linear-gradient(
    //       90deg,
    //       rgba(255, 255, 255, 0) 0,
    //       rgba(255, 255, 255, 0.2) 20%,
    //       rgba(255, 255, 255, 0.5) 60%,
    //       rgba(255, 255, 255, 0) 0
    //     );
    //     animation: ${shimmer} 5s infinite;
    //   }
    // `};
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
