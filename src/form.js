// import React, { useState } from 'react';
// import styled from 'styled-components';

// function encode(data) {
//   return Object.keys(data)
//     .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
//     .join('&');
// }

// const Form = ({ formName }) => {
//   const [state, setState] = useState({});
//   const [parentCommentNumber, setParentCommentNumber] = useState(0);

//   const apiKey = process.env.NETLIFY_TOKEN;

//   const handleChange = (e) => {
//     setState({
//       ...state,
//       [e.target.name]: e.target.value,
//       path: state.path,
//       parentCommentNumber: state.parentCommentNumber,
//     });
//   };
//   // const [emailError, setEmailError] = useState(false);

//   // const onEmailInputChange = (e) => {
//   //   setEmail(e.target.value);

//   //   const regex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

//   //   if (regex.test(e.target.value)) {
//   //     setEmailError(false);
//   //   } else {
//   //     setEmailError(true);
//   //   }
//   // };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const form = document.getElementById('form');
//     fetch('/', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//       body: encode({
//         'form-name': form.getAttribute('name'),
//         ...state,
//       }),
//     })
//       .then((res) => console.log('Done: ', res))
//       .catch((error) => alert(error));
//   };

//   return (
//     <section className='bg-light' id='comment'>
//       <div className='container'>
//         {/* <form name='comments-queue' netlify netlify-honeypot='bot-field' hidden>
//           <input type='text' name='name' id='' />
//           <input type='email' name='email' id='' />
//           <textarea name='comment' id=''></textarea>
//         </form> */}
//         <br />
//         <br />
//         <h2>Add A Comment</h2>
//         <form
//           name={formName}
//           method='post'
//           id='form'
//           // action='/thanks/'
//           data-netlify='true'
//           onSubmit={handleSubmit}
//         >
//           <input
//             type='hidden'
//             name='form-name'
//             value={formName}
//           />
//           <div className='row'>
//             <div className='col col-6'>
//               <HiddenLabel for='path'>Path</HiddenLabel>
//               <HiddenInput
//                 name='path'
//                 id='path'
//                 type='text'
//                 value={state.path}
//               />
//               <HiddenLabel for='parentCommentNumber'>
//                 Parent Comment Number
//               </HiddenLabel>
//               <HiddenInput
//                 name='parentCommentNumber'
//                 id='parentCommentNumber'
//                 type='text'
//                 value={0}
//               />
//               <HiddenInput
//                 name='parentCommentNumber'
//                 id='parentCommentNumber'
//                 type='text'
//                 value={state.parentCommentNumber}
//               />
//               <Label for='name'>Name</Label>
//               <Input
//                 onChange={handleChange}
//                 type='text'
//                 name='name'
//                 id='name'
//               />
//             </div>
//             <div className='col col-6'>
//               <Label for='email'>Email</Label>
//               <Input
//                 onChange={handleChange}
//                 type='email'
//                 name='email'
//                 id='email'
//               />
//             </div>
//             <div className='col col-12'>
//               <Label for='comment'>Comment</Label>
//               <TextArea
//                 onChange={handleChange}
//                 name='comment'
//                 id='comment'
//               ></TextArea>
//             </div>
//             <div className='col col-12'>
//               <Button className='primary' type='submit'>
//                 Post your comment
//               </Button>
//             </div>
//           </div>
//         </form>
//       </div>
//     </section>
//   );
// };

// const Label = styled.label`
//   margin-bottom: 8px;
//   display: block;
//   font-weight: 500;
// `;

// const Input = styled.input`
//   padding: 14px;
//   border: 2px solid white;
//   box-shadow: 1px 1px 3px 0px #e7e7e7;
//   font-size: 16px;
//   outline: none;
//   width: 100%;
//   :focus {
//     border: 2px solid #264966;
//   }
// `;

// const HiddenLabel = styled.label`
//   height: 0px !important;
//   width: 0px !important;
//   background: transparent !important;
//   color: transparent !important;
//   border: none !important;
//   outline: none !important;
//   cursor: default !important;
//   padding: 0 !important;
//   margin: 0 !important;
//   max-height: 0px !important;
//   min-height: 0px !important;
//   display: float;
// `;

// const HiddenInput = styled.input`
//   height: 0px !important;
//   width: 0px !important;
//   background: transparent !important;
//   color: transparent !important;
//   border: none !important;
//   outline: none !important;
//   cursor: default !important;
//   padding: 0 !important;
//   margin: 0 !important;
//   max-height: 0px !important;
//   min-height: 0px !important;
//   display: float;
// `;

// const TextArea = styled.textarea`
//   padding: 14px;
//   width: 100%;
//   min-height: 125px;
//   border: 2px solid white;
//   box-shadow: 1px 1px 3px 0px #e7e7e7;
//   font-size: 16px;
//   outline: none;
//   resize: vertical;
//   :focus {
//     border: 2px solid #264966;
//   }
// `;

// const Button = styled.button`
//   margin: 0 !important;
//   margin-left: auto !important;
//   display: block;
// `;

// export default Form;
