import { useEffect, useState } from "react";
import { WrapperUI } from "../components/ui/wrapper";
import { useLocation } from "react-router-dom";
import { Post } from "../types/type";
import { PostUI } from "../components/ui/post-ui";
import styled from "@emotion/styled";
import { Comment } from "./comment";
import { useFetchPost } from "../commons/hooks/useFetchPost";
import { v4 as uuidv4 } from "uuid";
import { BlankUI } from "../components/ui/blank";

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
  const [error, setError] = useState(false);
  const { fetchPostById } = useFetchPost();

  useEffect(() => {
    fetchPostById(location.state.postId).then((result) => {
      if (result.content === undefined) {
        setError(true);
        return;
      }
      setPost(result);
    });
  }, [location]);

  return (
    <WrapperUI title="Post">
      {!error ? (
        <PostWrapper>
          {post ? <PostUI key={uuidv4()} post={post as Post} /> : null}
          <Comment />
        </PostWrapper>
      ) : (
        <BlankUI text="해당하는 글" />
      )}
    </WrapperUI>
  );
}
