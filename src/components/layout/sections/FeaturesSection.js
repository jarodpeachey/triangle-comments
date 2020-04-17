import React from 'react';
import styled from 'styled-components';
import Section from '../Section';
import Row from '../../grid/row';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const FeaturesSection = ({ data }) => {
  return (
    <Section background='rgb(81, 160, 249)'>
      <Row spacing={[12]} breakpoints={[520, 769]}>
        <Feature widths={[6, 3]}>
          <FeatureIcon>
            <FontAwesomeIcon icon='puzzle-piece' />
          </FeatureIcon>
          <FeatureTitle>Drop-in Forms</FeatureTitle>
          <FeatureSubtitle>Simply add a form to your site and Triangle takes care of the rest!</FeatureSubtitle>
        </Feature>
        <Feature widths={[6, 3]}>
          <FeatureIcon>
            <FontAwesomeIcon icon='bolt' />
          </FeatureIcon>
          <FeatureTitle>Blazing Fast</FeatureTitle>
          <FeatureSubtitle>Triangle takes advantage of serverless architecture to make sure it doesn't slow down your page.</FeatureSubtitle>
        </Feature>
        <Feature widths={[6, 3]}>
          <FeatureIcon>
            <FontAwesomeIcon icon='desktop' />
          </FeatureIcon>
          <FeatureTitle>Intuitive UI</FeatureTitle>
          <FeatureSubtitle>A minimalist UI makes it easy to moderate comments and update settings.</FeatureSubtitle>
        </Feature>
        <Feature widths={[6, 3]}>
          <FeatureIcon>
            <FontAwesomeIcon icon='cog' />
          </FeatureIcon>
          <FeatureTitle>Customizable</FeatureTitle>
          <FeatureSubtitle>Triangle lets you customize the color and style of your form. It even allows you to add custom CSS!</FeatureSubtitle>
        </Feature>
      </Row>
    </Section>
  );
};

const Feature = styled.div`
  margin: 0 auto;
  width: 100%;
  text-align: center;
  color: white;
`;

const FeatureIcon = styled.div`
  font-size: 56px;
`;

const FeatureTitle = styled.h4`
  margin-top: 8px;
  font-size: 22px !important;
`;

const FeatureSubtitle = styled.p``;

export default FeaturesSection;
