import * as React from "react";
import styled from "styled-components";
import { PostType } from "../../types/types";

interface PostProps extends React.HTMLAttributes<HTMLDivElement> {
  post: PostType;
}

export const Post: React.FC<PostProps> = ({ post }) => {
  return (
    <PostStyled>
      <PostCategory>
        <div>{post.category}</div>
        <div>{post.date}</div>
      </PostCategory>
      <PostDescription>
        <PostTitle>{post.title}</PostTitle>

        <PostDescriptionText>{post.description}</PostDescriptionText>

        <PostLink
          onClick={(e) => {
            if (window.gaa) {
              window.gaa("blog", "click", post.title);
            }
          }}
          href={`/blog/${post.slug}`}
        >
          Read more
        </PostLink>
      </PostDescription>
    </PostStyled>
  );
};

const PostTitle = styled.h2``;
const PostDescriptionText = styled.p``;
const PostLink = styled.a`
  color: ${(props) => props.theme.colors.text};
`;

const PostStyled = styled.div`
  display: flex;
  flex-direction: column;
  /* border-bottom: 1px solid #666; */
  margin: 20px;
  padding-bottom: 20px;

  @media screen and (min-width: 768px) {
    flex-direction: row;
  }
`;

const PostCategory = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  @media screen and (min-width: 768px) {
    flex: 1;
  }
`;
const PostDescription = styled.div`
  display: flex;
  flex-direction: column;
  & > * {
    margin-bottom: 15px;
  }
  @media screen and (min-width: 768px) {
    flex: 3;
  }
`;
