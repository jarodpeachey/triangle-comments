import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import Modal from '../Modal';
import Spacer from '../Spacer';
import Button from '../Button';
import { AppContext } from '../../providers/AppProvider';
import { FirebaseContext } from '../../providers/FirebaseProvider';
// import { AuthContext } from '../../providers/DatabaseProvider';
import { isBrowser } from '../../utils/isBrowser';
import Loader from '../Loader';
import { DatabaseContext } from '../../providers/DatabaseProvider';

const EditSiteInfoModal = () => {
  const { firebase, firebaseUser } = useContext(FirebaseContext);
  const { q, serverClient, faunaUser, state } = useContext(DatabaseContext);
  const { siteClient, user, site } = state;

  const [stateName, setStateName] = useState(site.data.name || '');
  const [loading, setLoading] = useState(false);

  const {
    setEditSiteInfoModalOpen,
    setNotificationMessage,
    setNotificationType,
  } = useContext(AppContext);

  const onNameChange = (e) => {
    setStateName(e.target.value);
  };

  const updateName = () => {
    setLoading(true);

    siteClient
      .query(
        q.Update(q.Ref(q.Collection('sites'), site.ref.value.id), {
          credentials: {
            password: stateName
              .toLowerCase()
              .replace(/ /g, '-')
              .replace("'", ''),
          },
          data: {
            id: stateName.toLowerCase().replace(/ /g, '-').replace("'", ''),
            name: stateName,
          },
        })
      )
      .then((faunaResponse) => {
        console.log(faunaResponse);
        setEditSiteInfoModalOpen(false);
        setNotificationMessage('Success!');
        setNotificationType('success');
      })
      .catch((faunaError) => console.log(faunaError));
  };

  return (
    <Modal
      toggleFunction={() => setEditSiteInfoModalOpen(false)}
      title='Edit Site Info'
    >
      <Input onChange={onNameChange} value={stateName} />
      <Spacer height={16} />
      <Button onClick={updateName} right medium secondary>
        {loading ? (
          <span>
            <HiddenText>Save</HiddenText>{' '}
            <Loader size={20} absolute color='#ffffff' />
          </span>
        ) : (
          'Save'
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

export default EditSiteInfoModal;
