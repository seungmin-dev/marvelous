import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../../firebase";
import { Post } from "../types/type";
import { PostUI } from "../components/ui/post";

const Wrapper = styled.div`
  width: 100%;
  max-width: 800px;
  height: 100%;
  padding: 20px;
  margin: 0 auto;
`;
const Title = styled.h2`
  font-size: 30px;
  margin-bottom: 20px;
`;

const PostWrapper = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-y: scroll;
  @media (max-width: 800px) {
    height: 85vh;
  }
`;
const Post = styled.div``;

export default function Bookmarks() {
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);

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
    setBookmarks([...bookmarkList[0].bookmarks]);

    const tempArr: Post[] = [];

    for (const id in bookmarks) {
      await fetchPosts(bookmarks[id]).then((result) => tempArr.push(result));
    }

    setPosts(tempArr);
  };

  const fetchPosts = async (id: string) => {
    const docRef = doc(db, "posts", id);
    const docSnap = await getDoc(docRef);

    return docSnap.data();
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  return (
    <Wrapper>
      <Title>Bookmarks</Title>
      <PostWrapper>
        {posts.map((post) => (
          <PostUI post={post} />
        ))}
      </PostWrapper>
    </Wrapper>
  );
}
