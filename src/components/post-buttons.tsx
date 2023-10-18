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
  collection,
  doc,
  getDocs,
  limit,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";

interface IPostButtonsProps {
  postId: string;
}

export const PostButtons = ({ postId }: IPostButtonsProps) => {
  const [tempBookmark, setTempBookmark] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const user = auth.currentUser;

  const fetchBookmarks = async () => {
    const bookmarksQuery = query(
      collection(db, "users"),
      where("userId", "==", user?.uid),
      limit(25)
    );
    const snapshot = await getDocs(bookmarksQuery);
    const bookmarkList = snapshot.docs.map((doc) => {
      const { bookmarks } = doc.data();
      return {
        bookmarks: bookmarks as string,
      };
    });
    return [...bookmarkList[0].bookmarks];
  };

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
