import * as React from "react";
import styled, { css } from "styled-components";
import { calcOffset } from "../utils/calcOffset";
import { useScroll } from "../hooks/useScroll";
import { lighten } from "polished";
type NavbarProps = {};

export const Navbar: React.FC<NavbarProps> = ({ children }) => {
  const NavRef = React.useRef(null);
  const { scrollY } = useScroll();
  const [navOffset, setNavOffset] = React.useState(0);

  React.useEffect(() => {
    setNavOffset(calcOffset(NavRef.current));
  }, []);
  return (
    <Nav isFixed={scrollY > navOffset} ref={NavRef}>
      <Navlist>{children}</Navlist>
    </Nav>
  );
};

const Nav = styled.nav<{ isFixed: boolean }>`
  padding: 0 1rem;
  height: ${(props) => props.theme.navSize};
  background-color: ${(props) => lighten(0.1, props.theme.colors.body)};
  border-bottom: ${(props) => props.theme.toggleBorder};
  ${(props) =>
    props.isFixed &&
    css`
      position: sticky;
      width: 100%;
      top: 0;
    `}
`;

const Navlist = styled.ul`
  max-width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
`;
