import * as S from "../styles/post-list.style";
import { useEffect, useState } from "react";
import { useNoti } from "../commons/hooks/useNoti";
import { HeartButton } from "./buttons/heart-button";
import { CommentButton } from "./buttons/comment-button";
import { BookmarkButton } from "./buttons/bookmark-button";
import { MenuButton } from "./buttons/menu-button";
import { Post } from "../types/type";

interface IPostButtonsProps {
  post: Post;
  setEditPostId: React.Dispatch<React.SetStateAction<string>>;
  isComment: boolean;
  originPostId?: string;
  isSearch?: boolean;
}

export const PostButtons = ({
  post,
  setEditPostId,
  isComment = false,
  originPostId,
  isSearch = false,
}: IPostButtonsProps) => {
  const [propsObj, setPropsObj] = useState({
    postId: "",
    writerId: "",
    postContent: [""],
  });

  const { contextHolder } = useNoti();

  useEffect(() => {
    if (post)
      setPropsObj({
        postId: post.id,
        writerId: post.userId,
        postContent: post.content,
      });
  }, []);

  return (
    <>
      {contextHolder}
      {!isSearch ? (
        <S.PostButtonWrapper>
          <>
            <CommentButton props={propsObj} />
            <HeartButton props={propsObj} />
            <BookmarkButton props={propsObj} />
            <MenuButton
              isComment={isComment}
              props={propsObj}
              setEditPostId={setEditPostId}
              photoLeng={post ? post.photoLeng : 0}
              originPostId={originPostId}
            />
          </>
        </S.PostButtonWrapper>
      ) : null}
    </>
  );
};
