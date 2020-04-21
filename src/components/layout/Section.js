import React from 'react';
import styled, { css } from 'styled-components';

const Section = ({
  fullHeight,
  children,
  background,
  title,
  subtitle,
  center,
  customStyles
}) => {
  return (
    <StyledSection customStyles={customStyles} fullHeight={fullHeight} center={center} color={background}>
      <div className='container'>
        {title && <Title>{title}</Title>}
        {subtitle && <SubTitle>{subtitle}</SubTitle>}
        {children}
      </div>
    </StyledSection>
  );
};

const Title = styled.h2`
  margin-top: 0;
`;

const SubTitle = styled.p``;

const StyledSection = styled.section`
  text-align: ${(props) => (props.center ? 'center' : 'inherit')};
  background: ${(props) => props.color || 'white'};
  ${(props) =>
    props.fullHeight &&
    css`
      height: 100%;
      display: block;
      height: 100%;
      padding-top: 32px;
      .container {
        height: 100%;
        display: flex;
        flex-direction: column;
        // justify-content: center;
        align-items: center;
      }
    `}
  ${props => props.customStyles}
`;

export default Section;
