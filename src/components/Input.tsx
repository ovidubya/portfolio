import * as React from "react";
import styled from "styled-components";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input: React.SFC<InputProps> = (props) => {
  return <StyledInput autoComplete="off" {...props} />;
};

const StyledInput = styled.input`
  background-color: white;
  width: 100%;
  line-height: 1.5;
  font-size: 1rem;
  border-width: 1px;
  border-style: solid;
  border-image: initial;
  border-color: rgb(140, 140, 140);
  padding: 20px;
  -webkit-appearance: none;
`;
