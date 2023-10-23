import { Link } from "react-router-dom";
import { auth, db, storage } from "../../firebase";
import * as S from "../styles/profile.style";
import { BlankUI } from "./ui/blank";
import { PostUI } from "./ui/post";
import { Following, useFollow } from "./hooks/useFollow";
import { Post } from "../types/type";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faRotate } from "@fortawesome/free-solid-svg-icons";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { FirebaseError } from "firebase/app";
import { Modal } from "antd";
import { useNoti } from "./hooks/useNoti";
import { InputUI2 } from "./ui/input-ui-2";
import { ButtonUI3 } from "./ui/button-ui-3";
import { updateProfile } from "firebase/auth";

interface ProfileProps {
  onClickMenu: (menu: string) => () => void;
  curMenu: string;
  posts: Post[];
  hearts: Post[];
  bookmarks: Post[];
  followings: Following[];
  setFollowings: (value: React.SetStateAction<Following[]>) => void;
}

export const ProfileMy = ({
  onClickMenu,
  curMenu,
  posts,
  hearts,
  bookmarks,
  followings,
  setFollowings,
}: ProfileProps) => {
  const user = auth.currentUser;
  const [bgImg, setBgImg] = useState("");
  const [editName, setEditName] = useState(false);
  const [changedName, setChangedName] = useState("");
  const [profilePic, setProfilePic] = useState("");

  const { onClickFollowInProfile } = useFollow();
  const { contextHolder, openNotification } = useNoti();

  const getBgImg = async () => {
    const userRef = doc(db, "users", user?.uid as string);
    const snapshot = await getDoc(userRef);
    const bgImgUrl = { userBgImg: snapshot.data()?.userBgImg };

    setBgImg(bgImgUrl.userBgImg);
  };

  const onChangeFile =
    (type: string) => async (e: React.ChangeEvent<HTMLInputElement>) => {
      const { files } = e.target;

      if (files![0].size > 1024 ** 2) {
        Modal.info({ content: "이미지 파일은 1MB까지 업로드할 수 있어요" });
        return;
      }

      try {
        const locationRef = ref(storage, `users/${user?.uid}-${type}`);

        const result = await uploadBytes(locationRef, files![0]);
        const url = await getDownloadURL(result.ref);

        const userRef = doc(db, "users", user?.uid as string);
        if (type === "bg") {
          await updateDoc(userRef, { userBgImg: url });
          setBgImg(url);
        } else if (type === "profile") {
          await updateDoc(userRef, { userphoto: url });
          await updateProfile(user!, { photoURL: url });

          setProfilePic(url);
        }

        openNotification(
          type === "bg" ? "프로필 배경 사진 변경" : "프로필 사진 변경"
        );
      } catch (error) {
        if (error instanceof FirebaseError)
          Modal.error({
            content: `${
              type === "bg" ? "프로필 배경 사진" : "프로필 사진"
            } 변경에 실패했어요 😵`,
          });
      }
    };
  const onClickEditName = () => {
    setEditName(true);
  };
  const onCompleteEditName = async () => {
    if (changedName === "") {
      setEditName(false);
      return;
    }

    const user = auth.currentUser;
    const userRef = doc(db, "users", user?.uid as string);

    try {
      await updateDoc(userRef, { username: changedName });
      await updateProfile(user!, { displayName: changedName });

      openNotification("닉네임 변경");
    } catch (error) {
      if (error instanceof FirebaseError)
        Modal.error({ content: "닉네임 변경에 실패했어요 😮‍💨" });
    } finally {
      setChangedName("");
      setEditName(false);
    }
  };
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChangedName(e.target.value);
  };

  useEffect(() => {
    getBgImg();
  }, []);

  return (
    <>
      {contextHolder}
      <S.ProfileBox>
        <S.ProfileBgEditButton htmlFor="bgImg">
          <FontAwesomeIcon icon={faRotate} />
        </S.ProfileBgEditButton>
        <S.ProfileBgImg src={bgImg ? bgImg : "/src/assets/emptyBgImg.png"} />
        <input
          type="file"
          id="bgImg"
          onChange={onChangeFile("bg")}
          accept="image/*"
          style={{ display: "none" }}
        />
      </S.ProfileBox>
      <S.InnerWrapper>
        <S.UserBox isObject={false}>
          <S.UserHeader isObject={false}>
            <S.UserProfilePicWrapper>
              <S.ProfilePicEditButton htmlFor="profileImg">
                <FontAwesomeIcon icon={faRotate} />
              </S.ProfilePicEditButton>
              <S.UserProfilePic
                src={profilePic ? profilePic : (user?.photoURL as string)}
              />
              <input
                type="file"
                id="profileImg"
                onChange={onChangeFile("profile")}
                accept="image/*"
                style={{ display: "none" }}
              />
            </S.UserProfilePicWrapper>
            {!editName ? (
              <S.UserName>
                {user?.displayName}{" "}
                <S.Icon onClick={onClickEditName}>
                  <FontAwesomeIcon icon={faPencil} />
                </S.Icon>
              </S.UserName>
            ) : (
              <>
                <InputUI2
                  type="text"
                  defaultValue={user?.displayName as string}
                  onChangeInput={onChangeInput}
                />
                <ButtonUI3
                  text="수정"
                  type="button"
                  onClickFn={onCompleteEditName}
                />
              </>
            )}
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
            <S.Menu
              onClick={onClickMenu("following")}
              isActive={curMenu === "following"}
            >
              팔로잉
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
            {curMenu === "following" &&
              (followings.length > 0 ? (
                followings.map((following) => (
                  <S.FollowItem>
                    <S.FollowingUserImg src={following.userphoto} />
                    <S.FollowingUserName>
                      <Link to={`/user-profile?${following.userId}`}>
                        {following.username}
                      </Link>
                    </S.FollowingUserName>
                    <S.FollowingButton
                      onClick={onClickFollowInProfile({
                        followings,
                        setFollowings,
                        objectUserId: following.userId,
                      })}
                    >
                      언팔로우
                    </S.FollowingButton>
                  </S.FollowItem>
                ))
              ) : (
                <BlankUI text="팔로잉한 사람" />
              ))}
          </S.PostList>
        </S.PostBox>
      </S.InnerWrapper>
    </>
  );
};
