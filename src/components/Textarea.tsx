import * as React from "react";
import styled from "styled-components";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLElement> {}

export const Textarea: React.FC<TextareaProps> = (props) => {
  return <StyledTextarea {...props} />;
};

const StyledTextarea = styled.textarea`
  -webkit-appearance: none;
  display: block;
  width: 100%;
  resize: vertical;
  min-height: 80px;
  background-color: white;
  font-size: 16px;
  border-width: 1px;
  border-style: solid;
  padding: 16px 12px;
  margin: 0px;
  border-color: rgb(148, 148, 148);
`;
