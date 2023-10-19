import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { auth, db } from "../../../firebase";

export const useFetchBookmarks = () => {
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

  return { fetchBookmarks };
};
