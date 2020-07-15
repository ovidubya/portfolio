import * as React from "react";
import * as fs from "fs";
import * as path from "path";
import ReactMarkdown from "react-markdown";
import { GetStaticPaths, GetStaticProps } from "next";
import matter from "gray-matter";
import { rendererEngine } from "../../src/utils/blogRenderer";
import styled, { useTheme } from "styled-components";
import { Navbar, Button } from "../../src/components";

export interface BlogProps {
  slug: string;
}

const Blog: React.SFC<BlogProps> = ({ slug }) => {
  const theme = useTheme();
  return (
    <>
      <BlogContainer>
        <Button
          onClick={() => (location.href = "/")}
          backgroundColor={theme.colors.pumpkin}
        >
          Go back
        </Button>
        <ReactMarkdown
          escapeHtml={false}
          renderers={rendererEngine}
          source={slug}
        />
      </BlogContainer>
    </>
  );
};

const BlogContainer = styled.section`
  margin: 80px 20px;
  max-width: 680px;
  ${Button} {
    margin-bottom: 10px;
  }
  @media screen and (min-width: 768px) {
    margin: 80px auto;
  }
`;

const StyledLink = styled.a`
  color: ${(props) => props.theme.colors.text};
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
