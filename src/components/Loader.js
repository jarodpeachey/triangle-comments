import React from 'react';
import styled, { keyframes, css } from 'styled-components';

const Loader = ({ text, color, size, absolute }) => {
  return (
    <span>
      <StyledLoader color={color || false} absolute={absolute} size={size || false} />
      {text && <Text className='center'>{text}</Text>}
    </span>
  );
};

const Text = styled.p``;

const spin = keyframes`
  0% { transform: rotate(0deg) }
  100% { transform: rotate(360deg) }
`;

const StyledLoader = styled.span`
  border-top: 3px solid
    ${(props) => (props.color ? props.color : props.theme.color.secondary.dark)};
  border-left: 3px solid
    ${(props) =>
      props.color ? props.color : props.theme.color.secondary.dark}cc;
  border-bottom: 3px solid
    ${(props) =>
      props.color ? props.color : props.theme.color.secondary.dark}90;
  border-right: 3px solid
    ${(props) =>
      props.color ? props.color : props.theme.color.secondary.dark}70;
  border-radius: 50px;
  margin: 0 auto;
  padding: 12px;
  background: transparent;
  width: ${(props) => `${props.size}px` || '50px'};
  height: ${(props) => `${props.size}px` || '50px'};
  display: block;
  z-index: 999;
  animation: ${spin} 1.5s cubic-bezier(0.075, 0.82, 0.6, 0.9) infinite;
  ${(props) =>
    props.absolute &&
    css`
      position: absolute;
      top: calc(50% - ${props.size / 2}px);
      left: calc(50% - ${props.size / 2}px);
      padding: 0;
    `};
`;

export default Loader;
