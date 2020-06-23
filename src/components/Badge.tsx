import * as React from "react";
import styled from "styled-components";
import { readableColor } from "polished";

type BadgeProps = {};

export const Badge: React.FC<BadgeProps> = ({ children }) => {
  return <BadgeStyed>{children}</BadgeStyed>;
};

const BadgeStyed = styled.span`
  display: inline-block;
  background-color: ${(props) => props.theme.colors.lovelyBlue};
  color: ${(props) =>
    readableColor(props.theme.colors.lovelyBlue, "white", "black")};
  padding: 0.25em 0.4em;
  font-size: 75%;
  font-weight: 700;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: 0.25rem;
`;
