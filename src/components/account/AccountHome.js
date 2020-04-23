// src/pages/AccountHome.js
import React, { useContext, useEffect, useState } from 'react';
import { Router } from '@reach/router';
import { Link } from 'gatsby';
import styled, { keyframes } from 'styled-components';
import Card from '../Card';
import { AuthContext } from '../../providers/AuthProvider';
import Button from '../Button';
import Spacer from '../Spacer';
import { DatabaseContext } from '../../providers/DatabaseProvider';
import Loader from '../Loader';
import DelayedLoad from '../DelayedLoad';
import EditPersonalInfoModal from './EditPersonalInfoModal';
import { AppContext } from '../../providers/AppProvider';

const AccountHome = ({ data }) => {
  const { setEditModalOpen } = useContext(AppContext);
  const openEditModal = () => {
    setEditModalOpen(true);
  };
  return (
    // <DelayedLoad>
      <SlideWrapper>
        <h2 className='mt-none'>Account Info</h2>
        <Card title='Personal Info'>
          {data.name ? (
            <>
              <p className='small m-none'>Name: {data.name}</p>
              <p className='small m-none'>Email: {data.email}</p>
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
          {data.name ? (
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

export default AccountHome;
