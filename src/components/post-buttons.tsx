import * as S from "../styles/post-list.style";
import {
  faComment,
  faHeart,
  faBookmark,
} from "@fortawesome/free-regular-svg-icons";
import {
  faBookmark as faBookmarkSolid,
  faPenToSquare,
  faTrash,
  faHeart as faHeartSolid,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { auth, db } from "../../firebase";
import {
  arrayRemove,
  arrayUnion,
  deleteDoc,
  doc,
  increment,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useFetchPostInfo } from "./hooks/useFetchPostInfo";
import { FirebaseError } from "firebase/app";
import { Dropdown, Modal } from "antd";
import { useModal } from "./hooks/useModal";
import { ModalUI } from "./ui/modal-ui";
import { useNoti } from "./hooks/useNoti";
import { useNavigate } from "react-router-dom";

interface IPostButtonsProps {
  postId: string;
  heartedNum: number;
  commentNum?: number;
  writerId: string;
  writerName: string;
  postContent: string;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
  isComment?: boolean;
}

export const PostButtons = ({
  postId,
  heartedNum,
  commentNum,
  writerId,
  writerName,
  postContent,
  setEdit,
  isComment = false,
}: IPostButtonsProps) => {
  const user = auth.currentUser;
  const [commentsNum, setCommentsNum] = useState(0);
  const [bookmarked, setBookmarked] = useState(false);
  const [pickedId, setPickedId] = useState("");
  const [hearted, setHearted] = useState(false);
  const [heartNum, setHeartNum] = useState(0);

  const { fetchBookmarks, fetchHearts } = useFetchPostInfo();
  const { modalOpen, onClickOpenModal } = useModal();
  const { contextHolder, openNotification } = useNoti();
  const navigate = useNavigate();

  const fetching = (type: string, posts: string[]) => {
    for (const i in posts) {
      if (posts[i] === postId) {
        if (type === "bookmark") setBookmarked(true);
        else if (type === "heart") setHearted(true);
      }
    }
  };

  const onClickBookmark =
    (bookmarkId: string, writerId: string, postContent: string) => async () => {
      // UI상 북마크 아이콘 변경
      setBookmarked((prev) => !prev);

      try {
        // 유저 북마크 목록에 추가
        const userRef = doc(db, "users", user?.uid as string);
        await setDoc(
          userRef,
          {
            userId: user?.uid,
            username: user?.displayName,
            bookmarks: bookmarked
              ? arrayRemove(bookmarkId)
              : arrayUnion(bookmarkId),
          },
          { merge: true }
        );

        // 글 작성자에게 알림 보내기(자기 글을 북마크할 시 알림 X)
        if (user?.uid === writerId) return;

        const writerRef = doc(
          db,
          "alerts",
          `${bookmarkId}-${user?.uid}-bookmark`
        );

        if (!bookmarked) {
          await setDoc(writerRef, {
            userId: writerId,
            personId: user?.uid,
            personName: user?.displayName,
            type: "bookmark",
            content: postContent.slice(0, 10),
            createdAt: Date.now(),
          });
        } else {
          await deleteDoc(writerRef);
        }
        openNotification(bookmarked ? "북마크 해제" : "북마크 등록");
      } catch (error) {
        if (error instanceof FirebaseError)
          Modal.error({ content: "북마크에 실패했어요 😵‍💫" });
        setBookmarked((prev) => !prev);
      }
    };

  const onClickDelete = (postId: string) => async () => {
    try {
      let docRef = doc(db, "posts", postId);
      if (isComment) docRef = doc(db, "comments", postId);
      await deleteDoc(docRef);

      // 댓글 삭제 시
      if (isComment) {
        // 원글 댓글 수 감소
        await updateDoc(doc(db, "posts", postId.split("-")[0]), {
          commentNum: increment(-1),
        });
        // 알림 삭제
        await deleteDoc(doc(db, "alerts", postId));
        window.location.reload();
      }
    } catch (error) {
      if (error instanceof FirebaseError)
        Modal.error({ content: "글 삭제에 실패했어요 😥" });
    } finally {
      if (!isComment) openNotification("글 삭제");
    }
  };
  const onClickDelDocId = (postId: string) => () => {
    setPickedId(postId);
  };
  const onClickEdit = () => {
    setEdit(true);
  };
  const onClickHeart =
    (postId: string, heartNum: number, writerId: string, postContent: string) =>
    async () => {
      setHearted((prev) => !prev);

      try {
        // 유저 하트 목록에 추가
        const heartRef = doc(db, "users", user?.uid as string);
        await setDoc(
          heartRef,
          { heart: hearted ? arrayRemove(postId) : arrayUnion(postId) },
          { merge: true }
        );

        // 게시글에 하트 수 증감
        const docRef = doc(db, "posts", postId);
        await updateDoc(docRef, {
          heartedNum: hearted ? --heartNum : ++heartNum,
        });

        if (!hearted) setHeartNum((prev) => ++prev);
        else setHeartNum((prev) => --prev);

        openNotification(hearted ? "하트 해제" : "하트");

        // 글 작성자에게 알림
        if (user?.uid === writerId) return;

        const alertRef = doc(db, "alerts", `${postId}-${user?.uid}-heart`);
        if (!hearted) {
          await setDoc(alertRef, {
            userId: writerId,
            personId: user?.uid,
            personName: user?.displayName,
            type: "heart",
            content: postContent.slice(0, 10),
            createdAt: Date.now(),
          });
        } else {
          await deleteDoc(alertRef);
        }
      } catch (error) {
        if (error instanceof FirebaseError)
          Modal.error({ content: "하트에 실패했어요 😫" });
        setHearted((prev) => !prev);
      }
    };

  const onClickComment = () => {
    navigate("/comment", {
      state: {
        postId,
        writerId,
        writerName,
        originContent: postContent,
        commentNum,
      },
    });
  };

  const items = [
    {
      label: <span onClick={onClickEdit}>글 수정</span>,
      key: "1",
      icon: <FontAwesomeIcon icon={faPenToSquare} />,
    },
    {
      label: (
        <span onClick={onClickOpenModal} style={{ color: "#ef151e" }}>
          글 삭제
        </span>
      ),
      key: "2",
      icon: <FontAwesomeIcon icon={faTrash} style={{ color: "#ef151e" }} />,
    },
  ];

  useEffect(() => {
    fetchBookmarks().then((bookmarks) => fetching("bookmark", bookmarks));
    fetchHearts().then((heartedNum) => fetching("heart", heartedNum));

    // 원글일 때에만 댓글 수, 하트 수 설정
    if (!isComment) {
      setHeartNum(heartedNum);
      setCommentsNum(commentNum!);
    }
  }, []);

  return (
    <>
      {contextHolder}
      <S.PostButtonWrapper>
        {!isComment ? (
          <>
            <S.Icon onClick={onClickComment}>
              <FontAwesomeIcon icon={faComment} />
              <S.HeartNum>{commentsNum}</S.HeartNum>
            </S.Icon>

            <S.Icon
              onClick={onClickHeart(postId, heartNum, writerId, postContent)}
            >
              {hearted ? (
                <FontAwesomeIcon icon={faHeartSolid} />
              ) : (
                <FontAwesomeIcon icon={faHeart} />
              )}
              <S.HeartNum>{heartNum}</S.HeartNum>
            </S.Icon>
            <S.Icon onClick={onClickBookmark(postId, writerId, postContent)}>
              {bookmarked ? (
                <FontAwesomeIcon icon={faBookmarkSolid} />
              ) : (
                <FontAwesomeIcon icon={faBookmark} />
              )}
            </S.Icon>
          </>
        ) : (
          <>
            <div />
            <div />
            <div />
          </>
        )}
        {user?.uid === writerId ? (
          <Dropdown
            menu={{ items }}
            trigger={["click"]}
            placement="bottomRight"
          >
            <S.Icon onClick={onClickDelDocId(postId)}>
              <FontAwesomeIcon icon={faEllipsis} />
            </S.Icon>
          </Dropdown>
        ) : null}
        <ModalUI
          modalOpen={modalOpen}
          onOkFn={onClickDelete(pickedId)}
          onCancelFn={onClickOpenModal}
          title="글을 정말로 삭제할까요? 😲"
        />
      </S.PostButtonWrapper>
    </>
  );
};
