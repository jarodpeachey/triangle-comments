import React, { useState, useEffect } from 'react';
import { graphql, StaticQuery } from 'gatsby';
import styled from 'styled-components';
// import Img from 'gatsby-image';
import headerImage from '../images/hero.png';

// import BackgroundImage from 'gatsby-background-image';
// Use the following to support legacy browsers like IE11:
// import BackgroundImage from 'gatsby-background-image-es5'

/**
 * In this functional component a <BackgroundImage />  is compared to an <Img />.
 * @param className   string    className(s) from styled-components.
 * @param children    nodes     Child-components from index.js / page-2.js.
 * @return {*}
 * @constructor
 */

const Hero = ({ children }) => {
  const [scrollValue, setScrollValue] = useState(0);

  // useEffect(() => {
  //   window.addEventListener('scroll', () => {
  //     setScrollValue(window.scrollY);
  //   });
  // });

  return (
    <>
      {/* // <StaticQuery */}
      {/* query={graphql`
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
    Extract imageData.
    const imageData = data.desktop.childImageSharp.fluid; */}
      {/* return ( */}
      <div
        style={{
          backgroundImage: `url(${headerImage})`,
          position: 'absolute',
          top: 0,
          zIndex: -5,
          height: '100vh',
          width: '100%',
          opacity: 1,
          backgroundRepeat: 'repeat',
        }}
      />
      <MainWrapper scroll={scrollValue}>
        <HeroContainer>
          <ChildContainer scrollValue={scrollValue} className='container'>
            {children}
          </ChildContainer>
        </HeroContainer>
        {/* </BackgroundImage> */}
      </MainWrapper>
      {/* // ); */}
      {/* // }} */}
      {/* // /> */}
    </>
  );
};

const MainWrapper = styled.div`
  padding-top: 64px;
`;

const Background = styled.div`
  height: 100vh;
  background-image: url('../images/hero.png');
  position: absolute;
  top: 0;
  z-index: -5;
  height: 100vh;
  width: 100vw;
  opacity: 0.5;
`;

const HeroContainer = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;
  min-height: 420px !important;
`;

const ChildContainer = styled.div`
  margin-top: 0;
`;

export default Hero;
