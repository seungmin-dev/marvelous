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
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { auth, db } from "../../firebase";
import {
  arrayRemove,
  arrayUnion,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useFetchBookmarks } from "./hooks/useFetchBookmarks";
import { FirebaseError } from "firebase/app";
import { Dropdown, Modal } from "antd";
import { useModal } from "./hooks/useModal";
import { ModalUI } from "./ui/modal-ui";
import { useNoti } from "./hooks/useNoti";

interface IPostButtonsProps {
  postId: string;
  writerId: string;
  postContent: string;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PostButtons = ({
  postId,
  writerId,
  postContent,
  setEdit,
}: IPostButtonsProps) => {
  const user = auth.currentUser;
  const { fetchBookmarks } = useFetchBookmarks();
  const [bookmarked, setBookmarked] = useState(false);
  const [pickedId, setPickedId] = useState("");

  const { modalOpen, onClickOpenModal } = useModal();
  const { contextHolder, openNotification } = useNoti();

  const fetching = (bookmarks: string[]) => {
    for (const i in bookmarks) {
      if (bookmarks[i] === postId) {
        setBookmarked(true);
      }
    }
  };

  useEffect(() => {
    fetchBookmarks().then((bookmarks) => fetching(bookmarks));
  }, []);

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

        const writerRef = doc(db, "alerts", `${user?.uid}-${bookmarkId}`);

        if (!bookmarked) {
          await setDoc(doc(db, "alerts", `${user?.uid}-${bookmarkId}`), {
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
      } catch (error) {
        if (error instanceof FirebaseError)
          Modal.error({ content: "북마크에 실패했어요 😵‍💫" });
        setBookmarked((prev) => !prev);
      } finally {
        openNotification(bookmarked ? "북마크 해제" : "북마크 등록");
      }
    };

  const onClickDelete = (postId: string) => async () => {
    try {
      const docRef = doc(db, "posts", postId);
      await deleteDoc(docRef);
    } catch (error) {
      if (error instanceof FirebaseError)
        Modal.error({ content: "글 삭제에 실패했어요 😥" });
    } finally {
      onClickOpenModal();
      openNotification("글 삭제");
    }
  };
  const onClickDelDocId = (postId: string) => () => {
    setPickedId(postId);
  };
  const onClickEdit = () => {
    setEdit(true);
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

  return (
    <>
      {contextHolder}
      <S.PostButtonWrapper>
        <S.Icon>
          <FontAwesomeIcon icon={faComment} />
        </S.Icon>
        <S.Icon>
          <FontAwesomeIcon icon={faHeart} />
        </S.Icon>
        <S.Icon onClick={onClickBookmark(postId, writerId, postContent)}>
          {bookmarked ? (
            <FontAwesomeIcon icon={faBookmarkSolid} />
          ) : (
            <FontAwesomeIcon icon={faBookmark} />
          )}
        </S.Icon>
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
