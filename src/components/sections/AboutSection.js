import React, { useContext } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Section from '../layout/Section';
import Row from '../grid/Row';
import { ThemeContext } from '../theme';

const AboutSection = ({ data }) => {
  const theme = useContext(ThemeContext);

  return (
    <div>
      {/* <Section background='white'>
        <h1 className='center'>
          
        </h1>
        <p className='center'>
          Welcome to Staticbox!
        </p>
        <p className='center'>
          Staticbox is a modern commenting system built to get rid of bloat and make comments as simple as they should be.
        </p>
        <p className='center'>
          It's as simple as 1-2-3. Are you ready to get started?
        </p>
      </Section> */}
    </div>
  );
};

export default AboutSection;
