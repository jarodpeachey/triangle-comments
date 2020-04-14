import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PPHImage } from '../image';

const ContactSection = () => {
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [messageError, setMessageError] = useState(false);
  // const [emailError, setEmailError] = useState(false);

  // const onEmailInputChange = (e) => {
  //   setEmail(e.target.value);

  //   const regex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

  //   if (regex.test(e.target.value)) {
  //     setEmailError(false);
  //   } else {
  //     setEmailError(true);
  //   }
  // };

  const onNameInputChange = (e) => {
    setName(e.target.value);
  };

  const onMessageInputChange = (e) => {
    setMessage(e.target.value);

    setMessageError(false);
  };

  const onSubmit = (e) => {
    console.log(name);
    console.log(message);
    e.preventDefault();
    let body = '';
    let subject = '';

    if (message !== '' && name !== '') {
      console.log('All');
      body = `
        Jarod,\n\n

        ${message}\n\n

        Regards,\n\n

        ${name}
      `;

      subject = `Message from ${name}`;

      window.location.href = `mailto:jwpeachey107@aol.com?subject=${subject}&body=${body}`;
    } else if (message !== '') {
      console.log('No name');
      body = `
        Jarod,\n\n

        ${message}\n\n
      `;

      subject = 'Message from portfolio website form';

      window.location.href = `mailto:jwpeachey107@aol.com?subject=${subject}&body=${body}`;
    }

    if (message === '') {
      setMessageError(true);
    }
  };

  return (
    <section className='bg-light' id='contact'>
      <div className='container'>
        <h2 className='title center-text'>Contact Me</h2>
        <form onSubmit={onSubmit}>
          <div className='row'>
            <div className='col col-12'>
              <Label>Name</Label>
              <Input
                onChange={onNameInputChange}
                className='full-width'
                type='text'
              />
            </div>
            {/* <div className='col col-6'>
              <Label>Email</Label>
              <Input
                onChange={onEmailInputChange}
                className='full-width'
                type='email'
              />
              {emailError && <Error>Please enter a valid email</Error>}
            </div> */}
            <div className='col col-12'>
              <Label>Message</Label>
              <TextArea
                onChange={onMessageInputChange}
                className='full-width'
                name=''
                id=''
                cols='30'
                rows='10'
              ></TextArea>
              {messageError && <Error>Please fill in this field</Error>}
            </div>
            <div className='col col-12'>
              <Button className='primary' type='submit'>
                Send
              </Button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

const Label = styled.label`
  margin-bottom: 8px;
  display: block;
  font-weight: 500;
`;

const Error = styled.small`
  display: block;
  margin-top: 8px;
  color: tomato;
`;

const Input = styled.input`
  padding: 14px;
  border: 2px solid white;
  box-shadow: 1px 1px 3px 0px #e7e7e7;
  font-size: 16px;
  outline: none;
  :focus {
    border: 2px solid #264966;
  }
`;

const TextArea = styled.textarea`
  padding: 14px;
  border: 2px solid white;
  box-shadow: 1px 1px 3px 0px #e7e7e7;
  font-size: 16px;
  outline: none;
  :focus {
    border: 2px solid #264966;
  }
`;

const Button = styled.button`
  margin: 0 !important;
  margin-left: auto !important;
  display: block;
`;

export default ContactSection;
