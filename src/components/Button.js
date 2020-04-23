/* eslint-disable no-nested-ternary */
import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'gatsby';

const Button = ({
  children,
  primary,
  className,
  small,
  margin,
  secondary,
  gray,
  outlined,
  solid,
  onClick,
  right,
  left,
  center,
  medium,
  link,
}) => {
  return (
    <span>
      {link ? (
        <Link className='no-styling' to={link}>
          <StyledButton
            small={small}
            medium={medium}
            className={className ? className : ''}
            right={right}
            left={left}
            center={center}
            margin={margin}
            secondary={secondary}
            gray={gray}
            outlined={outlined}
            onClick={onClick || null}
            link
          >
            {children}
          </StyledButton>
        </Link>
      ) : (
        <StyledButton
          small={small}
          medium={medium}
          className={className ? className : ''}
          right={right}
          left={left}
          center={center}
          margin={margin}
          secondary={secondary}
          gray={gray}
          outlined={outlined}
          onClick={onClick || null}
        >
          {children}
        </StyledButton>
      )}
    </span>
  );
};

const StyledButton = styled.button`
  padding: ${(props) =>
    props.small
      ? props.outlined
        ? ' 6px 12px'
        : '7px 13px'
      : props.medium
      ? props.outlined
        ? '8px 16px'
        : '9px 17px'
      : props.outlined
      ? '13px 25px'
      : '14px 26px'} !important;
  border: none !important;
  text-transform: ${props => !props.gray && 'uppercase'} !important;
  cursor: pointer !important;
  transition-duration: 0.5s !important;
  letter-spacing: 1.1px !important;
  font-size: ${(props) => (props.small ? '13px' : '16px')} !important;
  font-weight: 600 !important;
  // z-index:  !important;
  display: block;
  overflow: hidden !important;
  position: relative !important;
  outline: none !important;
  border-radius: 4px !important;
  margin: ${(props) => (props.margin ? '0 8px' : 0)};
  background: ${(props) =>
    props.outlined
      ? 'transparent'
      : props.gray
      ? props.theme.color.gray.two
      : props.secondary
      ? `linear-gradient(
    to right top,
    ${props.theme.color.secondary.light},
    ${props.theme.color.secondary.dark}
  )`
      : `linear-gradient(
    to right top,
    ${props.theme.color.primary.light},
    ${props.theme.color.primary.dark}
  )`} !important;
  color: ${(props) =>
    props.outlined || props.gray
      ? props.theme.color.text.heading
      : props.secondary
      ? 'white'
      : 'white'} !important;
  border: 2px solid
    ${(props) =>
      props.outlined
        ? props.gray
          ? props.theme.color.gray.two
          : props.secondary
          ? props.theme.color.secondary.main
          : props.theme.color.primary.main
        : props.secondary
        ? `linear-gradient(
    to right top,
    ${props.theme.color.secondary.light},
    ${props.theme.color.secondary.dark}
  )`
        : `linear-gradient(
            to right top,
    ${props.theme.color.primary.light},
    ${props.theme.color.primary.dark},
  )`} !important;

  :hover {
    box-shadow: 2px 4px 22px -10px ${(props) =>
      props.gray
        ? 'transparent'
        : props.secondary
        ? `${props.theme.color.secondary.main}90`
        : `${props.theme.color.primary.main}90`};
    background: ${props => props.gray && props.theme.color.gray.three} !important;
    transform: ${(props) => (props.gray ? 'none' : 'scale(1.03)')};
  }
  // :active ::before {
  //   right: 0 !important;
  // }
  a {
    text-decoration: none !important;
    padding: 0 !important;
    margin: 0 !important;
    color: ${(props) =>
      props.outlined
        ? 'black'
        : props.secondary
        ? 'white'
        : 'white'} !important;
  }
  display: block;
  ${(props) =>
    props.right &&
    css`
      margin: 0 !important;
      margin-left: auto !important;
    `}
  ${(props) =>
    props.left &&
    css`
      margin: 0 !important;
      margin-right: auto !important;
    `}
  ${(props) =>
    props.center &&
    css`
      margin: 0 auto !important;
    `}
`;

export default Button;
