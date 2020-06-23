import * as React from "react";
import { Navitem, Button, Project, Badge, Post } from "../src/components";
import styled, { css } from "styled-components";
import { useRef } from "react";
import { calcOffset } from "../src/utils/calcOffset";
import dynamic from "next/dynamic";
import { GetStaticProps } from "next";
import * as fs from "fs";
import * as path from "path";
import { ProjectType, PostType } from "../types/types";
import matter from "gray-matter";

const Navbar = dynamic(
  // @ts-ignore
  () => import("../src/components").then((mods) => mods.Navbar),
  {
    ssr: false,
  }
);

type IndexProps = {
  projects: Array<ProjectType>;
  posts: Array<PostType>;
};

export const getStaticProps: GetStaticProps = async (context) => {
  const projects = JSON.parse(
    fs.readFileSync(
      path.join(process.cwd(), "./src/data/projects.json"),
      "utf8"
    )
  ) as Array<ProjectType>;

  const posts = fs
    .readdirSync(path.join(process.cwd(), "./src/data/blog"))
    .map((post) => {
      return {
        slug: post.replace(".md", ""),
        ...matter(
          fs.readFileSync(
            path.join(process.cwd(), `./src/data/blog/${post}`),
            "utf8"
          )
        ).data,
      };
    });

  return {
    props: {
      projects,
      posts,
    },
  };
};

const Index: React.SFC<IndexProps> = ({ projects, posts }) => {
  console.log(posts);
  const ProjectsRef = useRef(null);

  const scrollToProjects = () => {
    if (ProjectsRef.current) {
      window.scrollTo(0, calcOffset(ProjectsRef.current) - 150);
    }
  };

  return (
    <>
      <AboutMeContainer>
        <IntroductionText>Hi! 👋, I'm Ovadia </IntroductionText>
        <IntroductionText>I'm a Fullstack Software Engineer.</IntroductionText>
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
      <Projects>
        <Headline>Projects</Headline>
        <ProjectsContainer
          numberOfProjects={projects.length}
          ref={ProjectsRef}
          id="projects"
        >
          {projects.length !== 0 &&
            projects.map((project, index) => {
              return <Project project={project} key={index}></Project>;
            })}
        </ProjectsContainer>
      </Projects>
      <Blog>
        <Headline>Blog</Headline>
        <BlogContainer>
          {posts.length !== 0 &&
            posts.map((post, index) => {
              return <Post post={post} key={index} />;
            })}
        </BlogContainer>
      </Blog>
    </>
  );
};

export default Index;

const BlogContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
`;

const Blog = styled.section`
  margin-top: 50px;
`;

const Projects = styled.section`
  margin-top: 50px;
`;
const Headline = styled.h2`
  margin: 20px 0;
  text-align: center;
`;
const ProjectsContainer = styled.div<{ numberOfProjects: number }>`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  @media screen and (min-width: 768px) {
    & {
      grid-template-columns: 1fr 1fr;
      grid-template-rows: auto;
    }
    ${(props) =>
      props.numberOfProjects === 5 &&
      css`
        & > :nth-of-type(3) {
          grid-row: 2;
          grid-column: 1 / 3;
        }
      `}
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
