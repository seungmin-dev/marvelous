import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { auth } from "../../firebase";
import type { Post } from "../types/type";
import { WrapperUI } from "../components/ui/wrapper";
import { useFetchPost } from "../commons/hooks/useFetchPost";
import { v4 as uuidv4 } from "uuid";

const PostWrapper = styled.div`
  box-sizing: border-box;
  padding: 10px 20px;
`;

export default function Hashtaging() {
  const location = useLocation();
  const [posts, setPosts] = useState<Post[]>([]);
  const user = auth.currentUser;
  const queryString = location.search;
  const { fetchPosts } = useFetchPost();

  useEffect(() => {
    fetchPosts(user?.uid as string).then((result) => setPosts(result));
  }, []);

  return (
    <WrapperUI title={queryString.slice(1, queryString.length)}>
      <PostWrapper>
        {posts.map((post) => (
          <div key={uuidv4()}>{post.post}</div>
        ))}
      </PostWrapper>
    </WrapperUI>
  );
}
