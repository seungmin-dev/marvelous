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
  overflow-y: scroll;
`;
const BlankWrapper = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  padding-top: 30%;
  justify-content: center;
`;
const Text = styled.h3`
  text-align: center;
  color: #bdbdbd;
  font-size: 24px;
`;

export default function Bookmarks() {
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
    return [...bookmarkList[0].bookmarks];
  };

  const getFetch = async (bookmarks: string[]) => {
    const tempArr = [];

    for (const i in bookmarks) {
      await fetchPosts(bookmarks[i]).then((result) => tempArr.push(result));
    }

    setPosts(tempArr);
  };

  const fetchPosts = async (id: string) => {
    const docRef = doc(db, "posts", id);
    const docSnap = await getDoc(docRef);

    const data = { ...docSnap.data(), id };

    return data;
  };

  useEffect(() => {
    fetchBookmarks().then((bookmarks) => getFetch(bookmarks));
  }, []);

  return (
    <Wrapper>
      <Title>Bookmarks</Title>
      {posts ? (
        <PostWrapper>
          {posts.map((post) => (
            <PostUI post={post} />
          ))}
        </PostWrapper>
      ) : (
        <BlankWrapper>
          <Text>북마크한 글이 없어요 🧐</Text>
        </BlankWrapper>
      )}
    </Wrapper>
  );
}
