// src/pages/AccountHome.js
import React, { useContext } from 'react';
import { Router } from '@reach/router';
import { Link } from 'gatsby';
import styled from 'styled-components';
import Card from '../Card';
import { AuthContext } from '../../providers/AuthProvider';
import Button from '../Button';
import Spacer from '../Spacer';

const AccountHome = () => {
  const { user } = useContext(AuthContext);

  return (
    <span>
      <h2 className='mt-none'>Account Info</h2>
      <Card title='Personal Info'>
        <p className='small m-none'>Name: {user.user_metadata.name}</p>
        <p className='small m-none'>Email: {user.email}</p>
        <Spacer />
        <Button gray small>
          Edit
        </Button>
      </Card>
      <Card title='Billing Info'>
        <p className='small m-none'>Plan: Developer</p>
        <p className='small m-none'>Last Payment Date: 10/07/01</p>
        <p className='small m-none'>Last Payment Amount: $15.00</p>
        <Spacer />
        <Button link='/account/billing' gray small>
          More
        </Button>
      </Card>
    </span>
  );
};

export default AccountHome;