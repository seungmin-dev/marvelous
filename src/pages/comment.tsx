import {
  Unsubscribe,
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { useLocation } from "react-router-dom";
import * as S from "../styles/comment.style";
import { Post } from "../types/type";
import { useNoti } from "../commons/hooks/useNoti";
import { PostUI } from "../components/ui/post-ui";

export const Comment = () => {
  const location = useLocation();
  const { contextHolder } = useNoti();

  const [comments, setComments] = useState<Post[]>([]);

  useEffect(() => {
    let unsubscribe: Unsubscribe | null = null;
    const fetchPosts = async (): Promise<void> => {
      const commentQuery = query(
        collection(db, "posts"),
        where("originPostId", "==", location.state.postId),
        orderBy("createdAt", "desc")
      );
      unsubscribe = await onSnapshot(commentQuery, (snapshot) => {
        const comments = snapshot.docs.map((doc) => {
          const {
            userId,
            content,
            photo,
            photoLeng,
            heartNum,
            commentNum,
            isComment,
            originPostId,
            originPostContent,
            isEditted,
            createdAt,
            updatedAt,
          } = doc.data();
          return {
            userId,
            content,
            photo,
            photoLeng,
            heartNum,
            commentNum,
            isComment,
            originPostId,
            originPostContent,
            isEditted,
            createdAt,
            updatedAt,
            id: doc.id,
          };
        });
        setComments(comments);
      });
    };
    fetchPosts();
    return () => {
      unsubscribe && unsubscribe();
    };
  }, []);

  return (
    <S.CommentWrapper>
      {contextHolder}
      {comments.map((comment) => (
        <PostUI post={comment} />
      ))}
    </S.CommentWrapper>
  );
};
