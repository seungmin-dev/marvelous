import * as S from "../styles/bookmarks.style";
import { useEffect, useState } from "react";
import { Post } from "../types/type";
import { PostUI } from "../components/ui/post";
import { useFetchBookmarks } from "../components/hooks/useFetchBookmarks";
import { WrapperUI } from "../components/ui/wrapper";
import { useFetchPostById } from "../components/hooks/useFetchPostById";
import { BlankUI } from "../components/ui/blank";

export default function Bookmarks() {
  const [posts, setPosts] = useState<Post[]>([]);
  const { fetchBookmarks } = useFetchBookmarks();
  const { fetchPostById } = useFetchPostById();

  const getFetchPosts = async (bookmarks: string[]) => {
    const tempArr: Post[] = [];
    for (const i in bookmarks) {
      await fetchPostById(bookmarks[i]).then((result: Post) =>
        tempArr.push(result)
      );
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
