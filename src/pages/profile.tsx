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
import { useFetchPostInfo } from "../components/hooks/useFetchPostInfo";
import { useFetchPostById } from "../components/hooks/useFetchPostById";
import { Following } from "../components/hooks/useFollow";
import { ProfileMy } from "../components/profile-my";

export default function Profile() {
  const user = auth.currentUser;

  const [curMenu, setMenu] = useState("posts");
  const [posts, setPosts] = useState<Post[]>([]);
  const [hearts, setHearts] = useState<Post[]>([]);
  const [bookmarks, setBookmarks] = useState<Post[]>([]);
  const [followings, setFollowings] = useState<Following[]>([]);

  const { fetchBookmarks, fetchHearts } = useFetchPostInfo();
  const { fetchPostById } = useFetchPostById();

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

  const fetchPosts = async (userId: string) => {
    const postQuery = query(
      collection(db, "posts"),
      where("userId", "==", userId),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(postQuery);
    const posts = snapshot.docs.map((doc) => {
      const {
        post,
        photo,
        createdAt,
        userId,
        username,
        userphoto,
        heartedNum,
      } = doc.data();
      return {
        post,
        photo,
        createdAt,
        userId,
        username,
        userphoto,
        heartedNum,
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
      userphoto: snapshot.data()?.userphoto,
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
    if (curMenu === "hearts")
      fetchHearts().then((hearts) => {
        getFetchPosts("heart", hearts);
      });
    if (curMenu === "bookmarks")
      fetchBookmarks().then((bookmarks) =>
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
