import * as S from "../../styles/post-list.style";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { useEffect, useState } from "react";
import { useFetchPostInfo } from "../../commons/hooks/useFetchPostInfo";

interface CommentButtonProps {
  props: {
    postId: string;
    writerId: string;
    postContent: string[];
  };
}
export const CommentButton = ({ props }: CommentButtonProps) => {
  const navigate = useNavigate();
  const [commentsNum, setCommentsNum] = useState(0);
  const { fetchCommentNum } = useFetchPostInfo();

  const onClickComment = async () => {
    navigate("/comment", {
      state: {
        postId: props.postId,
        writerId: props.writerId,
        originContent: props.postContent,
        commentNum: await fetchCommentNum(props.postId.split("-")[0]),
      },
    });
  };
  useEffect(() => {
    fetchCommentNum(props.postId).then((result) =>
      setCommentsNum(result ? result : 0)
    );
  }, [props.postId]);

  return (
    <S.Icon onClick={onClickComment}>
      <FontAwesomeIcon icon={faComment} />
      <S.IconText>{commentsNum}</S.IconText>
    </S.Icon>
  );
};
