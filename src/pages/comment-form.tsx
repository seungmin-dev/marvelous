import { useLocation, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { WrapperUI } from "../components/ui/wrapper";
import * as S from "../styles/write-form.style";
import { useFile } from "../commons/hooks/useFile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ButtonUI2 } from "../components/ui/button-ui-2";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { addDoc, collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db, storage } from "../../firebase";
import { FirebaseError } from "firebase/app";
import { Modal } from "antd";
import { useNoti } from "../commons/hooks/useNoti";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useUserInfo } from "../commons/hooks/useUserInfo";
import { User } from "../types/type";

export const CommentWrapper = styled.div`
  width: 100%;
  height: auto;
  padding: 10px 20px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  box-sizing: border-box;
`;
export const Textarea = styled.textarea`
  width: 100%;
  height: 100px;
  resize: none;
  border: 1px solid #bdbdbd;
  font-size: 16px;
  padding: 20px;
  border-radius: 10px;
  margin: 10px 0;
  ::placeholder {
    color: #bdbdbd;
  }
`;

export default function CommentForm() {
  const user = auth.currentUser;
  const [userInfo, setUserInfo] = useState<User>();
  const location = useLocation();
  const navigate = useNavigate();
  const { contextHolder, openNotification } = useNoti();

  const [loading, setLoading] = useState(false);
  const [onComplete, setComplete] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [commentInfo, setCommentInfo] = useState({
    postId: "",
    writerId: "",
    writerName: "",
    atWriterName: "",
    commentNum: 0,
  });
  const { fileList, setFileList, tempUrlList, setTempUrlList, onChangeFiles } =
    useFile();
  const { fetchUserInfo } = useUserInfo();

  useEffect(() => {
    fetchUserInfo(location.state.writerId).then((result) =>
      setUserInfo(result)
    );
  }, [location]);
  useEffect(() => {
    setCommentInfo({
      postId: location.state.postId,
      writerId: location.state.writerId,
      writerName: userInfo?.userName as string,
      atWriterName: `@${userInfo?.userName as string} `,
      commentNum:
        location.state.commentNum === undefined
          ? 0
          : Number(location.state.commentNum),
    });
  }, [userInfo]);

  const onChangeTextarea = () => {
    if ((textareaRef.current?.value.length as number) > 0) setComplete(true);
  };

  const submitComment = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    setLoading(true);
    try {
      const splittedStr = textareaRef.current?.value
        .split(commentInfo.atWriterName)[1]
        .split(" ");

      if (splittedStr!.length < 0) return;

      const docResult = await addDoc(collection(db, "posts"), {
        userId: user?.uid,
        content: splittedStr,
        heartNum: 0,
        commentNum: 0,
        isComment: true,
        originPostId: commentInfo.postId,
        originUserId: commentInfo.writerId,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
      if (fileList && fileList?.length > 0) {
        const urlList = [];
        for (let i = 0; i < fileList.length; i++) {
          const file = fileList[i];
          const locationRef = ref(
            storage,
            `posts/${user?.uid}-${user?.displayName}/${commentInfo.postId}-${docResult.id}-${i}`
          );
          const result = await uploadBytes(locationRef, file);
          const url = await getDownloadURL(result.ref);
          urlList.push(url);
        }
        await updateDoc(docResult, {
          photo: urlList,
          photoLeng: urlList.length,
        });
      }

      setFileList(null);
      setTempUrlList([]);

      // 원글에 대한 댓글 수 증가
      const docRef = doc(db, "posts", commentInfo.postId);
      await setDoc(
        docRef,
        { commentNum: ++commentInfo.commentNum },
        { merge: true }
      );

      // 글 작성자에게 알림 보내기
      if (user?.uid !== commentInfo.writerId) {
        const notiRef = doc(
          db,
          "noti",
          `${user?.uid}-${commentInfo.writerId}-comment`
        );
        await setDoc(notiRef, {
          userId: commentInfo.writerId,
          sendId: user?.uid,
          sendName: user?.displayName,
          type: "comment",
          poseId: commentInfo.postId,
          postContent: location.state.originContent.slice(0, 10),
          createdAt: Date.now(),
        });
      }

      openNotification("댓글 추가");
      // 작성 성공 시 추가된 것 실시간으로 보여주기(/post 화면 이동)
      navigate("/post", { state: { postId: commentInfo.postId } });
    } catch (error) {
      if (error instanceof FirebaseError)
        Modal.error({ content: "댓글 작성에 실패했어요 🤧" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <WrapperUI>
      {contextHolder}
      <CommentWrapper>
        <S.WriteFormWrapper>
          <S.Form onSubmit={submitComment}>
            <S.Textarea
              defaultValue={commentInfo.atWriterName}
              ref={textareaRef}
              onChange={onChangeTextarea}
            />
            <S.ButtonWrapper>
              <S.TempImgWrapper>
                {tempUrlList.map((url, i) => (
                  <S.TempImg src={url} key={i} />
                ))}
              </S.TempImgWrapper>
              <S.Icon htmlFor="file">
                <FontAwesomeIcon icon={faImage} />
              </S.Icon>
              <S.FileInput
                type="file"
                multiple
                onChange={onChangeFiles}
                id="file"
                accept="image/*"
              />
              <ButtonUI2
                type="submit"
                text={loading ? "loading" : "Reply"}
                onComplete={onComplete}
              />
            </S.ButtonWrapper>
          </S.Form>
        </S.WriteFormWrapper>
      </CommentWrapper>
    </WrapperUI>
  );
}
