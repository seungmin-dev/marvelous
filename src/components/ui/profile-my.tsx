import { Link } from "react-router-dom";
import { auth } from "../../../firebase";
import * as S from "../../styles/profile.style";
import { BlankUI } from "./blank";
import { PostUI } from "./post";
import { Following, useFollow } from "../hooks/useFollow";
import { Post } from "../../types/type";

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
  const { onClickFollowInProfile } = useFollow();

  return (
    <>
      <S.ProfileBox></S.ProfileBox>
      <S.InnerWrapper>
        <S.UserBox isObject={false}>
          <S.UserHeader isObject={false}>
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
                    <S.FollowingUserImg src={following.userPhoto} />
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
