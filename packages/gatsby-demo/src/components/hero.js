import React, { useState, useEffect } from 'react';
import { graphql, StaticQuery } from 'gatsby';
import styled from 'styled-components';
// import Img from 'gatsby-image';

import BackgroundImage from 'gatsby-background-image';
// Use the following to support legacy browsers like IE11:
// import BackgroundImage from 'gatsby-background-image-es5'

/**
 * In this functional component a <BackgroundImage />  is compared to an <Img />.
 * @param className   string    className(s) from styled-components.
 * @param children    nodes     Child-components from index.js / page-2.js.
 * @return {*}
 * @constructor
 */

const HeroImage = ({ children }) => {
  const [scrollValue, setScrollValue] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      setScrollValue(window.scrollY);
    });
  });

  return (
    <StaticQuery
      query={graphql`
        query {
          desktop: file(relativePath: { eq: "hero_image.jpeg" }) {
            childImageSharp {
              fluid(quality: 90, maxWidth: 4160) {
                ...GatsbyImageSharpFluid_withWebp_tracedSVG
              }
            }
          }
        }
      `}
      render={(data) => {
        // Extract imageData.
        const imageData = data.desktop.childImageSharp.fluid;
        return (
          <MainWrapper scroll={scrollValue}>
            <BackgroundImage
              Tag='section'
              // To style via external CSS see layout.css last examples:
              // className="test"
              fluid={imageData}
              backgroundColor='#040e18'
              style={{
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundAttachment: 'fixed',
                // top: -scrollValue,
                // clipPath: 'polygon(100% 0, 100% 83%, 35% 95%, 0 87%, 0 0)',
              }}
              // https://github.com/timhagn/gatsby-background-image/#styling--passed-through-styles):
              id='hero_image'
              fadeIn='soft'
            >
              <HeroContainer>
                <ChildContainer scrollValue={scrollValue} className='container'>
                  {children}
                </ChildContainer>
              </HeroContainer>
            </BackgroundImage>
          </MainWrapper>
        );
      }}
    />
  );
};

const MainWrapper = styled.div`
  overflow: hidden;
  & *::before {
    transform: scale(
      ${props => (props.scroll !== 0 ? 1 + (props.scroll * 0.01) / 10 : 1)}
    );
  }
`;

const HeroContainer = styled.div`
  display: flex;
  align-items: center;
  min-height: 100vh;
  box-shadow: inset 0 0 0 2000px rgba(37, 56, 72, 0.3);
  text-align: center;
  overflow: hidden;
  min-height: 420px !important;
`;

const ChildContainer = styled.div`
  margin-top: 0;
  margin-top: ${props => props.scrollValue * 1.1}px;
`;

export default HeroImage;
