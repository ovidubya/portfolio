import * as React from "react";
import styled, { css } from "styled-components";
import { readableColor } from "polished";

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  backgroundColor: string;
  large?: boolean;
  fullWidth?: boolean;
}

export const Button = styled.button`
  /* display: flex; */
  padding: ${(props) => (props.large ? "20px 30px" : "15px 25px")};
  border: 0;
  font-size: ${(props) =>
    props.large ? props.theme.font.large : props.theme.font.medium};
  transition: all 200ms;
  cursor: pointer;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-color: transparent;
  text-align: center;
  ${(props) =>
    props.fullWidth &&
    css`
      width: 100%;
    `}
  border: 1px solid ${(props: ButtonProps) => props.backgroundColor};
  color: ${(props) => readableColor(props.theme.colors.body)};
  &:hover {
    color: ${(props: ButtonProps) => readableColor(props.backgroundColor)};
    background-color: ${(props: ButtonProps) => props.backgroundColor};
  }
`;
