// /* eslint-disable react/jsx-fragments */
// import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';
// import { Link } from 'gatsby';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import Row from '../grid/row';
// import Button from '../Button';

// const MobileNav = ({ scrolled }) => {
//   const [open, setOpen] = useState(false);
//   const [width, setWidth] = useState(0);

//   // const closeMobileMenu = () => {
//   //   setOpen(false);
//   // };

//   // const openMobileMenu = () => {
//   //   setOpen(true);
//   // };

//   // const mobileMenuToggle = () => {
//   //   if (open) {
//   //     closeMobileMenu();
//   //   } else {
//   //     openMobileMenu();
//   //   }
//   // };

//   useEffect(() => {
//     const inner = document.getElementById('blur')
//       ? document.getElementById('blur').offsetWidth
//       : 0;
//     const outer = document.getElementById('mobile-menu')
//       ? document.getElementById('mobile-menu').offsetWidth
//       : 0;

//     setWidth(outer - inner);

//     return () => {
//       setWidth();
//     };
//   });

//   const toggleFunction = () => {
//     if (open) {
//       document.getElementById('blur').classList.remove('blur');
//     } else {
//       document.getElementById('blur').classList.add('blur');
//     }

//     setOpen(!open);
//   };

//   return (
//     <>
//       <MobileMenuToggle onClick={toggleFunction} open={open}>
//         <MobileMenuRotate open={open}>
//           <span />
//           <span />
//           <span />
//         </MobileMenuRotate>
//       </MobileMenuToggle>
//     </>
//   );
// };

// export default MobileNav;
