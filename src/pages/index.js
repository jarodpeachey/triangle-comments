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
import Hero from '../components/Hero';

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
  faWordpress
);

const IndexPage = ({ data }) => {
  return (
    <Layout title={data.site.siteMetadata.title}>
      <SEO title='Home' />
      <Hero>
        <h1>Hi. I'm Jarod</h1>
        <h4>
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
      </Hero>
    </Layout>
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

// allNetlifySubmissions(filter: { data: { path: { eq: $pathname } } }) {
//   edges {
//     node {
//       number
//       data {
//         comment
//         email
//         name
//         path
//         parentCommentNumber
//       }
//       created_at(formatString: "M/D/YYYY")
//     }
//   }
// }

const ButtonContainer = styled.div`
  max-width: 400px;
  margin: 0 auto !important;
`;

export default IndexPage;
