import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import queryString from 'query-string';
import SEO from '../components/SEO';
import Hero from '../components/sections/Hero';
import Button from '../components/Button';
import FeaturesSection from '../components/sections/FeaturesSection';
import Section from '../components/layout/Section';
import GetStartedSection from '../components/sections/GetStartedSection';
// import { AuthContext } from '../providers/AuthProvider';
import AboutSection from '../components/sections/AboutSection';
import { ThemeContext } from '../components/theme';

const IndexPage = ({ data }) => {
  const theme = useContext(ThemeContext);

  return (
    <Wrapper>
      <Hero />
      <BackgroundWrap id='blur'>
        <SVGOne xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'>
          <path
            fill='white'
            fill-opacity='1'
            d='M0,0L48,10.7C96,21,192,43,288,74.7C384,107,480,149,576,181.3C672,213,768,235,864,229.3C960,224,1056,192,1152,181.3C1248,171,1344,181,1392,186.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'
          ></path>
        </SVGOne>
        <AboutSection />
      </BackgroundWrap>

      <FeaturesSection />
      <SVGTwo
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 1440 320'
      >
        <path
          fill={theme.color.primary.backgroundDark}
          fill-opacity='1'
          d='M0,0L48,10.7C96,21,192,43,288,74.7C384,107,480,149,576,181.3C672,213,768,235,864,229.3C960,224,1056,192,1152,181.3C1248,171,1344,181,1392,186.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'
        ></path>
      </SVGTwo>
      <GetStartedSection />
      <SEO title='Home' />
    </Wrapper>
  );
};

const BackgroundWrap = styled.div`
  filter: drop-shadow(
    0 -16px 12px ${(props) => props.theme.color.primary.dark}20
  );
  display: block;
  width: 110%;
  z-index: 999;
  padding-left: 5%;
  padding-right: 5%;
  left: -5%;
  position: relative;
`;

const SVGOne = styled.svg`
  transform: scaleX(-1) !important;
  position: absolute !important;
  top: -200px !important;
  @media (min-width: 576px) {
    top: -240px !important;
  }
  @media (min-width: 670px) {
    top: -240px !important;
  }
  @media (min-width: 750px) {
    top: -280px !important;
  }
  @media (min-width: 1000px) {
    top: -320px !important;
  }
  @media (min-width: 1200px) {
    top: -360px !important;
  }
  @media (min-width: 1500px) {
    top: -400px !important;
  }
  @media (min-width: 1677px) {
    top: -480px !important;
  }
  margin-bottom: -5vw !important;
`;

const SVGTwo = styled.svg`
  transform: scaleX(-1) !important;
  position: relative !important;
  top: -60px !important;
  z-index: 999;
  @media (min-width: 576px) {
    top: -50px !important;
  }
  // @media (min-width: 670px) {
  //   top: 0 !important;
  // }
  // @media (min-width: 850px) {
  //   top: 0 !important;
  // }
  // @media (min-width: 1000px) {
  //   top: 0 !important;
  // }
  // @media (min-width: 1300px) {
  //   top: 0 !important;
  // }
  // @media (min-width: 1500px) {
  //   top: 0 !important;
  // }
  // @media (min-width: 1677px) {
  //   top: 0 !important;
  // }
  margin-bottom: -5vw !important;
`;

const Wrapper = styled.div`
  p {
    // line-height: 30px !important;
    font-size: 18px !important;
  }
`;

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
