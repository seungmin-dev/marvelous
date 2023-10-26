import {
  arrayRemove,
  arrayUnion,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import * as S from "../../styles/post-list.style";
import { auth, db } from "../../../firebase";
import { useNoti } from "../../commons/hooks/useNoti";
import { FirebaseError } from "firebase/app";
import { Modal } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { faBookmark as faBookmarkSolid } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useFetchPostInfo } from "../../commons/hooks/useFetchPostInfo";

interface BookmarkButtonProps {
  props: { postId: string; writerId: string; postContent: string[] };
}

export const BookmarkButton = ({ props }: BookmarkButtonProps) => {
  const user = auth.currentUser;
  const [bookmarked, setBookmarked] = useState(false);
  const { contextHolder, openNotification } = useNoti();
  const { fetchBookmarksOfUser } = useFetchPostInfo();

  const onClickBookmark =
    (bookmarkId: string, writerId: string, postContent: string[]) =>
    async () => {
      // UI상 북마크 아이콘 변경
      setBookmarked((prev) => !prev);

      try {
        // 유저 북마크 목록에 추가
        const userRef = doc(db, "bookmark", user?.uid as string);
        await setDoc(
          userRef,
          {
            bookmark: bookmarked
              ? arrayRemove(bookmarkId)
              : arrayUnion(bookmarkId),
          },
          { merge: true }
        );
        openNotification(bookmarked ? "북마크 해제" : "북마크 등록");

        // 글 작성자에게 알림 보내기(자기 글을 북마크할 시 알림 X)
        if (user?.uid === writerId) return;

        const writerRef = doc(db, "noti", `${user?.uid}-${writerId}-bookmark`);

        if (!bookmarked) {
          await setDoc(writerRef, {
            userId: writerId,
            sendId: user?.uid,
            sendName: user?.displayName,
            type: "bookmark",
            postId: bookmarkId,
            postContent: postContent.slice(0, 10),
            createdAt: Date.now(),
          });
        } else {
          await deleteDoc(writerRef);
        }
      } catch (error) {
        if (error instanceof FirebaseError)
          Modal.error({ content: "북마크에 실패했어요 😵‍💫" });
        setBookmarked((prev) => !prev);
      }
    };

  const fetching = (userBookmarkList: string[]) => {
    for (const i in userBookmarkList) {
      if (userBookmarkList[i] === props.postId) {
        setBookmarked(true);
      }
    }
  };

  useEffect(() => {
    fetchBookmarksOfUser().then((userBookmarkList) =>
      fetching(userBookmarkList)
    );
  }, [props.postId]);

  return (
    <S.Icon
      onClick={onClickBookmark(props.postId, props.writerId, props.postContent)}
    >
      {contextHolder}
      {bookmarked ? (
        <FontAwesomeIcon icon={faBookmarkSolid} />
      ) : (
        <FontAwesomeIcon icon={faBookmark} />
      )}
    </S.Icon>
  );
};
