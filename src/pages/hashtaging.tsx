import styled from "@emotion/styled";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { auth, db } from "../../firebase";
import type { Post } from "../types/type";

const Wrapper = styled.div`
  /* width: 100%;
  max-width: 800px;
  height: 100%;
  padding: 20px;
  margin: 0 auto; */
  width: 100%;
  height: 100vh;
  padding: 0 20px;
`;
const Title = styled.h2`
  font-size: 30px;
`;
const PostWrapper = styled.div``;

export default function Hashtaging() {
  const location = useLocation();
  const [posts, setPosts] = useState<Post[]>([]);
  const user = auth.currentUser;
  const queryString = location.search;

  const fetchPosts = async () => {
    const tweetQuery = query(
      collection(db, "posts"),
      where("userId", "==", user?.uid),
      orderBy("createdAt", "desc"),
      limit(25)
    );
    const snapshot = await getDocs(tweetQuery);
    const posts = snapshot.docs.map((doc) => {
      const { post, photo, createdAt, userId, username, userphoto } =
        doc.data();
      return {
        post,
        photo,
        createdAt,
        userId,
        username,
        userphoto,
        id: doc.id,
      };
    });
    setPosts(posts);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <Wrapper>
      <Title>{queryString.slice(1, queryString.length)}</Title>
      <PostWrapper>
        {posts.map((post) => (
          <div key={post.id}>{post.post}</div>
        ))}
      </PostWrapper>
    </Wrapper>
  );
}
