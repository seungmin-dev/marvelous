import * as S from "../styles/post-list.style";
import {
  Unsubscribe,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useEffect, useState } from "react";
import type { Post } from "../types/type";
import { PostUI } from "./ui/post";
import { BlankUI } from "./ui/blank";

export const PostList = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    let unsubscribe: Unsubscribe | null = null;
    const fetchPosts = async (): Promise<void> => {
      const postsQuery = query(
        collection(db, "posts"),
        orderBy("createdAt", "desc")
      );
      unsubscribe = await onSnapshot(postsQuery, (snapshot) => {
        const posts = snapshot.docs.map((doc) => {
          const {
            post,
            photo,
            createdAt,
            userId,
            username,
            userphoto,
            heartedNum,
          } = doc.data();

          return {
            post,
            photo,
            createdAt,
            userId,
            username,
            userphoto,
            heartedNum,
            id: doc.id,
          };
        });
        setPosts(posts);
      });
    };
    fetchPosts();
    return () => {
      unsubscribe && unsubscribe();
    };
  }, []);
  return (
    <S.ListWrapper>
      {posts && posts.length > 0 ? (
        posts.map((post) => <PostUI post={post} />)
      ) : (
        <BlankUI text="작성된 글" />
      )}
    </S.ListWrapper>
  );
};
