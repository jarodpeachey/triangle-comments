import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import queryString from 'query-string';
import Layout from '../components/layout/layout';
import SEO from '../components/seo';
import Hero from '../components/sections/Hero';
import Button from '../components/Button';
import FeaturesSection from '../components/sections/FeaturesSection';
import Section from '../components/layout/Section';
import GetStartedSection from '../components/sections/GetStartedSection';
import { AuthContext } from '../providers/AuthProvider';

const IndexPage = ({ data }) => {
  const { auth } = useContext(AuthContext);
  // if (window.location.pathname.includes('#confirmation_token')) {
  // }

  const [parsedHash, setParsedHash] = useState('');

  useEffect(() => {
    if (parsedHash === '')
      setParsedHash(queryString.parse(window.location.hash));
  });

  if (parsedHash.confirmation_token) {
    auth
      .confirm(parsedHash.confirmation_token)
      .then((user) => {
        window.location.href = '/account/home';
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <>
      <Hero />
      <FeaturesSection />
      <GetStartedSection />
      <SEO title='Home' />
    </>
  );
};

export const IndexQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;

export default IndexPage;
