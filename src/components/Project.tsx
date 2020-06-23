import * as React from "react";
import styled from "styled-components";
import { darken } from "polished";
import { ProjectType } from "../../types/types";
import { Badge } from "./Badge";

type ProjectProps = {
  project: ProjectType;
};

export const Project: React.FC<ProjectProps> = ({ project }) => {
  return (
    <Card>
      <CardSection>
        <CardCatagory>{project.catagory}</CardCatagory>
        <CardTitle>{project.title}</CardTitle>
        <CardDescription>{project.description}</CardDescription>

        <div>
          {project?.source && <CardLink href={project.source}>Source</CardLink>}{" "}
          {project?.live && <CardLink href={project.live}>Link</CardLink>}
        </div>

        <CardTags>
          {project.tags.split(", ").map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </CardTags>
      </CardSection>
    </Card>
  );
};

const Card = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => darken(0.06, props.theme.colors.body)};
  padding: 1rem;
  margin: 1rem;
  &:hover {
    box-shadow: ${(props) =>
      props.theme.themeType === "light"
        ? "rgba(0, 0, 0, 0.12) 0px 6px 12px 0px"
        : "rgba(255,255, 255, 0.12) 0px 6px 12px 0px"};
  }
  transition: box-shadow 150ms ease-in-out 0s;
`;

const CardSection = styled.div`
  text-align: center;
  & > * {
    margin-bottom: 15px;
  }
`;

const CardTags = styled.div`
  & > span {
    margin: 4px;
  }
`;

const CardCatagory = styled.h2`
  font-size: ${(props) => props.theme.font.small};
  color: ${(props) => props.theme.colors.text};
`;

const CardTitle = styled.h1`
  font-size: ${(props) => props.theme.font.large};
  color: ${(props) => props.theme.colors.text};
`;

const CardDescription = styled.p`
  font-size: ${(props) => props.theme.font.mediumLarge};
  line-height: 1.5;
  color: ${(props) => props.theme.colors.text};
`;

const CardLink = styled.a`
  color: ${(props) => props.theme.colors.lovelyBlue};
`;
