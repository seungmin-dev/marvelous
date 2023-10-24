import * as S from "../styles/post-list.style";
import { useEffect, useState } from "react";
import { useNoti } from "./hooks/useNoti";
import { HeartButton } from "./buttons/heart-button";
import { CommentButton } from "./buttons/comment-button";
import { BookmarkButton } from "./buttons/bookmark-button";
import { MenuButton } from "./buttons/menu-button";
import { Post } from "../types/type";

interface IPostButtonsProps {
  post: Post;
  setEditPostId: React.Dispatch<React.SetStateAction<string>>;
  isComment?: boolean;
}

export const PostButtons = ({
  post,
  setEditPostId,
  isComment = false,
}: IPostButtonsProps) => {
  const [propsObj, setPropsObj] = useState({
    postId: "",
    writerId: "",
    writerName: "",
    postContent: "",
  });

  const { contextHolder } = useNoti();

  useEffect(() => {
    if (post)
      setPropsObj({
        postId: post.id,
        writerId: post.userId,
        writerName: post.username,
        postContent: post.post,
      });
  }, []);

  return (
    <>
      {contextHolder}
      <S.PostButtonWrapper>
        {!isComment ? (
          <>
            <CommentButton props={propsObj} />
            <HeartButton props={propsObj} />
            <BookmarkButton props={propsObj} />
          </>
        ) : (
          <>
            <div />
            <div />
            <div />
          </>
        )}
        <MenuButton
          isComment={isComment}
          props={propsObj}
          setEditPostId={setEditPostId}
          photoLeng={post ? post.photoLeng : 0}
        />
      </S.PostButtonWrapper>
    </>
  );
};
