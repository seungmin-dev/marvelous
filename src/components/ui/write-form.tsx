import * as S from "../../styles/write-form.style";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import { addDoc, collection, updateDoc } from "firebase/firestore";
import { auth, db, storage } from "../../../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ButtonUI2 } from "./button-ui-2";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const WriteForm = () => {
  const [loading, setLoading] = useState(false);
  const [onComplete, setComplete] = useState(false);
  const [fileList, setFileList] = useState<File[] | null>(null);
  const [tempUrlList, setTempUrlList] = useState<string[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const onChangeTextarea = () => {
    if ((textareaRef.current?.value.length as number) > 0) setComplete(true);
  };

  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    const tempFiles: File[] = [];

    // 이미 파일리스트에 이미지가 있다면
    if (fileList && fileList !== undefined && fileList?.length > 0) {
      fileList.forEach((file) => {
        tempFiles.push(file);
      });
    }
    if (files && files !== undefined) {
      for (let j = 0; j < files?.length; j++) {
        tempFiles?.push(files[j]);
      }
    }
    if (tempFiles.length > 4) {
      alert("사진은 최대 4개까지 업로드할 수 있어요.");
      tempFiles.pop();
    }
    for (let i = 0; i < tempFiles.length; i++) {
      if (tempFiles[i].size > 1024 ** 2) {
        alert("이미지 파일은 1MB까지 업로드할 수 있어요");
        return;
      }
    }
    setFileList(tempFiles);

    setTempUrlList([]);
    tempFiles!.map((file) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = (event) => {
        if (typeof event.target?.result === "string") {
          setTempUrlList((prev) => [...prev, event.target?.result]);
        }
      };
    });
  };
  const submitPost = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    const user = auth.currentUser;
    setLoading(true);

    try {
      const doc = await addDoc(collection(db, "posts"), {
        post: textareaRef.current?.value,
        createdAt: Date.now(),
        username: user?.displayName,
        userId: user?.uid,
        userphoto: user?.photoURL,
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
        await updateDoc(doc, { photo: urlList });
      }
      textareaRef.current!.value = "";
      setFileList(null);
      setTempUrlList([]);
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <S.WriteFormWrapper>
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
            onChange={onChangeFile}
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
