import React, { useState } from 'react';

function encode (data) {
  return Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join('&');
}

const Form = ({ formName }) => {
  const [state, setState] = useState({});
  const [parentCommentNumber, setParentCommentNumber] = useState(0);

  const apiKey = process.env.NETLIFY_TOKEN;

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
      path: state.path,
      parentCommentNumber: state.parentCommentNumber,
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
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': form.getAttribute('name'),
        ...state,
      }),
    })
      .then((res) => console.log('Done: ', res))
      .catch((error) => alert(error));
  };

  return (
    <section className='bg-light' id='comment'>
      <div className='container'>
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
          <input
            type='hidden'
            name='form-name'
            value={formName}
          />
          <div className='row'>
            <div className='col col-6'>
              <label hidden htmlFor='path'>Path</label>
              <input hidden
                name='path'
                id='path'
                type='text'
                value={state.path}
              />
              <label hidden htmlFor='parentCommentNumber'>
                Parent Comment Number
              </label>
              <input hidden
                name='parentCommentNumber'
                id='parentCommentNumber'
                type='text'
                value={0}
              />
              <input hidden
                name='parentCommentNumber'
                id='parentCommentNumber'
                type='text'
                value={state.parentCommentNumber}
              />
              <label htmlFor='name'>Name</label>
              <input
                onChange={handleChange}
                type='text'
                name='name'
                id='name'
              />
            </div>
            <div className='col col-6'>
              <label htmlFor='email'>Email</label>
              <input
                onChange={handleChange}
                type='email'
                name='email'
                id='email'
              />
            </div>
            <div className='col col-12'>
              <label htmlFor='comment'>Comment</label>
              <textarea
                onChange={handleChange}
                name='comment'
                id='comment'
              ></textarea>
            </div>
            <div className='col col-12'>
              <button className='primary' type='submit'>
                Post your comment
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Form;
