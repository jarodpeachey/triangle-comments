import React from 'react';
import styled from 'styled-components';
import Section from '../Section';
import Row from '../../grid/row';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../../Button';

const GetStartedSection = ({ data }) => {
  return (
    <Section
      center
      title='Try It Out'
      subtitle='Triangle is the simplest, most intuive commenting system built specifically with static websites in mind.'
    >
      <br />
      <Button>Get Started</Button>
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

export default GetStartedSection;
