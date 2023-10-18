import * as S from "./styles/post-list.style";
import {
  faComment,
  faHeart,
  faBookmark,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { auth, db } from "../firebase";
import { arrayUnion, doc, setDoc } from "firebase/firestore";

interface IPostButtonsProps {
  id: string;
}

export const PostButtons = ({ id }: IPostButtonsProps) => {
  const onClickBookmark = (bookmarkId: string) => async () => {
    const user = auth.currentUser;
    const userRef = doc(db, "users", user?.uid as string);
    await setDoc(
      userRef,
      {
        userId: user?.uid,
        username: user?.displayName,
        bookmarks: arrayUnion(bookmarkId),
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
      <S.Icon onClick={onClickBookmark(id)}>
        <FontAwesomeIcon icon={faBookmark} />
      </S.Icon>
      <S.Icon>
        <FontAwesomeIcon icon={faEllipsis} />
      </S.Icon>
    </S.PostButtonWrapper>
  );
};
