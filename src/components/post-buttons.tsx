import * as S from "../styles/post-list.style";
import {
  faComment,
  faHeart,
  faBookmark,
} from "@fortawesome/free-regular-svg-icons";
import {
  faBookmark as faBookmarkSolid,
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
import { Dropdown } from "antd";
import { useModal } from "./hooks/useModal";
import { ModalUI } from "./ui/modal-ui";

interface IPostButtonsProps {
  postId: string;
  writerId: string;
  postContent: string;
}

export const PostButtons = ({
  postId,
  writerId,
  postContent,
}: IPostButtonsProps) => {
  const user = auth.currentUser;
  const { fetchBookmarks } = useFetchBookmarks();
  const [bookmarked, setBookmarked] = useState(false);
  const [deleteDocId, setDelDocId] = useState("");

  const { modalOpen, onClickOpenModal } = useModal();

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
    };

  const onClickDelete = (postId: string) => async () => {
    try {
      const docRef = doc(db, "posts", postId);
      await deleteDoc(docRef);
    } catch (error) {
      if (error instanceof FirebaseError) console.log(error);
    } finally {
      onClickOpenModal();
    }
  };
  const onClickDelDocId = (postId: string) => () => {
    setDelDocId(postId);
  };
  const items = [
    {
      label: <span onClick={onClickOpenModal}>글 삭제</span>,
      key: "1",
      icon: <FontAwesomeIcon icon={faTrash} />,
    },
  ];

  return (
    <>
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
          onOkFn={onClickDelete(deleteDocId)}
          onCancelFn={onClickOpenModal}
          title="글을 정말로 삭제할까요? 😲"
        />
      </S.PostButtonWrapper>
    </>
  );
};
