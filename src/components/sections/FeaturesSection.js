import React, { useContext } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Section from '../layout/Section';
import Row from '../grid/Row';
import { ThemeContext } from '../theme';

const FeaturesSection = ({ data }) => {
  const theme = useContext(ThemeContext);

  return (
    <Section
      customStyles={`
        position: relative !important;
        z-index: 1 !important;
        display: block !important;
        padding-bottom: 150px;
        margin-bottom: -150px;
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
      <h1 className='center'>Fully-Featured Commenting System</h1>
      <p className='center'>
        Staticbox combines simplicity and speed with usability, giving you an
        effortless way to moderate comments.
      </p>
      <br />
      <Row spacing={[12]} breakpoints={[576, 769, 960]}>
        <Feature widths={[6, 4, 3]}>
          <FeatureIcon offsetY={-2} offsetX={4}>
            <FontAwesomeIcon icon='puzzle-piece' />
          </FeatureIcon>
          <FeatureTitle>Drop-in Forms</FeatureTitle>
          <FeatureSubtitle>
            Simply add a form to your site and Staticbox takes care of the rest.
            Choose from multiple templates, or customize your own!
          </FeatureSubtitle>
        </Feature>
        <Feature widths={[6, 4, 3]}>
          <FeatureIcon offsetY={0} offsetX={1}>
            <FontAwesomeIcon icon='bolt' />
          </FeatureIcon>
          <FeatureTitle>Blazing Fast</FeatureTitle>
          <FeatureSubtitle>
            Staticbox takes advantage of serverless architecture to remove bloat
            and make sure it doesn't slow down your page.
          </FeatureSubtitle>
        </Feature>
        <Feature widths={[6, 4, 3]}>
          <FeatureIcon>
            <FontAwesomeIcon icon='desktop' />
          </FeatureIcon>
          <FeatureTitle>Intuitive UI</FeatureTitle>
          <FeatureSubtitle>
            A minimalist UI makes it easy to filter and moderator your comments,
            as well as style your form.
          </FeatureSubtitle>
        </Feature>
        <Feature widths={[6, 4, 3]}>
          <FeatureIcon>
            <FontAwesomeIcon icon='cog' />
          </FeatureIcon>
          <FeatureTitle>Customizable</FeatureTitle>
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
  width: 70px;
  height: 70px;
  border-radius: 70px;
  display: flex;
  margin: 0 auto;
  align-items: center;
  justify-content: center;
  background: ${(props) => props.theme.color.primary.backgroundLight};
  color: ${(props) => props.theme.color.primary.main};
  * {
    position: relative;
    top: ${(props) => props.offsetY}px;
    left: ${(props) => props.offsetX}px;
  }
`;

const FeatureTitle = styled.h4`
  margin-top: 8px;
  font-size: 22px !important;
`;

const FeatureSubtitle = styled.p`
  font-size: 18px !important;
`;

export default FeaturesSection;
