import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Modal = ({ children, title, toggleFunction, noClose, noHeader }) => {
  return (
    <ModalWrapper>
      <StyledModal noHeader={noHeader}>
        {title && !noHeader && <Title className='mt-none'>{title}</Title>}
        {!noClose && (
          <CloseButton onClick={toggleFunction}>
            <FontAwesomeIcon icon='times' />
          </CloseButton>
        )}
        {children}
      </StyledModal>
    </ModalWrapper>
  );
};

const ModalWrapper = styled.div`
  position: fixed;
  width: 100vw;
  height: 100%;
  top: 0;
  left: 0;
  background: ${(props) => props.theme.color.primary.backgroundDark}50;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99999999 !important;
`;

const Title = styled.h2`
  position: absolute;
  top: 32px;
  left: 32px;
`;

const CloseButton = styled.button`
  cursor: pointer;
  position: absolute;
  top: 32px;
  right: 32px;
  width: fit-content;
  height: auto;
  border: none;
  background: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  font-weight: 400;
  color: ${(props) => props.theme.color.text.heading};
  svg,
  path,
  * {
    width: 100%;
    display: block;
    height: 100%;
  }
`;

const zoom = keyframes`
  from {
    transform: scale(0.01);
  }
  to {
        transform: scale(1);

  }
`;

const StyledModal = styled.div`
  max-width: 90%;
  margin: 0 auto;
  animation: ${zoom} 250ms ease-out;
  position: relative;
  height: fit-content;
  width: fit-content;
  border-radius: 5px;
  z-index: 999;
  padding: 32px;
  padding-top: ${(props) => (props.noHeader ? '32px' : '98px')};
  background: white;
  border-radius: 5px;
`;

export default Modal;
