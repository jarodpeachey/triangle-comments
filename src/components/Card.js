import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'gatsby';

const Card = ({ children, title, subtitle, customStyles }) => {
  return (
    <Wrapper>
      <StyledCard customStyles={customStyles}>
        {title && <Title border={!subtitle}>{title}</Title>}
        {subtitle && <Subtitle className='weight-light'>{subtitle}</Subtitle>}
        {children}
      </StyledCard>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  // margin: 16px 0;
`;

const StyledCard = styled.div`
  padding: 16px;
  // margin-bottom: 32px;
  background: white;
  border-radius: 5px;
  border: 1px solid ${(props) => props.theme.color.gray.three};
  // box-shadow: 2px 4px 10px 0px ${(props) => props.theme.color.gray.three};
  ${(props) =>
    props.customStyles &&
    css`
      ${props.customStyles}
    `}
`;

const Title = styled.h2`
  margin: 0;
  padding-bottom: ${(props) => (props.border ? '12px' : '0')};
  margin-bottom: ${(props) => (props.border ? '16px' : '8px')};
  border-bottom: ${(props) =>
    props.border ? `2px solid ${props.theme.color.gray.two}` : 'none'};
`;

const Subtitle = styled.p`
  margin: 0;
  padding-bottom: 12px;
  margin-bottom: 16px;
  // color: #00000090 !important;
  border-bottom: 2px solid ${(props) => props.theme.color.gray.two};
`;

export default Card;
