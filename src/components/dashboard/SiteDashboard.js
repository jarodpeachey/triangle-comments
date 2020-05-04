// src/pages/SiteDashboard.js
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

const SiteDashboard = () => {
  const { setEditModalOpen } = useContext(AppContext);
  const { firebase, firebaseUser } = useContext(FirebaseContext);
  const [reRender, setRender] = useState(false);
  const { state } = useContext(DatabaseContext);
  const { user } = state;

  useEffect(() => {
    setRender(!reRender);
  }, [firebaseUser]);

  const openEditModal = () => {
    setEditModalOpen(true);
  };

  return (
    // <DelayedLoad>
    <SlideWrapper>
      {/* <h2 className='mt-none'>Account Info</h2> */}
      <Row spacing={[16]} breakpoints={[769]}>
        <div widths={[6]}>
          {/* <Card title='Account'>
            <p className='small m-none'>
              Name: {user.data.name || 'Guest'}
            </p>
            <p className='small m-none'>Email: {user.data.email}</p>
            <Spacer />
            <Button onClick={() => openEditModal(true)} gray small>
              Edit
            </Button>
          </Card> */}
          <Card title='Account'>
            <p className='small m-none'>Name: {user.data.name || 'Guest'}</p>
            <p className='small m-none'>Email: {user.data.email}</p>
            <Spacer />
            <Button link='/dashboard/account' gray small>
              More
            </Button>
          </Card>
        </div>
        <div widths={[6]}>
          <Card title='Latest Comments'>
            <CommentWrapper>
              <CommentTitle className='h3'>The Best Way To Live</CommentTitle>
              <p className='m-none'>
                Awesome post! I love the detail in this...
              </p>
              <small className='m-none'>- Mark Smith</small>
            </CommentWrapper>
            <CommentWrapper>
              <CommentTitle className='h3'>Top 10 Web Browsers</CommentTitle>
              <p className='m-none'>
                There's a broken link near the end of this. Great post th...
              </p>
              <small className='m-none'>- James Carlton</small>
            </CommentWrapper>
            <Spacer />
            <Button link='/dashboard/comment' gray small>
              More
            </Button>
          </Card>
        </div>
      </Row>
    </SlideWrapper>
  );
};

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

export default SiteDashboard;
