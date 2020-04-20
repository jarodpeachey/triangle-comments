import React from 'react';
import Section from '../layout/Section';
import Button from '../Button';

const GetStartedSection = ({ data }) => {
  return (
    <Section
      center
      title='Try It Out'
      subtitle='Triangle is the simplest, most intuive commenting system built specifically with static websites in mind.'
    >
      <br />
      <Button
        link='https://trianglecomments.memberful.com/checkout?plan=47429'
        center
      >
        Start Now
      </Button>
    </Section>
  );
};

export default GetStartedSection;
