/* eslint-disable react/jsx-fragments */
import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import { withStyles, LinearProgress } from '@material-ui/core';
import { Link } from 'gatsby';
import headerImage from '../images/hero.png';
import Button from '../components/Button';
import Row from '../components/grid/row';
import { AuthContext } from '../auth/AuthProvider';
import Layout from '../components/layout/layout';
import Section from '../components/layout/Section';

const LoginPage = () => {
  const { signedIn, auth } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [message, setMessage] = useState('Processing...');
  const [error, setError] = useState(false);

  if (signedIn) {
    setMessage('Success. Redirecting to the homepage.');
  }

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onPasswordInputChange = (e) => {
    setPassword(e.target.value);
  };

  const onEmailInputChange = (e) => {
    setEmail(e.target.value);
  };

  const onSubmit = (e) => {
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

  return (
    <>
      <Section>
        <div
          style={{
            backgroundImage: `url(${headerImage})`,
            position: 'absolute',
            top: 0,
            zIndex: -5,
            height: '100vh',
            width: '100%',
            opacity: 1,
            backgroundRepeat: 'repeat',
          }}
        />
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
              <Card>
                <h1 className='mb-sm'>Log In</h1>

                {error && <ErrorText>{message}</ErrorText>}
                <Form onSubmit={onSubmit}>
                  <Row breakpoints={[769]} spacing={[12]}>
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
                        onChange={onPasswordInputChange}
                      />
                    </div>
                    <div widths={[12]}>
                      {' '}
                      <SubmitButton type='submit'>Log In</SubmitButton>
                    </div>
                  </Row>
                </Form>
                <Info>
                  Don't have an account?
                  <Link to='/signup'>Sign Up</Link>
                </Info>
              </Card>
            )}
          </>
        )}
      </Section>
    </>
  );
};

const Wrapper = styled.div`
  max-width: 576px;
`;

const Card = styled.div`
  padding: 24px;
  background: white;
  border-radius: 3px;
  box-shadow: 1px 1px 0px 0px #ddd, 2px 2px 5px 0px #eee;
`;

const RedirectText = styled.h2`
  text-align: center;
  margin: 0 auto;
  width: fit-content;
  margin-bottom: 24px;
`;

const Form = styled.form`
  margin: 0;
`;

const SubmitButton = styled(Button)``;

const Input = styled(TextField)`
  margin: 0 !important;
`;

const Loader = styled(LinearProgress)`
  margin-top: 24px;
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

export default LoginPage;
