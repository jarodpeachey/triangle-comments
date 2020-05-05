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
import Section from '../layout/Section';
import Row from '../grid/Row';
import Card from '../Card';

const NewSite = () => {
  const { firebase, firebaseUser } = useContext(FirebaseContext);
  const { state, q, dispatch } = useContext(DatabaseContext);
  const { user, userClient } = state;

  console.log(user);

  const [name, setName] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [stateId, setStateId] = useState('');

  const { setNotificationMessage, setNotificationType } = useContext(
    AppContext
  );

  const onNameChange = (e) => {
    setName(e.target.value);
    setError(false);
    setStateId(`${e.target.value.toLowerCase().replace(/ /g, '-')}`);
  };

  const addSite = (e) => {
    if (name !== '') {
      userClient
        .query(
          q.Let(
            {
              site: q.Call(q.Function('create_site'), name, stateId, user),
            },
            q.Login(q.Select('ref', q.Var('site')), {
              password: q.Select(['data', 'id'], q.Var('site')),
            })
          )
        )
        .then((response) => {
          console.log(response);

          userClient
            .query(q.Get(q.Match(q.Index('site_by_id'), stateId)))
            .then((responseTwo) => {
              console.log(responseTwo);
              dispatch({
                type: 'loginSite',
                data: {
                  secret: response.secret,
                  site: responseTwo,
                },
              });

              window.location.href = `/dashboard/sites/${name
                .toLowerCase()
                .replace(/ /g, '-')}`;
            })
            .catch((errorTwo) => {
              console.log(errorTwo);
            });
        })
        .catch((error) => {
          console.log(error);

          if (
            error.requestResult.responseContent.errors[0].cause[0].code ===
            'instance not unique'
          ) {
            setError(true);
            setErrorMessage(
              'That name is already taken. Please try a different one.'
            );
          } else {
            setError(true);
            setErrorMessage(
              'We encountered an unexpected error. Please try again later.'
            );
          }
        });
    } else {
      setErrorMessage('Please enter a site name.');
      setError(true);
    }
  };

  return (
    <span>
      <Section
        thin
        customStyles={`
          position: absolute;
          top: 0;
          padding: 96px 0 24px;
          display: block;
          width: 100%;
        `}
        dark
      >
        <Row
          customStyles={`
              align-items: flex-end !important;
            `}
          spacing={[12]}
          breakpoints={[769]}
        >
          <div widths={['auto']} style={{ height: 94 }}>
            {/* <Title className='mb-none'>Add Site</Title> */}
          </div>
        </Row>
      </Section>
      <Section
        customStyles={`
        padding-top: 64px;
        margin-top: -100px;
        z-index: 999;
        display: block;
        position: relative;
      `}
      >
        <Card
          customStyles={`
            padding: 64px;
          `}
        >
          <Wrapper>
            <Title>Create New Site</Title>
            <SubTitle>
              Add comments to your new site in 5 minutes or less ⏳
            </SubTitle>
            {error && <Error>{errorMessage}</Error>}
            <Label>Name</Label>
            <Input value={name} onChange={onNameChange} />
            <Spacer height={12} />
            <Button onClick={() => addSite()} primary medium>
              Add Site
            </Button>
          </Wrapper>
        </Card>
      </Section>
    </span>
  );
};

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 576px;
`;

const Label = styled.h4`
  display: block;
  margin-top: 0;
  margin-bottom: ${(props) => (props.noMargin ? '0' : '8px')};
`;

const Error = styled.div`
  background: ${(props) => props.theme.color.error}30;
  color: ${(props) => props.theme.color.error};
  padding: 12px;
  border-radius: 5px;
  margin-top: -16px;
  margin-bottom: 16px;
`;

const Small = styled.small`
  margin-bottom: 8px;
  display: block;
`;

const Title = styled.h2`
  margin: 0;
  margin-bottom: 8px;
`;

const SubTitle = styled.p`
  margin-top: 0;
  margin-bottom: 32px;
`;

const Input = styled.input`
  margin: 0;
  padding: 13px 13px;
  margin-bottom: 16px;
  background: ${(props) => props.theme.color.gray.two};
  border-radius: 5px;
  width: 100%;
  border: none;
  border: 1.5px solid transparent;
  outline: none;
  :focus {
    border: 1.5px solid rgb(25, 48, 92);
  }
`;

export default NewSite;
