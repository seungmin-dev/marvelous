import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../../firebase";

export const useFetchPostInfo = () => {
  const user = auth.currentUser;

  // 유저 북마크 목록
  const fetchBookmarksOfUser = async () => {
    const bookmarkRef = doc(db, "bookmark", user?.uid as string);
    const snapshot = await getDoc(bookmarkRef);

    if (!snapshot.exists()) return;
    return snapshot.data()?.bookmark;
  };

  // 유저 하트 목록
  const fetchHeartsOfUser = async () => {
    const heartRef = doc(db, "heart", user?.uid as string);
    const snapshot = await getDoc(heartRef);

    if (!snapshot.exists()) return;
    return snapshot.data()?.heart;
  };

  // 포스트 하트 수
  const fetchHeartNum = async (postId: string) => {
    const docRef = doc(db, "posts", postId);
    const docResult = await getDoc(docRef);

    if (!docResult.exists()) return;
    return docResult.data()?.heartNum;
  };

  // 포스트 댓글 수
  const fetchCommentNum = async (postId: string) => {
    const docRef = doc(db, "posts", postId);
    const docResult = await getDoc(docRef);

    if (!docResult.exists()) return;
    return docResult.data()?.commentNum;
  };

  return {
    fetchBookmarksOfUser,
    fetchHeartsOfUser,
    fetchHeartNum,
    fetchCommentNum,
  };
};
