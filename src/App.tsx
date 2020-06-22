import * as React from "react";
import { Navbar, Navitem, Button, ToggleTheme } from "./components";
import styled, { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./themes/theme";
import { GlobalStyles } from "./themes/global";
import { useTheme } from "./hooks/useTheme";
import { calcOffset } from "./utils/calcOffset";
import { Project } from "./components/Project";
import { useRef } from "react";

type AppProps = {};

export const App: React.SFC<AppProps> = () => {
  const { theme, toggleTheme } = useTheme();
  const ProjectsRef = useRef(null);

  const scrollToProjects = () => {
    if (ProjectsRef.current) {
      window.scrollTo(0, calcOffset(ProjectsRef.current) - 60);
    }
  };

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyles />
      <ToggleTheme theme={theme} toggleTheme={toggleTheme} />
      <AboutMeContainer>
        <IntroductionText>Hi! 👋, I'm Ovadia </IntroductionText>
        <IntroductionText>I'm a fullstack Software Engineer.</IntroductionText>
        <Button
          large
          onClick={(e) => {
            e.preventDefault();
            scrollToProjects();
          }}
          backgroundColor="#27ae60"
        >
          View my portofolio
        </Button>
      </AboutMeContainer>
      <Navbar>
        <Navitem>projects</Navitem>
        <Navitem>blog</Navitem>
        <Navitem>contact</Navitem>
      </Navbar>
      <ProjectsContainer ref={ProjectsRef} id="projects">
        <Project></Project>
        <Project></Project>
        <Project></Project>
        <Project></Project>
        <Project></Project>
      </ProjectsContainer>
    </ThemeProvider>
  );
};

const ProjectsContainer = styled.section`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  @media screen and (min-width: 480px) {
    & {
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr;
    }
  }
`;

const AboutMeContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  flex: 1;
  height: 100vh;
  & > * {
    margin-bottom: 20px;
  }
`;

const IntroductionText = styled.p`
  color: ${(props) => props.theme.colors.text};
  font-size: ${(props) => props.theme.font.extraLarge};
`;
