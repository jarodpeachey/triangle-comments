/* eslint-disable react/jsx-fragments */
import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import { withStyles, LinearProgress } from '@material-ui/core';
import { Link } from 'gatsby';
import Button from '../components/Button';
import Row from '../components/grid/row';
import { AuthContext } from '../auth/AuthProvider';
import Layout from '../components/layout/layout';
import Section from '../components/layout/Section';

// Instantiate the GoTrue auth client with an optional configuration

const SignupPage = () => {
  const { signedIn, auth } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [message, setMessage] = useState('Processing...');
  const [error, setError] = useState(false);

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

  const onSubmit = (e) => {
    e.preventDefault();

    const data = {
      name,
    };

    setLoading(true);
    setShowForm(false);

    auth
      .signup(email, password, data)
      .then((response) => {
        console.log(response);

        setTimeout(() => {
          setMessage(
            "We've sent a confirmation email to you. Please open it and click the link to verify your account."
          );
          setLoading(false);
        }, 1250);
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
    <Layout>
      <Section>
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
                <h1 className='mb-sm'>Sign Up</h1>
                <Card>
                  {error && <ErrorText>{message}</ErrorText>}
                  <Form onSubmit={onSubmit}>
                    <Row breakpoints={[769]} spacing={[12]}>
                      <div widths={[12]}>
                        <Input
                          id='name'
                          type='text'
                          fullWidth
                          placeholder='Name'
                          variant='outlined'
                          margin='dense'
                          label='Name'
                          onChange={onNameInputChange}
                        />
                      </div>
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
                        <Input
                          id='password-reenter'
                          type='password'
                          fullWidth
                          placeholder='Verify Password'
                          variant='outlined'
                          margin='dense'
                          label='Verify Password'
                          onChange={onConfirmInputChange}
                        />
                      </div>
                      <div widths={[12]}>
                        {' '}
                        <SubmitButton
                          type='submit'
                          color='primary'
                          variant='contained'
                          fullWidth
                        >
                          Sign Up
                        </SubmitButton>
                      </div>
                    </Row>
                  </Form>
                </Card>
                <Info>
                  Already have an account?
                  <Link to='/login'>Login</Link>
                </Info>
              </>
            )}
          </>
        )}
      </Section>
    </Layout>
  );
};

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
`;

const SubmitButton = styled(Button)``;

const Input = styled(TextField)`
  margin: 0 !important;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 16px;
`;

const Loader = styled(LinearProgress)`
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

export default SignupPage;
