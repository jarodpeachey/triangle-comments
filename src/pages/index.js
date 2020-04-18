import React from 'react';
// import Image from '../components/image';
// import BackgroundImage from 'gatsby-background-image';
import styled from 'styled-components';
import { Link } from 'gatsby';
import Layout from '../components/layout/layout';
import SEO from '../components/seo';
import Hero from '../components/Hero';
import Button from '../components/Button';
import FeaturesSection from '../components/layout/sections/FeaturesSection';
import Section from '../components/layout/Section';
import GetStartedSection from '../components/layout/sections/GetStartedSection';

const IndexPage = ({ data }) => {
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
