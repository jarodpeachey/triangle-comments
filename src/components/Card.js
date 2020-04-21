import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'gatsby';

const Card = ({ children, title }) => {
  return (
    <Wrapper>
      <StyledCard>
        {title && <Title>{title}</Title>}
        {children}
      </StyledCard>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 16px 0;
`;

const StyledCard = styled.div`
  padding: 16px;
  margin-bottom: 32px;
  background: white;
  border-radius: 5px;
  border: 1px solid ${props => props.theme.color.gray.three};
  // box-shadow: 2px 4px 10px 0px ${(props) => props.theme.color.gray.three};
`;

const Title = styled.h4`
  margin: 0;
  padding-bottom: 12px;
  margin-bottom: 16px;
  border-bottom: 2px solid ${props => props.theme.color.gray.two};
`;

export default Card;
