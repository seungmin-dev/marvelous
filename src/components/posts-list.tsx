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
import {
  faComment,
  faHeart,
  faBookmark,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { timeAgo } from "../commons/time-ago";
import type { Post } from "../types/type";

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
      });
    };
    fetchPosts();
    return () => {
      unsubscribe && unsubscribe();
    };
  }, []);
  return (
    <S.ListWrapper>
      {posts.map((post) => (
        <S.Post key={post.id}>
          <S.PostHeader>
            <S.PostProfileImg src={post.userphoto} />
            <S.PostUsername>{post.username}</S.PostUsername>
            <S.PostCreatedAt>{timeAgo(post.createdAt)}</S.PostCreatedAt>
          </S.PostHeader>
          <S.PostContent>{post.post}</S.PostContent>
          {post.photo ? (
            <S.PostImgWrapper length={post.photo && post.photo.length}>
              {post.photo &&
                post.photo.length > 0 &&
                post.photo.map((pic, i) => (
                  <S.PostImg
                    src={pic}
                    isEven={(i + 1) % 2 === 0}
                    isLast={post.photo.length === i + 1}
                  />
                ))}
            </S.PostImgWrapper>
          ) : null}
          <S.PostButtonWrapper>
            <S.Icon>
              <FontAwesomeIcon icon={faComment} />
            </S.Icon>
            <S.Icon>
              <FontAwesomeIcon icon={faHeart} />
            </S.Icon>
            <S.Icon>
              <FontAwesomeIcon icon={faBookmark} />
            </S.Icon>
            <S.Icon>
              <FontAwesomeIcon icon={faEllipsis} />
            </S.Icon>
          </S.PostButtonWrapper>
        </S.Post>
      ))}
    </S.ListWrapper>
  );
};
