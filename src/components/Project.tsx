import * as React from "react";
import styled from "styled-components";
import { darken, readableColor } from "polished";
type ProjectProps = {};

export const Project: React.FC<ProjectProps> = () => {
  return (
    <Card>
      <CardSection>
        <CardCatagory>CATEGORY</CardCatagory>
        <CardTitle>Raclette Blueberry Nextious Level</CardTitle>
        <CardDescription>
          Photo booth fam kinfolk cold-pressed sriracha leggings jianbing
          microdosing tousled waistcoat.
        </CardDescription>

        <CardLink href="#">Source</CardLink>
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
    margin-bottom: 10px;
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
  color: ${(props) => props.theme.colors.text};
`;

const CardLink = styled.a`
  color: ${(props) => props.theme.colors.lovelyBlue};
`;
