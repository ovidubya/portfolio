import * as React from "react";
import * as fs from "fs";
import * as path from "path";
import ReactMarkdown from "react-markdown";
import { GetStaticPaths, GetStaticProps } from "next";
import SyntaxHighlighter from "react-syntax-highlighter";
import {
  atomOneLight,
  atomOneDark,
} from "react-syntax-highlighter/dist/cjs/styles/hljs";
import styled, { useTheme } from "styled-components";
import matter from "gray-matter";

export interface BlogProps {
  slug: string;
}

const Blog: React.SFC<BlogProps> = ({ slug }) => {
  const theme = useTheme();

  return (
    <ReactMarkdown
      renderers={{
        paragraph: function ({ children }) {
          return <StyledParagraph>{children}</StyledParagraph>;
        },
        code: function ({ language, value }) {
          return (
            <SyntaxHighlighter
              style={theme.themeType === "dark" ? atomOneLight : atomOneDark}
              language={language}
            >
              {value}
            </SyntaxHighlighter>
          );
        },
      }}
      source={slug}
    />
  );
};

const StyledParagraph = styled.p`
  font-size: ${(props) => props.theme.font.large};
  margin: 1rem 0;
`;

export const getStaticPaths: GetStaticPaths = async () => {
  const dir = fs.readdirSync(path.join(process.cwd(), "./src/data/blog"));

  return {
    paths: dir.map((file) => {
      return {
        params: {
          slug: file.replace(".md", ""),
        },
      };
    }),
    fallback: false,
  };
};

// @ts-ignore
export const getStaticProps: GetStaticProps = async ({ params: { slug } }) => {
  let post = fs.readFileSync(
    path.join(process.cwd(), `./src/data/blog/${slug}.md`),
    "utf8"
  );

  return {
    props: {
      slug: matter(post).content,
    },
  };
};

export default Blog;
