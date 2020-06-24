import styled, { useTheme } from "styled-components";
import SyntaxHighlighter from "react-syntax-highlighter";
import {
  atomOneLight,
  atomOneDark,
  monokaiSublime,
} from "react-syntax-highlighter/dist/cjs/styles/hljs";

export const rendererEngine = {
  image: function (props) {
    return <StyledImage {...props}></StyledImage>;
  },
  link: function ({ children, ...props }) {
    return (
      <StyledLink target="_blank" {...props}>
        {children}
      </StyledLink>
    );
  },
  list: function ({ children, ...props }) {
    if (props.ordered) {
      return <StyledOrderdList {...props}>{children}</StyledOrderdList>;
    } else {
      return <StyledUnorderList {...props}>{children}</StyledUnorderList>;
    }
  },
  blockquote: function ({ children, ...props }) {
    return <StyledBlockquote {...props}>{children}</StyledBlockquote>;
  },
  paragraph: function ({ children, ...props }) {
    return <StyledParagraph {...props}>{children}</StyledParagraph>;
  },
  code: function ({ language, value }) {
    const theme = useTheme();
    return (
      <StyledSyntaxHighlighter
        style={theme.themeType === "dark" ? atomOneLight : monokaiSublime}
        language={language}
      >
        {value}
      </StyledSyntaxHighlighter>
    );
  },
};

const StyledSyntaxHighlighter = styled(SyntaxHighlighter)`
  margin: 25px 0;
  font-size: ${(props) => props.theme.font.small};
  @media screen and (min-width: 768px) {
    font-size: ${(props) => props.theme.font.medium};
  }
`;

const StyledImage = styled.img`
  margin: 55px auto;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  @media screen and (min-width: 768px) {
    width: 70%;
  }
`;

const StyledLink = styled.a`
  color: ${(props) => props.theme.colors.lovelyBlue};
`;

const StyledUnorderList = styled.ul`
  padding-left: 1.2em;
  font-size: ${(props) => props.theme.font.large};
  margin-bottom: 50px;
`;

const StyledOrderdList = styled.ol`
  padding-left: 1.2em;
  font-size: ${(props) => props.theme.font.large};
  margin-bottom: 50px;
`;

const StyledParagraph = styled.p`
  font-size: ${(props) => props.theme.font.large};
  margin: 2rem 0;
`;

const StyledBlockquote = styled.blockquote`
  font-size: 1rem;
  color: #999;
  border-left: 0.2rem solid
    ${(props) => (props.theme.themeType === "dark" ? "#dfe2e5" : "white")};
  margin: 1rem 0;
  padding: 0.25rem 0 0.25rem 1rem;
`;
