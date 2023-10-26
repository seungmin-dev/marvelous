import * as S from "../styles/write-form.style";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import { addDoc, collection, updateDoc } from "firebase/firestore";
import { auth, db, storage } from "../../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ButtonUI2 } from "./ui/button-ui-2";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useNoti } from "../commons/hooks/useNoti";
import { Modal } from "antd";
import { useFile } from "../commons/hooks/useFile";
import { useMobile } from "../commons/hooks/useMobile";
import { useNavigate } from "react-router-dom";

export const WriteForm = () => {
  const [loading, setLoading] = useState(false);
  const [onComplete, setComplete] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const navigate = useNavigate();
  const { isMobile } = useMobile();
  const { contextHolder, openNotification } = useNoti();
  const { fileList, setFileList, tempUrlList, setTempUrlList, onChangeFiles } =
    useFile();

  const onChangeTextarea = () => {
    if ((textareaRef.current?.value.length as number) > 0) setComplete(true);
  };

  const submitPost = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    if (textareaRef.current?.value.length === 0) return;

    const user = auth.currentUser;
    setLoading(true);

    try {
      const filteredPost = textareaRef.current?.value
        .split(" ")
        .filter((text) => text.length > 0);
      const doc = await addDoc(collection(db, "posts"), {
        userId: user?.uid,
        content: filteredPost,
        heartNum: 0,
        commentNum: 0,
        isComment: false,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
      if (fileList && fileList?.length > 0) {
        const urlList = [];
        for (let i = 0; i < fileList.length; i++) {
          const file = fileList[i];
          const locationRef = ref(
            storage,
            `posts/${user?.uid}-${user?.displayName}/${doc.id}-${i}`
          );
          const result = await uploadBytes(locationRef, file);
          const url = await getDownloadURL(result.ref);
          urlList.push(url);
        }
        await updateDoc(doc, {
          photo: urlList,
          photoLeng: urlList.length,
        });
      }
      textareaRef.current!.value = "";
      setFileList(null);
      setTempUrlList([]);

      if (isMobile) navigate("/");
    } catch (error) {
      if (error instanceof Error)
        Modal.error({ content: "글 등록에 실패했어요 😥" });
    } finally {
      setLoading(false);
      openNotification("글 등록");
    }
  };
  return (
    <S.WriteFormWrapper>
      {contextHolder}
      <S.Form onSubmit={submitPost}>
        <S.Textarea
          placeholder="What's on your mind...?"
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
            text={loading ? "loading" : "Post"}
            onComplete={onComplete}
          />
        </S.ButtonWrapper>
      </S.Form>
    </S.WriteFormWrapper>
  );
};
