import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import Modal from '../Modal';
import Spacer from '../Spacer';
import Button from '../Button';
import { AppContext } from '../../providers/AppProvider';
import { FirebaseContext } from '../../providers/FirebaseProvider';
import { isBrowser } from '../../utils/isBrowser';
import Loader from '../Loader';

const PasswordModal = ({
  onSuccessFunction = () => {
    console.log('Function');
  },
}) => {
  let currentUser = isBrowser() ? localStorage.getItem('user') : null;
  currentUser = JSON.parse(currentUser);

  const [statePassword, setStatePassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { firebase } = useContext(FirebaseContext);

  const {
    setEditModalOpen,
    setNotificationMessage,
    setNotificationType,
    setPasswordModalOpen,
  } = useContext(AppContext);

  const onPasswordChange = (e) => {
    setStatePassword(e.target.value);
  };

  const updatePassword = () => {
    setLoading(true);

    console.log(statePassword);

    firebase
      .auth()
      .currentUser.reauthenticateWithCredential(
        isBrowser() && firebase.auth.EmailAuthProvider.credential(
          currentUser.email,
          statePassword
        )
      )
      .then((res) => {
        console.log('Success! ', res);
        setPasswordModalOpen(false);
        setNotificationMessage('Success!');
        setNotificationType('success');

        onSuccessFunction();
      })
      .catch((err) => {
        console.log('Error: ', err);
        setPasswordModalOpen(false);
        setNotificationMessage('Something went wrong.');
        setNotificationType('error');
      });
  };

  return (
    <Modal toggleFunction={() => setPasswordModalOpen(false)} noHeader noClose>
      <h3 className='center'>Please enter your password to continue.</h3>
      <Input
        placeholder='Password...'
        type='password'
        onChange={onPasswordChange}
        value={statePassword}
      />
      <Spacer height={16} />
      <Button
        className='full-width'
        onClick={updatePassword}
        right
        medium
        secondary
      >
        {loading ? (
          <span>
            <HiddenText>Log In</HiddenText>{' '}
            <Loader size={20} absolute color='#ffffff' />
          </span>
        ) : (
          'Log In'
        )}
      </Button>
    </Modal>
  );
};

const HiddenText = styled.span`
  color: transparent;
  opacity: 0;
  visibility: hidden;
`;

const Input = styled.input`
  margin: 0;
  padding: 13px 13px;
  margin-bottom: 16px;
  background: #f7f7f7;
  border-radius: 5px;
  width: 100%;
  border: none;
  border: 1.5px solid transparent;
  outline: none;
  :focus {
    border: 1.5px solid rgb(25, 48, 92);
  }
`;

export default PasswordModal;
