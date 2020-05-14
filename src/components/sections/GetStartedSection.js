import React, { useContext } from 'react';
import Section from '../layout/Section';
import Button from '../Button';
import { ThemeContext } from '../theme';

const GetStartedSection = ({ data }) => {
  const theme = useContext(ThemeContext);

  return (
    <Section
      customStyles={`
        z-index: 999;
        // margin-top: -110px;
        position: relative;
      `}
      dark
      center
      title='Try It Out'
      subtitle='Staticbox is the simplest, most intuive commenting system built specifically with static websites in mind.'
    >
      <br />
      <Button link='/' center>
        Start Now
      </Button>
    </Section>
  );
};

export default GetStartedSection;
