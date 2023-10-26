import {
  arrayRemove,
  arrayUnion,
  deleteDoc,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../../../firebase";
import { useNoti } from "../../commons/hooks/useNoti";
import { Modal } from "antd";
import { FirebaseError } from "firebase/app";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import * as S from "../../styles/post-list.style";
import { useEffect, useState } from "react";
import { useFetchPostInfo } from "../../commons/hooks/useFetchPostInfo";

interface HeartButtonProps {
  props: { postId: string; writerId: string; postContent: string[] };
}

export const HeartButton = ({ props }: HeartButtonProps) => {
  const user = auth.currentUser;
  const [hearted, setHearted] = useState(false);
  const [heartNum, setHeartNum] = useState(0);

  const { contextHolder, openNotification } = useNoti();
  const { fetchHeartNum, fetchHeartsOfUser } = useFetchPostInfo();

  const fetching = (userHeartList: string[]) => {
    for (const i in userHeartList) {
      if (userHeartList[i] === props.postId) {
        setHearted(true);
      }
    }
  };
  const onClickHeart =
    (
      heartNum: number,
      postId: string,
      writerId: string,
      postContent: string[]
    ) =>
    async () => {
      setHearted((prev) => !prev);

      try {
        // 유저 하트 목록에 추가
        const heartRef = doc(db, "heart", user?.uid as string);
        await setDoc(
          heartRef,
          { heart: hearted ? arrayRemove(postId) : arrayUnion(postId) },
          { merge: true }
        );

        // 게시글에 하트 수 증감
        const docRef = doc(db, "posts", postId);
        await updateDoc(docRef, {
          heartNum: hearted ? --heartNum : ++heartNum,
        });

        if (!hearted) setHeartNum((prev) => ++prev);
        else setHeartNum((prev) => --prev);

        openNotification(hearted ? "하트 해제" : "하트");

        // 글 작성자에게 알림
        if (user?.uid === writerId) return;

        const alertRef = doc(db, "noti", `${user?.uid}-${writerId}-heart`);
        if (!hearted) {
          await setDoc(alertRef, {
            userId: writerId,
            sendId: user?.uid,
            sendName: user?.displayName,
            type: "heart",
            postId: postId,
            postContent: postContent.slice(0, 10),
            createdAt: Date.now(),
          });
        } else {
          await deleteDoc(alertRef);
        }
      } catch (error) {
        if (error instanceof FirebaseError)
          Modal.error({ content: "하트에 실패했어요 😫" });
        setHearted((prev) => !prev);
      }
    };

  useEffect(() => {
    fetchHeartNum(props.postId).then((result) =>
      setHeartNum(result ? result : 0)
    );
    fetchHeartsOfUser().then((userHeartList) => fetching(userHeartList));
  }, [props.postId]);

  return (
    <S.Icon
      onClick={onClickHeart(
        heartNum,
        props.postId,
        props.writerId,
        props.postContent
      )}
    >
      {contextHolder}
      {hearted ? (
        <FontAwesomeIcon icon={faHeartSolid} />
      ) : (
        <FontAwesomeIcon icon={faHeart} />
      )}
      <S.IconText>{heartNum}</S.IconText>
    </S.Icon>
  );
};
