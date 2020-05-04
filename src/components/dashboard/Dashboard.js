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

const Dashboard = () => {
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
      <Card title='Sites'>
        All Sites!
      </Card>
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

export default Dashboard;
