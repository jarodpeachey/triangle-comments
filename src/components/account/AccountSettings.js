// src/pages/AccountSettings.js
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

const AccountSettings = () => {
  const { setEditModalOpen } = useContext(AppContext);
  const { firebase } = useContext(FirebaseContext);

  const openEditModal = () => {
    setEditModalOpen(true);
  };

  const currentUser = isBrowser() && firebase.auth().currentUser;

  return (
    // <DelayedLoad>
      <SlideWrapper>
        <h2 className='mt-none'>Account Info</h2>
        <Card title='Personal Info'>
          {currentUser ? (
            <>
              <p className='small m-none'>Name: {currentUser.displayName || 'Anonymous'}</p>
              <p className='small m-none'>Email: {currentUser.email}</p>
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
          {currentUser ? (
            <>
              <p className='small m-none'>Plan: Developer</p>
              <p className='small m-none'>Last Payment Date: 10/07/01</p>
              <p className='small m-none'>Last Payment Amount: $15.00</p>
              <Spacer />
              <Button link='/account/billing' gray small>
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

export default AccountSettings;
