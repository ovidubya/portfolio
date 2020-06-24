import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Raleway', sans-serif;
  }
  html {
    scroll-behavior: smooth;

  }
  body {
    background: ${(props) => props.theme.colors.body};
    color: ${(props) => props.theme.colors.text};
    transition: background 0.25s linear;
  }
  a {
    text-decoration: none;
  }
  
  code {
    font-family: Consolas,Monaco,Lucida Console,Liberation Mono,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New!important;
  }
  p {
    font-family: 'PT Serif', serif;
  }
`;
