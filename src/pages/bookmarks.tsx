import * as S from "../styles/bookmarks.style";

import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { Post } from "../types/type";
import { PostUI } from "../components/ui/post";
import { useFetchBookmarks } from "../components/hooks/useFetchBookmarks";
import { WrapperUI } from "../components/ui/wrapper";

export default function Bookmarks() {
  const [posts, setPosts] = useState<Post[]>([]);
  const { fetchBookmarks } = useFetchBookmarks();

  const getFetch = async (bookmarks: string[]) => {
    const tempArr: Post[] = [];
    for (const i in bookmarks) {
      await fetchPosts(bookmarks[i]).then((result: Post) =>
        tempArr.push(result)
      );
    }
    setPosts(tempArr);
  };

  const fetchPosts = async (id: string) => {
    const docRef = doc(db, "posts", id);
    const docSnap = await getDoc(docRef);
    const data: Post = {
      post: docSnap.data()?.post,
      createdAt: docSnap.data()?.createdAt,
      photo: docSnap.data()?.photo,
      userId: docSnap.data()?.userId,
      username: docSnap.data()?.username,
      userphoto: docSnap.data()?.userphoto,
      id,
    };

    return data;
  };

  useEffect(() => {
    fetchBookmarks().then((bookmarks) => getFetch(bookmarks));
  }, []);

  return (
    <WrapperUI title="Bookmarks">
      {posts ? (
        <S.PostWrapper>
          {posts.map((post) => (
            <PostUI post={post} />
          ))}
        </S.PostWrapper>
      ) : (
        <S.BlankWrapper>
          <S.Text>북마크한 글이 없어요 🧐</S.Text>
        </S.BlankWrapper>
      )}
    </WrapperUI>
  );
}
