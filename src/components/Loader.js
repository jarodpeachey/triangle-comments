import React from 'react';
import styled, { keyframes } from 'styled-components';

const Loader = ({ text }) => {
  return (
    <span>
      <Loading />
      {text && <Text className='center'>{text}</Text>}
    </span>
  );
};

const Text = styled.p``;

const spin = keyframes`
  0% { transform: rotate(0deg) }
  100% { transform: rotate(360deg) }
`;

const Loading = styled.div`
  border-top: 3px solid ${(props) => props.theme.color.secondary.dark};
  border-left: 3px solid ${(props) => props.theme.color.secondary.dark}cc;
  border-bottom: 3px solid ${(props) => props.theme.color.secondary.dark}90;
  border-right: 3px solid ${(props) => props.theme.color.secondary.dark}70;
  border-radius: 50px;
  margin: 0 auto;
  padding: 12px;
  background: transparent;
  width: 50px;
  height: 50px;
  animation: ${spin} 1.5s cubic-bezier(0.075, 0.82, 0.6, 0.9) infinite;
`;

export default Loader;
