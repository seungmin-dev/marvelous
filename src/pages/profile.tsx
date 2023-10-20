import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { auth, db } from "../../firebase";
import * as S from "../styles/profile.style";
import { useEffect, useState } from "react";
import { Post } from "../types/type";
import { PostUI } from "../components/ui/post";
import { useFetchBookmarks } from "../components/hooks/useFetchBookmarks";
import { useFetchPostById } from "../components/hooks/useFetchPostById";
import { BlankUI } from "../components/ui/blank";

export default function Profile() {
  const user = auth.currentUser;
  const [curMenu, setMenu] = useState("posts");
  const [posts, setPosts] = useState<Post[]>([]);
  const [hearts, setHearts] = useState<Post[]>([]);
  const [bookmarks, setBookmarks] = useState<Post[]>([]);

  const { fetchBookmarks } = useFetchBookmarks();
  const { fetchPostById } = useFetchPostById();

  const getFetchPosts = async (bookmarks: string[]) => {
    const tempArr: Post[] = [];
    for (const i in bookmarks) {
      await fetchPostById(bookmarks[i]).then((result: Post) =>
        tempArr.push(result)
      );
    }
    setBookmarks(tempArr);
  };

  const fetchPosts = async () => {
    const postQuery = query(
      collection(db, "posts"),
      where("userId", "==", user?.uid),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(postQuery);
    const posts = snapshot.docs.map((doc) => {
      const { post, photo, createdAt, userId, username, userphoto } =
        doc.data();
      return {
        post,
        photo,
        createdAt,
        userId,
        username,
        userphoto,
        id: doc.id,
      };
    });
    setPosts(posts);
  };

  const onClickMenu = (menu: string) => () => {
    setMenu(menu);
  };

  useEffect(() => {
    if (curMenu === "posts") fetchPosts();
    if (curMenu === "bookmarks")
      fetchBookmarks().then((bookmarks) => getFetchPosts(bookmarks));
  }, [curMenu]);

  return (
    <S.Wrapper>
      <S.ProfileBox></S.ProfileBox>
      <S.InnerWrapper>
        <S.UserBox>
          <S.UserHeader>
            <S.UserProfilePic src={user?.photoURL as string} />
            <S.UserName>{user?.displayName}</S.UserName>
          </S.UserHeader>
          <S.MenuList>
            <S.Menu
              onClick={onClickMenu("posts")}
              isActive={curMenu === "posts"}
            >
              내가 쓴 글
            </S.Menu>
            <S.Menu
              onClick={onClickMenu("hearts")}
              isActive={curMenu === "hearts"}
            >
              하트 모음
            </S.Menu>
            <S.Menu
              onClick={onClickMenu("bookmarks")}
              isActive={curMenu === "bookmarks"}
            >
              북마크 모음
            </S.Menu>
          </S.MenuList>
        </S.UserBox>
        <S.PostBox>
          <S.PostList>
            {curMenu === "posts" &&
              (posts.length > 0 ? (
                posts.map((post) => <PostUI post={post} />)
              ) : (
                <BlankUI text="작성한 글" />
              ))}
            {curMenu === "hearts" &&
              (hearts.length > 0 ? (
                hearts.map((heart) => <PostUI post={heart} />)
              ) : (
                <BlankUI text="하트한 글" />
              ))}
            {curMenu === "bookmarks" &&
              (bookmarks.length > 0 ? (
                bookmarks.map((bookmark) => <PostUI post={bookmark} />)
              ) : (
                <BlankUI text="북마크한 글" />
              ))}
          </S.PostList>
        </S.PostBox>
      </S.InnerWrapper>
    </S.Wrapper>
  );
}
