import styled, { useTheme } from "styled-components";
import SyntaxHighlighter from "react-syntax-highlighter";
import { vs2015, xcode } from "react-syntax-highlighter/dist/cjs/styles/hljs";

export const rendererEngine = {
  image: function (props) {
    return <StyledImage {...props}></StyledImage>;
  },
  heading: function ({ children, ...props }) {
    switch (props.level) {
      case 1:
        return <HeaderOne {...props}>{children}</HeaderOne>;
      case 2:
        return <h2 {...props}>{children}</h2>;
      case 3:
        return <h3 {...props}>{children}</h3>;
      case 4:
        return <h4 {...props}>{children}</h4>;
      case 5:
        return <h5 {...props}>{children}</h5>;
      case 6:
        return <h6 {...props}>{children}</h6>;
      default:
        throw "unable to render markdown";
    }
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
    console.log("count");
    return <StyledBlockquote {...props}>{children}</StyledBlockquote>;
  },
  paragraph: function ({ children, ...props }) {
    return <StyledParagraph {...props}>{children}</StyledParagraph>;
  },
  code: function ({ language, value }) {
    console.log(language);
    const theme = useTheme();
    return (
      <StyledSyntaxHighlighter
        style={theme.themeType === "dark" ? xcode : vs2015}
        language={language}
      >
        {value}
      </StyledSyntaxHighlighter>
    );
  },
  inlineCode: function ({ children }) {
    return <StyledCode>{children}</StyledCode>;
  },
};

const StyledCode = styled.code`
  padding: 0.2em 0.4em;
  margin: 0;
  font-size: 85%;
  background-color: rgba(27, 31, 35, 0.05);
  border-radius: 6px;
`;

const HeaderOne = styled.h1`
  font-size: 2rem;
  font-family: "PT Serif", serif;
  font-weight: bold;
  border-bottom: 1px solid #ccc;
  margin: 20px 0;
`;
const StyledSyntaxHighlighter = styled(SyntaxHighlighter)`
  margin: 25px 0;
  font-size: ${(props) => props.theme.font.small};
  @media screen and (min-width: 768px) {
    font-size: ${(props) => props.theme.font.small};
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
