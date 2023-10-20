import * as S from "../styles/post-list.style";
import {
  faComment,
  faHeart,
  faBookmark,
} from "@fortawesome/free-regular-svg-icons";
import { faBookmark as faBookmarkSolid } from "@fortawesome/free-solid-svg-icons";
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
  const { fetchBookmarks } = useFetchBookmarks();
  const [bookmarked, setBookmarked] = useState(false);

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
      const user = auth.currentUser;
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

  return (
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
      <S.Icon>
        <FontAwesomeIcon icon={faEllipsis} />
      </S.Icon>
    </S.PostButtonWrapper>
  );
};
