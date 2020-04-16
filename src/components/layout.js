import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import './breeze_layout.css';
import Header from './header';
import Footer from './footer';

const Layout = (props) => {
  console.log(props);

  return (
    <>
      <Header siteTitle={props.title} />
      <main>{props.children}</main>
      <Footer />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
