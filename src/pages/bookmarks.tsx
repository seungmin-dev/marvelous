import * as S from "../styles/bookmarks.style";
import { useEffect, useState } from "react";
import { Post } from "../types/type";
import { PostUI } from "../components/ui/post";
import { useFetchBookmarks } from "../components/hooks/useFetchBookmarks";
import { WrapperUI } from "../components/ui/wrapper";
import { useFetchPostById } from "../components/hooks/useFetchPostById";
import { BlankUI } from "../components/ui/blank";
import { arrayRemove, doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";

export default function Bookmarks() {
  const [posts, setPosts] = useState<Post[]>([]);
  const { fetchBookmarks } = useFetchBookmarks();
  const { fetchPostById } = useFetchPostById();
  const user = auth.currentUser;

  const getFetchPosts = async (bookmarks: string[]) => {
    const tempArr: Post[] = [];
    for (const i in bookmarks) {
      await fetchPostById(bookmarks[i]).then((result: Post) => {
        // 북마크한 글 중에 삭제된 글이 있다면 북마크 글 아이디 목록에서 해당 아이디 삭제
        if (result.createdAt === undefined) {
          const userRef = doc(db, "users", user?.uid as string);
          setDoc(
            userRef,
            {
              bookmarks: arrayRemove(bookmarks[i]),
            },
            { merge: true }
          );
        } else tempArr.push(result);
      });
    }
    setPosts(tempArr);
  };

  useEffect(() => {
    fetchBookmarks().then((bookmarks) => getFetchPosts(bookmarks));
  }, []);

  return (
    <WrapperUI title="Bookmarks">
      {posts.length !== 0 ? (
        <S.PostWrapper>
          {posts.map((post) => (
            <PostUI post={post} />
          ))}
        </S.PostWrapper>
      ) : (
        <BlankUI text="북마크한 글" />
      )}
    </WrapperUI>
  );
}
