import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";
import * as S from "../styles/profile.style";
import { useEffect, useState } from "react";
import { Post, User } from "../types/type";
import { useLocation } from "react-router-dom";
import { PostUI } from "../components/ui/post";
import { BlankUI } from "../components/ui/blank";
import { useFollow } from "../components/hooks/useFollow";

export default function UserProfile() {
  const location = useLocation();
  const [objectUserId, setObjectUserId] = useState("");
  const [objectUserInfo, setObjectUserInfo] = useState<User>();
  const [posts, setPosts] = useState<Post[]>([]);

  const { following, fetchFollowYn, onClickFollow } = useFollow();

  const getObjectUserInfo = async (objectUserId: string) => {
    const userRef = doc(db, "users", objectUserId);
    const snapshot = await getDoc(userRef);

    setObjectUserInfo(snapshot.data() as User);
  };

  useEffect(() => {
    if (location.search)
      setObjectUserId(location.search.slice(1, location.search.length));

    getObjectUserInfo(objectUserId);
    fetchPosts(objectUserId);
  }, [location, objectUserId]);

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
  useEffect(() => {
    fetchFollowYn(objectUserId);
  }, [fetchFollowYn, objectUserId]);

  return (
    <S.Wrapper>
      <S.ProfileBox></S.ProfileBox>
      <S.InnerWrapper>
        <S.UserBox isObject>
          <S.UserHeader isObject>
            <S.UserProfilePic src={objectUserInfo?.userphoto as string} />
            <S.UserName>{objectUserInfo?.username}</S.UserName>
            <S.FollowingButton onClick={onClickFollow(objectUserId)}>
              {following ? "언팔로우" : "팔로우"}
            </S.FollowingButton>
          </S.UserHeader>
        </S.UserBox>
        <S.PostBox>
          <S.PostList>
            {posts.length > 0 ? (
              posts.map((post) => <PostUI post={post} isObject />)
            ) : (
              <BlankUI text={`${objectUserInfo?.username}님이 작성한 글`} />
            )}
          </S.PostList>
        </S.PostBox>
      </S.InnerWrapper>
    </S.Wrapper>
  );
}