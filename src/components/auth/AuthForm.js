/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-fragments */
import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import headerImage from '../../images/hero.png';
import Button from '../Button';
import Row from '../grid/Row';
import Loader from '../Loader';
import Section from '../layout/Section';
import { ThemeContext } from '../theme';
import { FirebaseContext } from '../../providers/FirebaseProvider';
import { DatabaseContext } from '../../providers/DatabaseProvider';
import { isBrowser } from '../../utils/isBrowser';

const AuthForm = () => {
  const { firebase, firebaseUser } = useContext(FirebaseContext);
  const { q, serverClient, faunaUser } = useContext(DatabaseContext);
  const theme = useContext(ThemeContext);

  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [message, setMessage] = useState('Processing...');
  const [error, setError] = useState(false);
  const [activeTab, setActiveTab] = useState(
    typeof window !== 'undefined' && window.location.pathname.replace(/\//g, '')
  );

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const onNameInputChange = (e) => {
    setName(e.target.value);
  };

  const onPasswordInputChange = (e) => {
    setPassword(e.target.value);
  };

  const onConfirmInputChange = (e) => {
    setConfirm(e.target.value);
  };

  const onEmailInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSignup = (e) => {
    e.preventDefault();

    setLoading(true);

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        console.log(response);

        serverClient
          .query(
            q.Map(
              [
                [
                  name || 'Guest',
                  response.user.email,
                  response.user.uid,
                  [
                    {
                      name: 'Staticboard Team',
                      email: 'staticboard@gmai.com',
                      comment:
                        "This is your first comment! Awesome sauce!\n\n If you don't want this comment here, go to your dashboard to delete it: https://staticboard.com/dashboard",
                    },
                  ],
                ],
              ],
              q.Lambda(
                'data',
                q.Let(
                  {
                    user: q.Create(q.Collection('users'), {
                      data: {
                        name: q.Select(0, q.Var('data')),
                        email: q.Select(1, q.Var('data')),
                        id: q.Select(2, q.Var('data')),
                        comments: q.Select(3, q.Var('data')),
                      },
                      credentials: {
                        password: `${response.uid}-${response.email}`,
                      },
                    }),
                    comments: q.Select(3, q.Var('data')),
                  },
                  q.Create(q.Collection('comments'), {
                    data: {
                      user: q.Select('ref', q.Var('user')),
                      comments: q.Var('comments'),
                    },
                  })
                )
              )
            )
          )
          .then((faunaResponse) => {
            console.log(faunaResponse);

            setLoading(false);
            setShowForm(false);
            setMessage(
              "We've sent a confirmation email to you. Please open it and click the link to verify your dashboard."
            );
          })
          .catch((faunaErr) => {
            console.log('Error: ', faunaErr);
            setLoading(false);
            setShowForm(true);
            setError(true);
            setMessage(
              "We're experiencing some issues now. Please try again later."
            );
          });
      })
      .catch((err) => {
        console.log('Error: ', err);
        setTimeout(() => {
          setLoading(false);
          setError(true);
          setMessage(err.message);
        }, 1250);
      });

    // setTimeout(() => {
    //   window.location.pathname = '/';
    // }, 1500);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setLoading(true);
    setShowForm(false);
    setMessage('Processing...');

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        console.log(response);

        window.location = '/dashboard';
      })
      .catch((err) => {
        console.log('Error: ', err);
        setTimeout(() => {
          setLoading(false);
          setError(true);
          setMessage(err.message);
        }, 1250);
      });

    // setTimeout(() => {
    //   window.location.pathname = '/';
    // }, 1500);
  };

  // if (error) {
  //   return (
  //     <Wrapper className='container section'>
  //       <Card>
  //         <RedirectText>{errorMessage}</RedirectText>
  //       </Card>
  //     </Wrapper>
  //   );
  // }

  return (
    <>
      <div
        style={{
          backgroundImage: `url(${headerImage})`,
          position: 'absolute',
          top: 0,
          transform: 'rotate(180deg)',
          zIndex: -1,
          height: '100vh',
          width: '100%',
          opacity: 1,
          backgroundRepeat: 'repeat',
        }}
      />
      {/* <div
        style={{
          background: '#e8e8e820',
          position: 'absolute',
          top: 0,
          transform: 'rotate(180deg)',
          zIndex: -1,
          height: '100vh',
          width: '100%',
          opacity: 1,
          backgroundRepeat: 'repeat',
        }}
      /> */}
      <>
        <Section
          customStyles={`
          height: 100vh;
          padding-top: 60px;
          @media (max-height: 769px) {
            padding-top: 0;
          }
        `}
          background='transparent'
        >
          {!showForm ? (
            <Card>
              <RedirectText>{message}</RedirectText>
            </Card>
          ) : (
            <>
              {firebaseUser && faunaUser ? (
                <Card>
                  <h2>You're already signed in! 🎉</h2>
                  <p>Click the button to start exploring!</p>
                  <Button variant='contained' color='primary'>
                    Let's Go
                  </Button>
                </Card>
              ) : (
                <>
                  <Card>
                    <Title className='logo'>Staticbox</Title>
                    <Tabs>
                      <Tab
                        onClick={() => {
                          setActiveTab('login');
                          window.history.pushState({}, '', '/login');
                        }}
                        active={activeTab === 'login'}
                      >
                        Login
                      </Tab>
                      <Tab
                        onClick={() => {
                          setActiveTab('signup');
                          window.history.pushState({}, '', '/signup');
                        }}
                        active={activeTab === 'signup'}
                      >
                        Signup
                      </Tab>
                    </Tabs>
                    {error && <ErrorText>{message}</ErrorText>}
                    <Form
                      onSubmit={
                        activeTab === 'signup' ? handleSignup : handleLogin
                      }
                    >
                      <Row breakpoints={[769]} spacing={[12, 8]}>
                        {activeTab === 'signup' && (
                          <div widths={[12]}>
                            <Input
                              id='name'
                              type='text'
                              fullWidth
                              placeholder='Name'
                              variant='outlined'
                              margin='dense'
                              label='Name'
                              value={name}
                              onChange={onNameInputChange}
                            />
                          </div>
                        )}
                        <div widths={[12]}>
                          {' '}
                          <Input
                            id='email'
                            type='text'
                            fullWidth
                            placeholder='Email'
                            variant='outlined'
                            margin='dense'
                            label='Email'
                            value={email}
                            onChange={onEmailInputChange}
                          />
                        </div>
                        <div widths={[12]}>
                          {' '}
                          <Input
                            id='password'
                            type='password'
                            fullWidth
                            placeholder='Password'
                            variant='outlined'
                            margin='dense'
                            label='Password'
                            value={password}
                            onChange={onPasswordInputChange}
                          />
                        </div>
                        {activeTab === 'signup' && (
                          <div widths={[12]}>
                            {' '}
                            <Input
                              id='password-reenter'
                              type='password'
                              fullWidth
                              placeholder='Verify Password'
                              variant='outlined'
                              margin='dense'
                              label='Verify Password'
                              value={confirm}
                              onChange={onConfirmInputChange}
                            />
                          </div>
                        )}
                        <div widths={[12]}>
                          {' '}
                          <SubmitButton disabled={loading} right type='submit'>
                            {loading ? (
                              <span>
                                <HiddenText>
                                  {activeTab === 'signup'
                                    ? 'Sign Up'
                                    : 'Log In'}
                                </HiddenText>{' '}
                                <Loader size={20} absolute color='#ffffff' />
                              </span>
                            ) : activeTab === 'signup' ? (
                              'Sign Up'
                            ) : (
                              'Log In'
                            )}
                          </SubmitButton>
                        </div>
                      </Row>
                    </Form>
                  </Card>
                </>
              )}
            </>
          )}
        </Section>
      </>
    </>
  );
};

const HiddenText = styled.span`
  color: transparent;
  opacity: 0;
  visibility: hidden;
`;

const Card = styled.div`
  padding: 18px 24px;
  width: 100%;
  border-radius: 3px;
  box-shadow: 1px 0px 80px -5px #e8e8e8;
  backdrop-filter: blur(6px);
  background: white;
  border: 1px solid #e8e8e8;
  margin: 0 auto;
  max-width: 360px;
`;

const Title = styled.h1`
  color: ${(props) => props.theme.color.primary.main};
  margin: 16px auto;
  text-align: center;
  font-size: 36px;
`;

const Tabs = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 24px;
`;

const Tab = styled.div`
  width: 50%;
  dipslay: inline-block;
  text-align: center;
  padding: 16px;
  :hover {
    border-bottom: 2px solid
      ${(props) => (props.active ? props.theme.color.primary.dark : '#e8e8e8')};
    cursor: pointer;
  }
  border-bottom: 2px solid
    ${(props) => (props.active ? props.theme.color.primary.dark : '#f7f7f7')};
`;

const RedirectText = styled.h2`
  text-align: center;
  margin: 0 auto;
  width: fit-content;
`;

const ErrorText = styled.p`
  text-align: center;
  margin: 0 auto;
  width: 100%;
  background: tomato;
  color: white;
  font-weight: 500;
  font-size: 17px;
  border-radius: 3px;
  margin: 12px 0 24px;
`;

const Form = styled.form`
  margin: 0;
`;

const SubmitButton = styled(Button)``;

const Input = styled.input`
  margin: 0 !important;
  padding: 13px 13px;
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

const Info = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 16px;
`;

// const FormWrapper = styled.div`
//   width: 60%;
//   margin: 0 auto;
//   max-width: 540px;
// `;

// const Heading = styled.h1`
//   text-align: center;
// `;

export default AuthForm;
