/* eslint-disable react/jsx-fragments */
import React, { useState, useEffect } from 'react';
import { graphql, StaticQuery } from 'gatsby';
import styled from 'styled-components';
import Button from '../Button';
import heroImage from '../../images/hero.png';

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
      <div
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
      />
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
            <ButtonWrapper>
              <Button link='/signup'>Get Started</Button>
            </ButtonWrapper>
            <ButtonWrapper>
              <Button outlined link='/'>
                Learn More
              </Button>
            </ButtonWrapper>
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

const ButtonWrapper = styled.div`
  @media (max-width: 520px) {
    width: 100%;
    display: flex;
    justify-content: flex-start;
  }
  padding: 8px 18px !important;
  margin-left: -18px;
  width: fit-content;
  display: inline-block;
  button {
    margin: 0 !important;
  }
`;

export default Hero;
