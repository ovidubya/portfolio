import React, { useState } from "react";
import styled from "styled-components";

type NavitemProps = {};

export const Navitem: React.FC<NavitemProps> = (props) => {
  return (
    <Item>
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
