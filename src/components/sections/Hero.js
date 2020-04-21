/* eslint-disable react/jsx-fragments */
import React, { useState, useEffect } from 'react';
import { graphql, StaticQuery } from 'gatsby';
import styled from 'styled-components';
import Button from '../Button';
import heroImage from '../../images/hero.png';
import heroImageTwo from '../../images/heroTwo.png';

const Hero = ({ children }) => {
  const [scrollValue, setScrollValue] = useState(0);

  // useEffect(() => {
  //   window.addEventListener('scroll', () => {
  //     setScrollValue(window.scrollY);
  //   });
  // });

  return (
    <span>
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
      {/* <div
        style={{
          backgroundImage: `url(${heroImage})`,
          position: 'absolute',
          top: 0,
          zIndex: -5,
          height: '100vh',
          width: '100%',
          opacity: 1,
          backgroundRepeat: 'repeat',
        }}
      /> */}
      <BackgroundImage heroImage={heroImageTwo} />
      <MainWrapper>
        <HeroContainer>
          <ChildContainer className='container'>
            <Title>
              The simplest way to add comments to your static website.
            </Title>
            <SubTitle>
              The simplest, easiest and best way to add comments to a static
              website.
            </SubTitle>
            <ButtonFlex>
              <ButtonWrapper>
                <Button secondary link='/signup'>
                  Get Started
                </Button>
              </ButtonWrapper>
              <ButtonWrapper>
                <Button outlined link='/'>
                  Learn More
                </Button>
              </ButtonWrapper>
            </ButtonFlex>
          </ChildContainer>
        </HeroContainer>
        {/* </BackgroundImage> */}
      </MainWrapper>
      {/* // ); */}
      {/* // }} */}
      {/* // /> */}
    </span>
  );
};

const BackgroundImage = styled.div`
  background-image: url(${(props) => props.heroImage});
  position: absolute;
  top: 0;
  z-index: -5;
  height: 110%;
  width: 100%;
  opacity: 1;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  @media (min-width: 769px) {
    background-position: right center;
  }
  transition-duration: 0.5s;
`;

const MainWrapper = styled.div`
  // padding-top: 64px;
  // height: 100vh;
  display: flex;
  align-items: center;
  margin-top: -60px;
`;

const HeroContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  min-height: 420px !important;
  margin: 0 auto;
  width: 100%;
`;

const ChildContainer = styled.div`
  margin-top: 0;
  padding-top: 120px !important;
  padding-bottom: 0px !important;
`;

const Title = styled.h1`
  font-size: 38px;
  @media (min-width: 769px) {
    font-size: 44px;
  }
  // font-family: 'overpass', sans-serif !important;
  margin-bottom: 16px;
  max-width: 550px;
`;

const SubTitle = styled.p`
  // color: rgba(81, 160, 249, 0.4);
  font-size: 26px;
  max-width: 550px;
`;

const ButtonFlex = styled.div`
  margin: 0 -8px;
  @media (min-width: 520px) {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
  }
  padding-bottom: 12px;
`;

const ButtonWrapper = styled.div`
  padding: 8px !important;
  button {
    margin: 0 !important;
  }
`;

export default Hero;
