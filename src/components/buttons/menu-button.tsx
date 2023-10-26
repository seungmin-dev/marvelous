import {
  arrayRemove,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  increment,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import * as S from "../../styles/post-list.style";
import { auth, db, storage } from "../../../firebase";
import { deleteObject, ref } from "firebase/storage";
import { Dropdown, Modal } from "antd";
import { FirebaseError } from "firebase/app";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faEllipsis, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ModalUI } from "../ui/modal-ui";
import { useState } from "react";
import { useNoti } from "../../commons/hooks/useNoti";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../commons/hooks/useModal";
import { useUserInfo } from "../../commons/hooks/useUserInfo";

interface MenuButtonProps {
  isComment: boolean;
  setEditPostId: React.Dispatch<React.SetStateAction<string>>;
  props: { postId: string; writerId: string };
  photoLeng?: number;
  originPostId?: string;
}
export const MenuButton = ({
  isComment,
  setEditPostId,
  props,
  photoLeng,
  originPostId,
}: MenuButtonProps) => {
  const user = auth.currentUser;
  const [pickedId, setPickedId] = useState("");
  const navigate = useNavigate();

  const { fetchAllUsers } = useUserInfo();
  const { contextHolder, openNotification } = useNoti();
  const { modalOpen, onClickOpenModal } = useModal();

  const onClickDelete = (postId: string) => async () => {
    try {
      const docRef = doc(db, "posts", postId);
      // 댓글 삭제 시
      if (isComment) {
        // 원글 댓글 수 감소
        await getDoc(doc(db, "posts", postId)).then(
          async (result) =>
            await updateDoc(doc(db, "posts", result.data()?.originPostId), {
              commentNum: increment(-1),
            })
        );
        // 알림 삭제
        await deleteDoc(doc(db, "noti", `${user?.uid}-${postId}-comment`));
      }
      await deleteDoc(docRef);

      fetchAllUsers().then(async (result) => {
        for (let i = 0; i < result.length; i++) {
          // 하트 목록에서 삭제
          const heartRef = doc(db, "heart", result[i].userId);
          await setDoc(heartRef, { heart: arrayRemove(postId) });
          // 북마크 목록에서 삭제
          const bookmarkRef = doc(db, "bookmark", result[i].userId);
          await setDoc(bookmarkRef, { bookmark: arrayRemove(postId) });
        }
      });

      if (!isComment) {
        // 원글 삭제 시 댓글까지 같이 삭제
        const commentDelQuery = query(
          collection(db, "posts"),
          where("originPostId", "==", postId)
        );
        const commentSnapshot = await getDocs(commentDelQuery);
        commentSnapshot.docs.map((doc) => {
          deleteDoc(doc.ref);

          // 이미지 삭제
          if (doc.data().photoLeng && doc.data().photoLeng > 0) {
            for (let i = 0; i < doc.data().photoLeng; i++) {
              const storageRef = ref(
                storage,
                `posts/${user?.uid}-${user?.displayName}/${postId}-${doc.ref.id}-${i}`
              );

              deleteObject(storageRef)
                .then(() => {})
                .catch((error) => {
                  // 저장된 이미지가 없다면 중단
                  if (error.code === "storage/object-not-found") return 0;
                  if (error instanceof FirebaseError)
                    Modal.error({
                      content:
                        "첨부된 이미지를 삭제하는 중에 에러가 발생했어요 😵‍💫",
                    });
                });
            }
          }
        });
      }

      // 이미지 삭제
      if (photoLeng && photoLeng > 0) {
        for (let i = 0; i < photoLeng; i++) {
          const storageRef = ref(
            storage,
            isComment
              ? `posts/${user?.uid}-${user?.displayName}/${originPostId}-${postId}-${i}`
              : `posts/${user?.uid}-${user?.displayName}/${postId}-${i}`
          );

          deleteObject(storageRef)
            .then(() => {})
            .catch((error) => {
              // 저장된 이미지가 없다면 중단
              if (error.code === "storage/object-not-found") return 0;
              if (error instanceof FirebaseError)
                Modal.error({
                  content: "첨부된 이미지를 삭제하는 중에 에러가 발생했어요 😵‍💫",
                });
            });
        }
      }

      openNotification("글 삭제");

      // 원글 삭제 시 홈으로 이동
      if (!isComment) navigate("/");
    } catch (error) {
      if (error instanceof FirebaseError)
        Modal.error({ content: "글 삭제에 실패했어요 😥" });
    }
  };
  const onClickDelDocId = (postId: string) => () => {
    setPickedId(postId);
  };
  const onClickEdit = (postId: string) => () => {
    setEditPostId(postId);
  };

  const items = [
    {
      label: <span onClick={onClickEdit(props.postId)}>글 수정</span>,
      key: "1",
      icon: <FontAwesomeIcon icon={faPenToSquare} />,
    },
    {
      label: (
        <span onClick={onClickOpenModal} style={{ color: "#ef151e" }}>
          글 삭제
        </span>
      ),
      key: "2",
      icon: <FontAwesomeIcon icon={faTrash} style={{ color: "#ef151e" }} />,
    },
  ];

  return (
    <>
      {contextHolder}
      {user?.uid === props.writerId ? (
        <Dropdown menu={{ items }} trigger={["click"]} placement="bottomRight">
          <S.Icon onClick={onClickDelDocId(props.postId)}>
            <FontAwesomeIcon icon={faEllipsis} />
          </S.Icon>
        </Dropdown>
      ) : null}
      <ModalUI
        modalOpen={modalOpen}
        onOkFn={onClickDelete(pickedId)}
        onCancelFn={onClickOpenModal}
        title="글을 정말로 삭제할까요? 😲"
      />
    </>
  );
};
