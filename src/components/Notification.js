/* eslint-disable no-nested-ternary */
import React from 'react';
import styled, { keyframes, css } from 'styled-components';

const Notification = ({ type, message }) => {
  return (
    <NotificationWrapper>
      <StyledNotification type={type || 'info'}>{message}</StyledNotification>
    </NotificationWrapper>
  );
};

const slide = keyframes`
  0% { transform: translateY(50%) }
  100% { transform: translateY(0%) }
`;

const NotificationWrapper = styled.div`
  position: fixed;
  bottom: 36px;
  left: 0;
  width: 100vw;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  z-index: 999;
`;

const StyledNotification = styled.span`
  padding: 12px;
  width: fit-content;
  margin: 0 auto;
  z-index: 999;
  border-radius: 3px;
  animation: ${slide} .3s ease-out;
  background: ${props => props.type === 'success' ? props.theme.color.success : props.type === 'error' ? props.theme.color.error : props.theme.color.primary.light};
  color: white;
`;

export default Notification;
