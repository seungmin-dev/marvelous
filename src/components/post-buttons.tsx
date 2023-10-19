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
import { arrayRemove, arrayUnion, doc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useFetchBookmarks } from "./hooks/useFetchBookmarks";

interface IPostButtonsProps {
  postId: string;
}

export const PostButtons = ({ postId }: IPostButtonsProps) => {
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

  const onClickBookmark = (bookmarkId: string) => async () => {
    setBookmarked((prev) => !prev);

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
  };

  return (
    <S.PostButtonWrapper>
      <S.Icon>
        <FontAwesomeIcon icon={faComment} />
      </S.Icon>
      <S.Icon>
        <FontAwesomeIcon icon={faHeart} />
      </S.Icon>
      <S.Icon onClick={onClickBookmark(postId)}>
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
