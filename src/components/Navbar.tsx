import * as React from "react";
import styled from "styled-components";

import { lighten } from "polished";
type NavbarProps = {};

export const Navbar: React.FC<NavbarProps> = ({ children }) => {
  const NavRef = React.useRef(null);
  return (
    <Nav ref={NavRef}>
      <Navlist>{children}</Navlist>
    </Nav>
  );
};

const Nav = styled.nav`
  padding: 0 1rem;
  height: ${(props) => props.theme.navSize};
  background-color: ${(props) => lighten(0.1, props.theme.colors.body)};
  border-bottom: ${(props) => props.theme.toggleBorder};
  position: sticky;
  width: 100%;
  top: 0;
`;

const Navlist = styled.ul`
  max-width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  @media screen and (min-width: 768px) {
    justify-content: flex-end;
  }
`;
