import * as S from "../styles/bookmarks.style";
import { useEffect, useState } from "react";
import { Post } from "../types/type";
import { PostUI } from "../components/ui/post";
import { useFetchBookmarks } from "../components/hooks/useFetchBookmarks";
import { WrapperUI } from "../components/ui/wrapper";
import { useFetchPostById } from "../components/hooks/useFetchPostById";

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
        <S.BlankWrapper>
          <S.Text>북마크한 글이 없어요 🧐</S.Text>
        </S.BlankWrapper>
      )}
    </WrapperUI>
  );
}
