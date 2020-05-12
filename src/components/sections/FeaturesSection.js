import React, { useContext } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Section from '../layout/Section';
import Row from '../grid/Row';
import { ThemeContext } from '../theme';
import Spacer from '../Spacer';

const FeaturesSection = ({ data }) => {
  const theme = useContext(ThemeContext);

  return (
    <Section
      customStyles={`
        position: relative !important;
        z-index: 1 !important;
        display: block !important;
        // padding-bottom: 150px;
        // margin-bottom: -150px;
  @media (min-width: 576px) {

  }
  @media (min-width: 670px) {

  }
  @media (min-width: 850px) {

  }
  @media (min-width: 1000px) {

  }
  @media (min-width: 1300px) {

  }
  @media (min-width: 1500px) {

  }
  @media (min-width: 1677px) {

  }
      `}
      background='#ffffff'
    >
      <h1 className='center'>Built for modern development</h1>
      <p className='center'>
        Staticbox combines simplicity and speed with usability, giving you an
        effortless way to moderate comments.
      </p>
      <Spacer height={64} />
      <Row spacing={[12, 32]} breakpoints={[650, 1100, 2900]}>
        <Feature widths={[6, 4, 3]}>
          <FeatureIcon offsetY={-2} offsetX={4}>
            <FontAwesomeIcon icon='search' />
            <div className='icon'>
              <FontAwesomeIcon icon='search' />
            </div>
          </FeatureIcon>
          <FeatureTitle>Intuitive Moderation</FeatureTitle>
          <FeatureSubtitle>
            Moderate your comments with ease with bulk actions, filtering and
            spam protection.
          </FeatureSubtitle>
        </Feature>
        <Feature widths={[6, 4, 3]}>
          <FeatureIcon offsetY={-2} offsetX={4}>
            <FontAwesomeIcon icon='puzzle-piece' />
            <div className='icon'>
              <FontAwesomeIcon icon='puzzle-piece' />
            </div>
          </FeatureIcon>
          <FeatureTitle>Drop-in Forms</FeatureTitle>
          <FeatureSubtitle>
            Staticbox makes it easy to add comments to your site, your way.
            Choose a template, customize your form and drop it into your site!
            Simply add a form to your site and Staticbox takes care of the rest.
          </FeatureSubtitle>
        </Feature>
        <Feature widths={[6, 4, 3]}>
          <FeatureIcon offsetY={0} offsetX={1}>
            <FontAwesomeIcon icon='bolt' />
            <div className='icon'>
              <FontAwesomeIcon icon='bolt' />
            </div>
          </FeatureIcon>
          <FeatureTitle>Blazing Fast</FeatureTitle>
          <FeatureSubtitle>
            Staticbox takes advantage of serverless architecture and static site
            generators by loading your comments on build time, making it
            impossible for it to slow down your site 🚀
          </FeatureSubtitle>
        </Feature>
        <Feature widths={[6, 4, 3]}>
          <FeatureIcon offsetY={-2} offsetX={4}>
            <FontAwesomeIcon icon='binoculars' />
            <div className='icon'>
              <FontAwesomeIcon icon='binoculars' />
            </div>
          </FeatureIcon>
          <FeatureTitle>Custom Filters</FeatureTitle>
          <FeatureSubtitle>
            Choose from multiple filtering presets, or create your own custom
            filters. Never allow a spam comment onto your site again 🙅‍♂️
          </FeatureSubtitle>
        </Feature>
        <Feature widths={[6, 4, 3]}>
          <FeatureIcon>
            <FontAwesomeIcon icon='cog' />
            <div className='icon'>
              <FontAwesomeIcon icon='cog' />
            </div>
          </FeatureIcon>
          <FeatureTitle>Fully Customizable</FeatureTitle>
          <FeatureSubtitle>
            A fully-customizable form and comments display makes Staticbox blend
            in perfectly with your brand and your style.
          </FeatureSubtitle>
        </Feature>
      </Row>
    </Section>
  );
};

const Feature = styled.div`
  margin: 0 auto;
  width: 100%;
  text-align: center;
  max-width: 300px;
`;

const FeatureIcon = styled.div`
  font-size: 34px;
  width: fit-content;
  height: fit-content;
  border-radius: 100px;
  display: flex;
  position: relative;
  margin: 0 auto;
  align-items: center;
  justify-content: center;
  // background: ${(props) => props.theme.color.primary.backgroundLight};
  // border: 3px solid ${(props) => props.theme.color.gray.three};
  color: ${(props) => props.theme.color.primary.main};
  svg {
    position: relative;
    top: ${(props) => props.offsetY}px;
    left: ${(props) => props.offsetX}px;
    font-size: 36px;
  }
  .icon {
    * {
      font-size: 140px !important;
    }
    position: absolute;
    top: -5px;
    right: -140px;
    height: fit-content;
    width: fit-content;
    color: ${(props) => props.theme.color.primary.main}13;
  }
`;

const FeatureTitle = styled.h4`
  margin: 12px 0;
  font-size: 22px !important;
`;

const FeatureSubtitle = styled.p`
  font-size: 18px !important;
`;

export default FeaturesSection;
