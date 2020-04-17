import React from 'react';
import styled from 'styled-components';

const Button = ({
  children,
  primary,
  className,
  small,
  margin,
  secondary,
  outlined,
  solid,
}) => {
  return (
    <StyledButton
      small={small}
      className={className ? className : ''}
      margin={margin}
      secondary={secondary}
      outlined={outlined}
    >
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button`
  padding: ${(props) =>
    props.small
      ? props.outlined
        ? ' 6px 12px'
        : '7px 13px'
      : props.outlined
      ? ' 13px 25px'
      : '14px 26px'} !important;
  border: none !important;
  text-transform: uppercase !important;
  cursor: pointer !important;
  transition-duration: 0.5s !important;
  letter-spacing: 1.1px !important;
  font-size: ${(props) => (props.small ? '13px' : '16px')} !important;
  font-weight: 500 !important;
  z-index: 1 !important;
  overflow: hidden !important;
  position: relative !important;
  outline: none !important;
  border-radius: 50px !important;
  margin: ${(props) => (props.margin ? '0 8px' : 0)};
  background: ${(props) =>
    props.outlined
      ? 'transparent'
      : props.secondary
      ? `linear-gradient(
    to right top,
    rgb(249, 170, 80),
    rgb(241, 116, 58)
  )`
      : `linear-gradient(
    to right top,
    rgb(80, 202, 249),
    rgb(83, 104, 241)
  )`} !important;
  color: ${(props) =>
    props.outlined ? 'black' : props.secondary ? 'white' : 'white'} !important;
  border: 2px solid
    ${(props) =>
      props.outlined
        ? props.secondary
          ? 'rgb(253, 99, 71)'
          : 'rgb(81, 160, 249)'
        : props.secondary
        ? `linear-gradient(
    to right top,
    rgb(249, 170, 80),
    rgb(241, 116, 58)
  )`
        : `linear-gradient(
    to right top,
    rgb(80, 202, 249),
    rgb(83, 104, 241)
  )`} !important;
  ::before {
    clip: none !important;
    z-index: -100 !important;
    transform: scale(1) !important;
    content: '' !important;
    position: absolute !important;
    background: ${(props) =>
      props.outlined
        ? props.secondary
          ? `linear-gradient(
    to right top,
    rgb(249, 170, 80),
    rgb(241, 116, 58)
  )`
          : `linear-gradient(
    to right top,
    rgba(80, 202, 249, 0.2),
    rgba(83, 104, 241, 0.2)
  )`
        : 'rgba(255, 255, 255, 0.2)'} !important;
    top: 0 !important;
    right: 100% !important;
    z-index: -1 !important;
    transition: 0.2s ease-in-out !important;
    width: 101% !important;
    height: 101% !important;
  }
  :hover {
    box-shadow: 2px 4px 22px -10px rgba(81, 160, 249, 1);
    transform: scale(1.03);
  }
  // :active ::before {
  //   right: 0 !important;
  // }
`;

export default Button;
