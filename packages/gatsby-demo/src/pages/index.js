import React from 'react';
// import { Link } from 'gatsby';
// import Image from '../components/image';
// import BackgroundImage from 'gatsby-background-image';
import { library } from '@fortawesome/fontawesome-svg-core';
import styled from 'styled-components';
import {
  faMobileAlt,
  faCode,
  faCodeBranch,
  faRocket,
  faBars,
  faEnvelope,
  faDatabase,
} from '@fortawesome/free-solid-svg-icons';
import {
  fab,
  faCss3,
  faHtml5,
  faJsSquare,
  faReact,
  faBootstrap,
  faPhp,
  faGithub,
  faWordpress,
} from '@fortawesome/free-brands-svg-icons';
import Layout from '../components/layout';
import SEO from '../components/seo';
import HeroImage from '../components/hero';
import AboutSection from '../components/Homepage/about_section';
import SkillsSection from '../components/Homepage/skills_section';
import PortfolioSection from '../components/Homepage/portfolio_section';
import ContactSection from '../components/Homepage/contact_section';
import CommentSection from '../components/Homepage/comment_section';

library.add(
  faMobileAlt,
  faCode,
  faCodeBranch,
  faRocket,
  faBars,
  faEnvelope,
  fab,
  faCss3,
  faHtml5,
  faJsSquare,
  faReact,
  faBootstrap,
  faPhp,
  faDatabase,
  faGithub,
  faWordpress,
);

const IndexPage = ({ data }) => {
  return (
    <Layout title={data.title}>
      <SEO title='Home' />
      <HeroImage id='home'>
        <h1 className='hero_title'>Hi. I'm Jarod</h1>
        <h4 className='hero_subtitle'>
          I'm a Front End Web Developer focused on code quality, consistency and
          website speed.
        </h4>
        <ButtonContainer className='row mobile-lg'>
          <div className='col col-6'>
            <a href='#contact'>
              <button className='button primary full-width m-none'>
                Hire Me
              </button>
            </a>
          </div>
          <div className='col col-6'>
            <a href='#about'>
              <button className='button secondary transparent full-width m-none'>
                Learn More
              </button>
            </a>
          </div>
        </ButtonContainer>
      </HeroImage>
      <AboutSection />
      <SkillsSection />
      <PortfolioSection />
      <ContactSection />
      <CommentSection comments={data.allNetlifySubmissions.edges} />
    </Layout>
  );
};

export const IndexQuery = graphql`
  query($pathname: String!) {
    allNetlifySubmissions(filter: { data: { path: { eq: $pathname } } }) {
      edges {
        node {
          number
          data {
            comment
            email
            name
            path
            parentCommentNumber
          }
          created_at(formatString: "M/D/YYYY")
        }
      }
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`;

const ButtonContainer = styled.div`
  max-width: 400px;
  margin: 0 auto !important;
`;

export default IndexPage;
