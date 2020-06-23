import * as React from "react";
import styled from "styled-components";
import { lighten } from "polished";

type FooterProps = {};

export const Footer: React.SFC<FooterProps> = () => {
  return (
    <StyledFooter>
      <FooterItem>
        <strong>© 2020</strong>
        <a href={location.href}>Built with ☕️ by Ovadia Shalom</a>
      </FooterItem>
      <FooterItem>
        <strong>Chess Profile</strong>
        <a href="https://www.chess.com/member/ovidubs">ovidubs</a>
      </FooterItem>
      <FooterItem>
        <strong>Social</strong>
        <div>
          <a target="_blank" href="https://github.com/ovidubya">
            Github
          </a>{" "}
          /{" "}
          <a
            target="_blank"
            href="https://www.linkedin.com/in/ovadia-shalom-b52190b9/"
          >
            Linkedin
          </a>
        </div>
      </FooterItem>
      {/* <FooterItem>
        <strong>Resume</strong>
        <a href="/Shalom_Resume_June2020.pdf">View</a>
      </FooterItem> */}
    </StyledFooter>
  );
};

const FooterItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  & a {
    color: ${(props) => props.theme.colors.text};
  }
  margin: 20px 0;
  @media screen and (min-width: 768px) {
    & {
      margin: 0;
    }
  }
`;

export const StyledFooter = styled.section`
  display: flex;
  background-color: ${(props) => lighten(0.1, props.theme.colors.body)};
  padding: 2rem 2rem;
  flex-direction: column;
  @media screen and (min-width: 768px) {
    justify-content: space-around;
    flex-direction: row;
  }
`;
