import React, { useContext } from 'react';
import styled, { css } from 'styled-components';
import { ThemeContext } from '../theme';

const Section = ({
  fullHeight,
  children,
  background,
  title,
  subtitle,
  center,
  customStyles,
  dark,
  light,
  thin,
}) => {
  const theme = useContext(ThemeContext);

  return (
    <StyledSection
      customStyles={customStyles}
      fullHeight={fullHeight}
      center={center}
      dark={dark}
      light={light}
      thin={thin}
      color={
        dark
          ? theme.color.primary.backgroundDark
          : light
          ? theme.color.primary.backgroundLight
          : background || 'transparent'
      }
    >
      <div className='container'>
        {title && <Title dark={dark}>{title}</Title>}
        {subtitle && <SubTitle dark={dark}>{subtitle}</SubTitle>}
        {children}
      </div>
    </StyledSection>
  );
};

const Title = styled.h2`
  color: ${(props) => (props.dark ? 'white' : props.theme.color.text.heading)};
`;

const SubTitle = styled.p`
  color: ${(props) =>
    props.dark ? props.theme.color.text.paragraph : props.theme.color.text.heading};
`;

const StyledSection = styled.section`
  text-align: ${(props) => (props.center ? 'center' : 'inherit')};
  z-index: 1;
  ${props => props.thin && css`
    .container {
      padding-top: 0;
      padding-bottom: 0;
    }
  `};
  background: ${(props) => props.color};
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
  ${(props) => props.customStyles}
`;

export default Section;
