import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import * as S from "../styles/profile.style";
import { useEffect, useState } from "react";
import { Post } from "../types/type";
import { useFetchPostInfo } from "../commons/hooks/useFetchPostInfo";
import { Following } from "../commons/hooks/useFollow";
import { ProfileMy } from "../components/profile-my";
import { useFetchPost } from "../commons/hooks/useFetchPost";

export default function Profile() {
  const user = auth.currentUser;

  const [curMenu, setMenu] = useState("posts");
  const [posts, setPosts] = useState<Post[]>([]);
  const [hearts, setHearts] = useState<Post[]>([]);
  const [bookmarks, setBookmarks] = useState<Post[]>([]);
  const [followings, setFollowings] = useState<Following[]>([]);

  const { fetchBookmarksOfUser, fetchHeartsOfUser } = useFetchPostInfo();
  const { fetchPosts, fetchPostById } = useFetchPost();

  const getFetchPosts = async (type: string, posts: string[]) => {
    const tempArr: Post[] = [];
    for (const i in posts) {
      await fetchPostById(posts[i]).then((result: Post) =>
        tempArr.push(result)
      );
    }
    if (type === "bookmark") setBookmarks(tempArr);
    else if (type === "heart") setHearts(tempArr);
  };

  const onClickMenu = (menu: string) => () => {
    setMenu(menu);
  };

  const fetchUserData = async (objectUserId: string) => {
    const ref = doc(db, "users", objectUserId);
    const snapshot = await getDoc(ref);
    const result = {
      userId: snapshot.data()?.userId,
      userName: snapshot.data()?.userName,
      userPhoto: snapshot.data()?.userPhoto,
    };
    return result;
  };
  const fetchFollowingList = async () => {
    const ref = doc(db, "follow", user?.uid as string);
    const snapshot = await getDoc(ref);
    const result = snapshot.data()?.userId;

    const tempArr: Following[] = [];
    for (const i in result) {
      tempArr.push(await fetchUserData(result[i] as string));
    }
    setFollowings(tempArr);
  };

  useEffect(() => {
    if (curMenu === "posts")
      fetchPosts(user!.uid).then((result) => setPosts(result));
    if (curMenu === "hearts")
      fetchHeartsOfUser().then((hearts) => {
        getFetchPosts("heart", hearts);
      });
    if (curMenu === "bookmarks")
      fetchBookmarksOfUser().then((bookmarks) =>
        getFetchPosts("bookmark", bookmarks)
      );
    if (curMenu === "following") fetchFollowingList();
  }, [curMenu]);

  return (
    <S.Wrapper>
      <ProfileMy
        onClickMenu={onClickMenu}
        curMenu={curMenu}
        posts={posts}
        hearts={hearts}
        bookmarks={bookmarks}
        followings={followings}
        setFollowings={setFollowings}
      />
    </S.Wrapper>
  );
}
