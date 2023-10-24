import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import type { Post } from "../types/type";
import { WrapperUI } from "../components/ui/wrapper";
import { useFetchPost } from "../commons/hooks/useFetchPost";
import { v4 as uuidv4 } from "uuid";
import { PostUI } from "../components/ui/post-ui";
import { BlankUI } from "../components/ui/blank";

const PostWrapper = styled.div`
  box-sizing: border-box;
  padding: 10px 20px;
`;
const PostNum = styled.p`
  color: #bdbdbd;
  text-align: right;
`;

export default function Hashtaging() {
  const location = useLocation();
  const [posts, setPosts] = useState<Post[]>([]);
  const queryString = location.search;
  const { fetchPostsByHashtag } = useFetchPost();

  useEffect(() => {
    fetchPostsByHashtag(`#${queryString.slice(1, queryString.length)}`).then(
      (result) => setPosts(result)
    );
  }, [queryString]);

  return (
    <WrapperUI title={queryString.slice(1, queryString.length)}>
      {posts.length > 0 ? (
        <PostWrapper>
          <PostNum>총 {posts.length} 건</PostNum>
          {posts.map((post) => (
            <PostUI key={uuidv4()} post={post} />
          ))}
        </PostWrapper>
      ) : (
        <BlankUI text="이 해시태그로 작성된 글" />
      )}
    </WrapperUI>
  );
}
