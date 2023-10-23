import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { auth, db } from "../../firebase";
import { Link, useLocation } from "react-router-dom";
import * as S from "../styles/comment.style";
import { Post } from "../types/type";
import { useFollow } from "../components/hooks/useFollow";
import { ButtonUI2 } from "../components/ui/button-ui-2";
import { timeAgo } from "../commons/time-ago";
import { PostButtons } from "../components/post-buttons";
import { useNoti } from "../components/hooks/useNoti";
import { FirebaseError } from "firebase/app";
import { Modal } from "antd";

interface Comment extends Post {
  postId: string;
  writerId: string;
  writerName: string;
}

export const Comment = () => {
  const user = auth.currentUser;
  const location = useLocation();
  const { contextHolder, openNotification } = useNoti();
  const { following, onClickFollow } = useFollow();

  const [comments, setComments] = useState<Comment[]>([]);
  const [edit, setEdit] = useState(false);
  const [originContent, setOriginContent] = useState("");
  const [edittedContent, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const onChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.currentTarget.value);
  };

  const fetchComments = async () => {
    const commentQuery = query(
      collection(db, "comments"),
      where("postId", "==", location.state.postId)
    );
    const snapshot = await getDocs(commentQuery);
    const comments = snapshot.docs.map((doc) => {
      const {
        postId,
        writerId,
        writerName,
        commentWriterId,
        commentWriterName,
        commentWriterPhoto,
        comment,
        photo,
        heartedNum,
        commentNum,
        createdAt,
      } = doc.data();

      return {
        postId,
        writerId,
        writerName,
        userId: commentWriterId,
        username: commentWriterName,
        userphoto: commentWriterPhoto,
        post: comment,
        photo,
        heartedNum,
        commentNum,
        createdAt,
        id: doc.id,
      };
    });
    setComments(comments);
  };
  const onSubmitEdit = (commentId: string) => async () => {
    if (textareaRef.current?.value === "") return;
    setLoading(true);
    try {
      const docRef = doc(db, "comments", commentId);
      await updateDoc(docRef, { comment: edittedContent });

      openNotification("글 수정");
      fetchComments();
    } catch (error) {
      if (error instanceof FirebaseError)
        Modal.error({ content: "글 수정에 실패했어요 🤥" });
    } finally {
      setLoading(false);
      setEdit(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  useEffect(() => {
    setOriginContent(textareaRef.current?.value as string);
  }, [edit]);

  return (
    <S.CommentWrapper>
      {contextHolder}
      {comments.map((comment) => (
        <S.CommentBox key={comment.id}>
          <S.PostHeader>
            <S.PostProfileImg src={comment.userphoto} />
            <Link
              to={
                comment.userId === user?.uid
                  ? "/profile"
                  : `/user-profile?${comment.userId}`
              }
            >
              <S.PostUsername myDoc={user?.uid === comment.userId}>
                {comment.username}
              </S.PostUsername>
            </Link>
            {user?.uid !== comment.userId ? (
              <S.ButtonWrapper myDoc={user?.uid === comment.userId}>
                <S.Button onClick={onClickFollow(comment.userId)}>
                  {following ? "언팔로우" : "팔로우"}
                </S.Button>
              </S.ButtonWrapper>
            ) : null}
            {edit ? (
              <ButtonUI2
                text={loading ? "Loading" : "Save"}
                type="button"
                onComplete={
                  edittedContent !== "" || originContent === edittedContent
                }
                onClick={onSubmitEdit(comment.id)}
              />
            ) : (
              <S.PostCreatedAt>{timeAgo(comment.createdAt)}</S.PostCreatedAt>
            )}
          </S.PostHeader>
          {!edit ? (
            <S.CommentPost>
              <b>@{comment.writerName} </b>
              {comment.post}
            </S.CommentPost>
          ) : (
            <S.Textarea
              defaultValue={comment.post}
              onChange={onChangeText}
              ref={textareaRef}
            />
          )}
          {comment.photo ? (
            <S.PostImgWrapper length={comment.photo && comment.photo.length}>
              {comment.photo &&
                comment.photo.length > 0 &&
                comment.photo.map((pic, i) => (
                  <S.PostImg
                    src={pic}
                    isEven={(i + 1) % 2 === 0}
                    isLast={comment.photo.length === i + 1}
                  />
                ))}
            </S.PostImgWrapper>
          ) : null}
          {!edit ? (
            <PostButtons
              postId={comment.id}
              heartedNum={comment.heartedNum ? comment.heartedNum : 0}
              writerId={comment.userId}
              writerName={comment.username}
              postContent={comment.post}
              setEdit={setEdit}
              isComment={true}
            />
          ) : null}
        </S.CommentBox>
      ))}
    </S.CommentWrapper>
  );
};
