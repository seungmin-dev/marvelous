import { useEffect, useState } from "react";
import { useFetchPostById } from "../components/hooks/useFetchPostById";
import { WrapperUI } from "../components/ui/wrapper";
import { useLocation } from "react-router-dom";
import { Post } from "../types/type";
import { PostUI } from "../components/ui/post-ui";
import styled from "@emotion/styled";
import { Comment } from "./comment";

const PostWrapper = styled.div`
  width: 100%;
  min-height: 30vh;
  max-height: 90vh;
  padding: 10px 20px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  box-sizing: border-box;
  overflow-y: scroll;
`;

export default function Post() {
  const location = useLocation();
  const [post, setPost] = useState<Post>();
  const { fetchPostById } = useFetchPostById();

  useEffect(() => {
    fetchPostById(location.state.postId).then((result) => setPost(result));
  }, []);
  return (
    <WrapperUI title="Post">
      <PostWrapper>
        {post ? <PostUI post={post as Post} /> : null}
        <Comment />
      </PostWrapper>
    </WrapperUI>
  );
}
