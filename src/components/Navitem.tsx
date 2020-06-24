import React, { useState, ReactElement } from "react";
import styled from "styled-components";

interface NavitemProps extends React.HTMLAttributes<HTMLLIElement> {}

export const Navitem: React.FC<NavitemProps> = (props) => {
  return (
    <Item {...props}>
      <ItemButton href="#">{props.children}</ItemButton>
    </Item>
  );
};

const Item = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const ItemButton = styled.a`
  padding: 10px;
  margin: 20px;
  color: ${(props) => props.theme.colors.text};
  text-decoration: none;
  &:hover {
    filter: brightness(1.2);
  }
`;
