import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { auth, db } from "../../../firebase";

export const useFetchPostInfo = () => {
  const fetchBookmarks = async () => {
    const user = auth.currentUser;

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

  const fetchHearts = async () => {
    const user = auth.currentUser;

    const heartsQuery = query(
      collection(db, "users"),
      where("userId", "==", user?.uid),
      limit(25)
    );
    const snapshot = await getDocs(heartsQuery);
    const heartList = snapshot.docs.map((doc) => {
      const { heart } = doc.data();
      return {
        heart: heart as string,
      };
    });
    return [...heartList[0].heart];
  };

  return { fetchBookmarks, fetchHearts };
};
