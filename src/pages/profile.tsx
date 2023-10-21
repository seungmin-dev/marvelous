import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../../firebase";
import * as S from "../styles/profile.style";
import { useEffect, useState } from "react";
import { Post } from "../types/type";
import { useFetchBookmarks } from "../components/hooks/useFetchBookmarks";
import { useFetchPostById } from "../components/hooks/useFetchPostById";
import { Following } from "../components/hooks/useFollow";
import { ProfileMy } from "../components/ui/profile-my";

export default function Profile() {
  const user = auth.currentUser;

  const [curMenu, setMenu] = useState("posts");
  const [posts, setPosts] = useState<Post[]>([]);
  const [hearts, setHearts] = useState<Post[]>([]);
  const [bookmarks, setBookmarks] = useState<Post[]>([]);
  const [followings, setFollowings] = useState<Following[]>([]);

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

  const fetchPosts = async (userId: string) => {
    const postQuery = query(
      collection(db, "posts"),
      where("userId", "==", userId),
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

  const fetchUserData = async (objectUserId: string) => {
    const ref = doc(db, "users", objectUserId);
    const snapshot = await getDoc(ref);
    const result = {
      username: snapshot.data()?.username,
      userId: snapshot.data()?.userId,
      userPhoto: snapshot.data()?.userPhoto,
    };

    return result;
  };
  const fetchFollowingList = async () => {
    const ref = doc(db, "users", user?.uid as string);
    const snapshot = await getDoc(ref);
    const result = snapshot.data()?.follow;

    const tempArr: Following[] = [];
    for (const i in result) {
      tempArr.push(await fetchUserData(result[i] as string));
    }
    setFollowings(tempArr);
  };

  useEffect(() => {
    if (curMenu === "posts") fetchPosts(user!.uid);
    if (curMenu === "bookmarks")
      fetchBookmarks().then((bookmarks) => getFetchPosts(bookmarks));
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
