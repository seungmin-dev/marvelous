import * as S from "../../styles/post-list.style";
import { timeAgo } from "../../commons/time-ago";
import { PostButtons } from "../post-buttons";
import type { Post } from "../../types/type";
import { useEffect, useRef, useState } from "react";
import { ButtonUI2 } from "./button-ui-2";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../../firebase";
import { FirebaseError } from "firebase/app";
import { Modal } from "antd";
import { useNoti } from "../../commons/hooks/useNoti";
import { useFollow } from "../../commons/hooks/useFollow";
import { Link, useNavigate } from "react-router-dom";

interface IPostUI {
  post: Post;
  isObject?: boolean;
}

export const PostUI = ({ post, isObject }: IPostUI) => {
  const user = auth.currentUser;
  const navigate = useNavigate();

  const [editPostId, setEditPostId] = useState("");
  const [originContent, setOriginContent] = useState("");
  const [edittedContent, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const onChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.currentTarget.value);
  };
  const { contextHolder, openNotification } = useNoti();
  const { following, fetchFollowYn, onClickFollow } = useFollow();

  const onSubmitEdit = (postId: string) => async () => {
    if (textareaRef.current?.value === "") return;
    setLoading(true);
    try {
      const docRef = doc(db, "posts", postId);
      await updateDoc(docRef, { post: textareaRef.current?.value });

      openNotification("글 수정");
    } catch (error) {
      if (error instanceof FirebaseError)
        Modal.error({ content: "글 수정에 실패했어요 🤥" });
    } finally {
      setLoading(false);
      setEditPostId("");
    }
  };

  const onClickPost = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;
    navigate("/post", { state: { postId: post.id } });
  };

  useEffect(() => {
    setOriginContent(textareaRef.current?.value as string);
  }, [editPostId]);

  useEffect(() => {
    if (post.userId !== user?.uid) fetchFollowYn(post.userId);
  }, []);

  return (
    <S.Post key={post.id} onClick={onClickPost}>
      {contextHolder}
      <S.PostHeader>
        <S.PostProfileImg src={post.userphoto} />
        <S.PostUsername myDoc={user?.uid === post.userId}>
          <Link
            to={
              post.userId === user?.uid
                ? "/profile"
                : `/user-profile?${post.userId}`
            }
          >
            {post.username}
          </Link>
        </S.PostUsername>
        {!isObject && user?.uid !== post.userId ? (
          <S.ButtonWrapper myDoc={user?.uid === post.userId}>
            <S.Button onClick={onClickFollow(post.userId)}>
              {following ? "언팔로우" : "팔로우"}
            </S.Button>
          </S.ButtonWrapper>
        ) : null}
        {editPostId === post.id ? (
          <ButtonUI2
            text={loading ? "Loading" : "Save"}
            type="button"
            onComplete={
              edittedContent !== "" || originContent === edittedContent
            }
            onClick={onSubmitEdit(post.id)}
          />
        ) : (
          <S.PostCreatedAt>{timeAgo(post.createdAt)}</S.PostCreatedAt>
        )}
      </S.PostHeader>
      {editPostId !== post.id ? (
        <S.PostContent>{post.post.join(" ")}</S.PostContent>
      ) : (
        <S.Textarea
          defaultValue={post.post}
          onChange={onChangeText}
          ref={textareaRef}
        />
      )}
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
      {editPostId !== post.id ? (
        <PostButtons post={post} setEditPostId={setEditPostId} />
      ) : null}
    </S.Post>
  );
};
