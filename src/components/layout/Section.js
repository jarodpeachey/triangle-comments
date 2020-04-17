import React from 'react';
import styled from 'styled-components';

const Section = ({ children, background, title, subtitle, center }) => {
  return (
    <StyledSection center={center} color={background}>
      <div className='container'>
        {title && <Title>{title}</Title>}
        {subtitle && <SubTitle>{subtitle}</SubTitle>}
        {children}
      </div>
    </StyledSection>
  );
};

const Title = styled.h2`
  font-weight: 800;
  font-family: 'overpass', sans-serif !important;
  // margin-bottom: 16px;
  margin-top: 0;
`;

const SubTitle = styled.p``;

const StyledSection = styled.section`
  text-align: ${(props) => (props.center ? 'center' : 'inherit')};
  background: ${(props) => props.color || 'white'};
`;

export default Section;
