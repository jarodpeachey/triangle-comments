/* eslint-disable react/jsx-fragments */
import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import headerImage from '../../images/hero.png';
import Button from '../Button';
import Row from '../grid/row';
import { AuthContext } from '../../providers/AuthProvider';
import Section from '../layout/Section';

// Instantiate the GoTrue auth client with an optional configuration

const AuthForm = () => {
  const { signedIn, auth } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [message, setMessage] = useState('Processing...');
  const [error, setError] = useState(false);
  const [activeTab, setActiveTab] = useState(
    typeof window !== 'undefined' && window.location.pathname.replace(/\//g, '')
  );

  console.log(activeTab);

  if (signedIn) {
    setMessage('Success. Redirecting to the homepage.');
  }

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

    const data = {
      name,
    };

    setLoading(true);
    setShowForm(false);
    setMessage('Processing...');

    auth
      .signup(email, password, data)
      .then((response) => {
        console.log(response);

        setLoading(false);
        setMessage(
          "We've sent a confirmation email to you. Please open it and click the link to verify your account."
        );
      })
      .catch((err) => {
        console.log('Error: ', err);
        setLoading(false);
        setShowForm(true);
        setError(true);
        setMessage('There is already an account associated with this email.');
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

    auth
      .login(email, password, true)
      .then((response) => {
        console.log(response);

        setTimeout(() => {
          setMessage('Success! Redirecting to your dashboard...');
        }, 1250);
        setTimeout(() => {
          window.location.pathname = '/';
        }, 750);
      })
      .catch((err) => {
        console.log('Error: ', err);
        setLoading(false);
        setShowForm(true);
        setError(true);
        setMessage('Incorrect username or password.');
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
              {loading && (
                <>
                  {/* <span>{message}</span> */}
                  <Loader color='primary' />
                </>
              )}
            </Card>
          ) : (
            <>
              {signedIn ? (
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
                    <Title className='logo'>TRIANGLE</Title>
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
                          <SubmitButton right type='submit'>
                            {activeTab === 'signup' ? 'Sign Up' : 'Log In'}
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
  color: rgb(81, 160, 249);
  margin: 16px auto;
  text-align: center;
  font-size: 36px;
  font-family: 'overpass', sans-serif !important;
`;

const Tabs = styled.div`
  width: 100%;
  display: flex;
`;

const Tab = styled.div`
  width: 50%;
  dipslay: inline-block;
  text-align: center;
  padding: 16px;
  :hover {
    border-bottom: 2px solid
      ${(props) => (props.active ? 'rgb(25, 48, 92)' : '#e8e8e8')};
    cursor: pointer;
  }
  border-bottom: 2px solid
    ${(props) => (props.active ? 'rgb(25, 48, 92)' : '#f7f7f7')};
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
  margin: 12px 0;
`;

const Form = styled.form`
  margin: 0;
  padding-top: 24px;
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

const Loader = styled.div`
  margin-top: 24px;
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
