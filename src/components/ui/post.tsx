import * as S from "../../styles/post-list.style";
import { timeAgo } from "../../commons/time-ago";
import { PostButtons } from "../post-buttons";
import type { Post } from "../../types/type";

interface IPostUI {
  post: Post;
}

export const PostUI = ({ post }: IPostUI) => {
  return (
    <S.Post key={post.id}>
      <S.PostHeader>
        <S.PostProfileImg src={post.userphoto} />
        <S.PostUsername>{post.username}</S.PostUsername>
        <S.PostCreatedAt>{timeAgo(post.createdAt)}</S.PostCreatedAt>
      </S.PostHeader>
      <S.PostContent>{post.post}</S.PostContent>
      {post.photo ? (
        <S.PostImgWrapper length={post.photo && post.photo.length}>
          {post.photo &&
            post.photo.length > 0 &&
            post.photo.map((pic, i) => (
              <S.PostImg
                src={pic}
                isEven={(i + 1) % 2 === 0}
                isLast={post.photo.length === i + 1}
              />
            ))}
        </S.PostImgWrapper>
      ) : null}
      <PostButtons postId={post.id as string} />
    </S.Post>
  );
};
