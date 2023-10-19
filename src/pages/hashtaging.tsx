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
import { WrapperUI } from "../components/ui/wrapper";

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
    <WrapperUI title={queryString.slice(1, queryString.length)}>
      <PostWrapper>
        {posts.map((post) => (
          <div key={post.id}>{post.post}</div>
        ))}
      </PostWrapper>
    </WrapperUI>
  );
}
