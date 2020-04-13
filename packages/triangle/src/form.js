import React, { useState } from 'react';
import styled from 'styled-components';
import './css/style.css';

function encode(data) {
  return Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join('&');
}

const Form = ({ formName }) => {
  const [state, setState] = useState({});
  const [focusState, setFocusState] = useState({});

  const LabelStyles = {
    marginBottom: '8px !important',
    display: 'block !important',
    fontWeight: '500 !important',
  };

  console.log(LabelStyles);

  const HiddenStyles = {
    height: '0px ',
    width: '0px ',
    background: 'transparent ',
    color: 'transparent ',
    border: 'none ',
    outline: 'none ',
    cursor: 'default ',
    padding: '0 ',
    margin: '0 ',
    maxHeight: '0px ',
    minHeight: '0px ',
    display: 'float ',
  };

  const InputStyles = {
    padding: '14px ',
    border: ' 2px solid white ',
    boxShadow: '1px 1px 3px 0px #e7e7e7 ',
    fontSize: '16px ',
    outline: 'none ',
    width: '100% ',
  };

  const InputStylesFocus = {
    padding: '14px ',
    border: '2px solid #264966 ',
    boxShadow: '1px 1px 3px 0px #e7e7e7 ',
    fontSize: '16px ',
    outline: 'none ',
    width: '100% ',
  };

  const TextAreaStyles = {
    padding: ' 14px ',
    width: ' 100% ',
    minHeight: ' 125px ',
    border: ' 2px solid white ',
    boxShadow: ' 1px 1px 3px 0px #e7e7e7 ',
    fontSize: ' 16px ',
    outline: ' none ',
    resize: ' vertical ',
  };

  const TextAreaStylesFocus = {
    padding: ' 14px ',
    width: ' 100% ',
    minHeight: ' 125px ',
    border: '2px solid #264966 ',
    boxShadow: ' 1px 1px 3px 0px #e7e7e7 ',
    fontSize: ' 16px ',
    outline: ' none ',
    resize: ' vertical ',
  };

  const ButtonStyles = {
    margin: '0 ',
    marginLeft: 'auto ',
    display: 'block ',
    background: '#264966 ',
    textTransform: 'uppercase ',
    color: 'white ',
    padding: '14px 28px ',
    border: 'none ',
    transitionDuration: '0.4s ',
  };

  const ButtonStylesHover = {
    margin: '0 ',
    marginLeft: 'auto ',
    display: 'block ',
    background: '#264966 ',
    textTransform: 'uppercase ',
    color: 'white ',
    padding: '14px 28px ',
    border: 'none ',
    transitionDuration: '0.4s ',
    boxShadow: '4px 5px 20px 0px #66666610 ',
    transform: 'scale(1.04) ',
  };

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
      path: state.path,
      parentCommentNumber: state.parentCommentNumber,
    });
  };

  const handleFocus = (e) => {
    setFocusState({
      ...focusState,
      [e.target.name]: true,
    });
  };

  const handleBlur = (e) => {
    setFocusState({
      ...focusState,
      [e.target.name]: false,
    });
  };
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = document.getElementById('form');
    fetch('/ ', {
      method: 'POST ',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': form.getAttribute('name'),
        ...state,
      }),
    })
      .then((res) => console.log('Done:  ', res))
      .catch((error) => alert(error));
  };

  return (
    <div className='wrapper'>
      {/* <form name='comments-queue' netlify netlify-honeypot='bot-field' hidden>
          <input type='text' name='name' id='' />
          <input type='email' name='email' id='' />
          <textarea name='comment' id=''></textarea>
        </form> */}
      <br />
      <br />
      <h2>Add A Comment</h2>
      <form
        name={formName}
        method='post'
        id='form'
        // action='/thanks/'
        data-netlify='true'
        onSubmit={handleSubmit}
      >
        <input type='hidden' name='form-name' value={formName} />
        <div className='row'>
          <div className='col col-6'>
            <HiddenLabel htmlFor='path'>Path</HiddenLabel>
            <HiddenInput name='path' id='path' type='text' value={state.path} />
            <HiddenLabel htmlFor='parentCommentNumber'>
              Parent Comment Number
            </HiddenLabel>
            <HiddenInput
              name='parentCommentNumber'
              id='parentCommentNumber'
              type='text'
              value={0}
            />
            <Label htmlFor='name'>Name</Label>
            <Input
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={handleChange}
              type='text'
              name='name'
              id='name'
            />
          </div>
          <div className='col col-6'>
            <Label htmlFor='email'>Email</Label>
            <Input
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={handleChange}
              type='email'
              name='email'
              id='email'
            />
          </div>
          <div className='col col-12'>
            <Label htmlFor='comment'>Comment</Label>
            <TextArea
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={handleChange}
              name='comment'
              id='comment'
            ></TextArea>
          </div>
          <div className='col col-12'>
            <Button
              onMouseEnter={handleFocus}
              onMouseLeave={handleBlur}
              name='button'
              type='submit'
            >
              Post your comment
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

const Label = styled.label`
  margin-bottom: 8px !important;
  display: block !important;
  font-weight: 500 !important;
`;

const HiddenLabel = styled.label`
  height: 0px !important;
  width: 0px !important;
  background: transparent !important;
  color: transparent !important;
  border: none !important;
  outline: none !important;
  cursor: default !important;
  padding: 0 !important;
  margin: 0 !important;
  max-height: 0px !important;
  min-height: 0px !important;
  display: float !important;
`;

const Input = styled.input`
  padding: 14px !important;
  border: 2px solid white !important;
  box-shadow: 1px 1px 3px 0px #e7e7e7 !important;
  font-size: 16px !important;
  outline: none !important;
  width: 100% !important;
  :focus {
    border: 2px solid #264966 !important;
  }
`;

const HiddenInput = styled.input`
  height: 0px !important;
  width: 0px !important;
  background: transparent !important;
  color: transparent !important;
  border: none !important;
  outline: none !important;
  cursor: default !important;
  padding: 0 !important;
  margin: 0 !important;
  max-height: 0px !important;
  min-height: 0px !important;
  display: float !important;
`;

const TextArea = styled.textarea`
  padding: 14px !important;
  width: 100% !important;
  min-height: 125px !important;
  border: 2px solid white !important;
  box-shadow: 1px 1px 3px 0px #e7e7e7 !important;
  font-size: 16px !important;
  outline: none !important;
  resize: vertical !important;
  :focus {
    border: 2px solid #264966 !important;
  }
`;

const Button = styled.button`
  margin: 0 !important;
  margin-left: auto !important;
  display: block !important;
  background: #264966 !important;
  color: white !important;
  text-transform: uppercase !important;
  color: white !important;
  padding: 14px 28px !important;
  border: none !important;
  transition-duration: 0.4s !important;
  :hover {
    background: #264966d9 !important;
    transition-duration: 0.4s !important;
    box-shadow: 4px 5px 20px 0px #66666610 !important;
    transform: scale(1.04) !important;
  }
`;

export default Form;
