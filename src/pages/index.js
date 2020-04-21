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
import AboutSection from '../components/sections/AboutSection';
import { ThemeContext } from '../components/theme';

const IndexPage = ({ data }) => {
  const { auth, user } = useContext(AuthContext);

  const theme = useContext(ThemeContext);

  console.log('User: ', user);

  const [parsedHash, setParsedHash] = useState('');

  useEffect(() => {
    if (parsedHash === '')
      setParsedHash(queryString.parse(window.location.hash));
  });

  if (parsedHash.confirmation_token) {
    auth
      .confirm(parsedHash.confirmation_token)
      .then((data) => {
        console.log('Success! Data is: ', data);
        // window.location.href = '/account';
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <>
      <Hero />
      <div id='blur'>
        <svg
          style={{
            transform: 'scaleX(-1)',
            position: 'relative',
            top: '-90px',
            marginTop: 20,
            marginBottom: `-5vw`,
          }}
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 1440 320'
        >
          <path
            fill='white'
            fill-opacity='1'
            d='M0,0L48,10.7C96,21,192,43,288,74.7C384,107,480,149,576,181.3C672,213,768,235,864,229.3C960,224,1056,192,1152,181.3C1248,171,1344,181,1392,186.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'
          ></path>
        </svg>
        <AboutSection />
        <FeaturesSection />
        <svg
          style={{
            transform: 'scaleX(-1)',
            position: 'relative',
            top: '6',
            marginBottom: `-5vw`,
          }}
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 1440 320'
        >
          <path
            fill={theme.color.primary.backgroundDark}
            fill-opacity='1'
            d='M0,0L48,10.7C96,21,192,43,288,74.7C384,107,480,149,576,181.3C672,213,768,235,864,229.3C960,224,1056,192,1152,181.3C1248,171,1344,181,1392,186.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'
          ></path>
        </svg>
        <GetStartedSection />
      </div>
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
