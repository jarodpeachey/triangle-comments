import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import Modal from '../Modal';
import Spacer from '../Spacer';
import Button from '../Button';
import { AppContext } from '../../providers/AppProvider';
import { DatabaseContext } from '../../providers/FirebaseProvider';
import { AuthContext } from '../../providers/AuthProvider';

const EditPersonalInfoModal = ({ data }) => {
  const [stateName, setStateName] = useState(false);
  const [stateEmail, setStateEmail] = useState(false);

  const { setEditModalOpen, userAccountInfo, setUserAccountInfo } = useContext(
    AppContext
  );
  const { serverClient, q } = useContext(DatabaseContext);
  const { user } = useContext(AuthContext);

  const onNameChange = (e) => {
    setStateName(e.target.value);
  };

  const onEmailChange = (e) => {
    setStateEmail(e.target.value);
  };

  const updateNameAndEmail = () => {
    console.log(userAccountInfo.ref);

    serverClient
      .query(
        q.Update(q.Ref(q.Collection('users'), userAccountInfo.ref.value.id), {
          data: { tags: ['pet', 'cute'] },
        })
      )
      .then((res) => {
        console.log('FaunaDB response: ', res);

        user
          .update({
            email: stateEmail,
            user_metadata: {
              name: stateName,
            },
          })
          .then((userRes) => {
            console.log('Netlify response: ', userRes);
            setUserAccountInfo({
              data: {
                name: stateName,
                email: stateEmail,
                ...data,
              },
              ...userAccountInfo,
            });
          })
          .catch((userErr) => {
            console.log(userErr);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Modal
      toggleFunction={() => setEditModalOpen(false)}
      title='Edit Personal Info'
    >
      <Input onChange={onNameChange} value={stateName || data.name} />
      <Input onChange={onEmailChange} value={stateEmail || data.email} />
      <Spacer height={16} />
      <Button onClick={updateNameAndEmail} right medium secondary>
        Save
      </Button>
    </Modal>
  );
};

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

export default EditPersonalInfoModal;
