// src/pages/Profile.js
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

const Profile = () => {
  const { setEditModalOpen } = useContext(AppContext);
  const { firebase, firebaseUser } = useContext(FirebaseContext);
  const { q, serverClient, faunaUser } = useContext(DatabaseContext);
  const [reRender, setRender] = useState(false);

  useEffect(() => {
    setRender(!reRender);
  }, [firebaseUser])

  const openEditModal = () => {
    setEditModalOpen(true);
  };

  return (
    // <DelayedLoad>
    <SlideWrapper>
      <h2 className='mt-none'>Account Info</h2>
      <Card title='Personal Info'>
        {firebaseUser && faunaUser ? (
          <>
            <p className='small m-none'>
              Name: {faunaUser.data.name || 'Guest'}
            </p>
            <p className='small m-none'>Email: {faunaUser.data.email}</p>
            <Spacer />
            <Button onClick={() => openEditModal(true)} gray small>
              Edit
            </Button>
          </>
        ) : (
          <Loader />
        )}
      </Card>
      <Card title='Billing Info'>
        {firebaseUser && faunaUser ? (
          <>
            <p className='small m-none'>Plan: Developer</p>
            <p className='small m-none'>Last Payment Date: 10/07/01</p>
            <p className='small m-none'>Last Payment Amount: $15.00</p>
            <Spacer />
            <Button link='/dashboard/billing' gray small>
              More
            </Button>
          </>
        ) : (
          <Loader />
        )}
      </Card>
    </SlideWrapper>
    //</DelayedLoad>
  );
};

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

export default Profile;
