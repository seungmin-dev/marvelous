import { Modal } from "antd";
import { useState } from "react";

export const useFile = () => {
  const [fileList, setFileList] = useState<File[] | null>(null);
  const [tempUrlList, setTempUrlList] = useState<string[]>([]);

  const onChangeFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      Modal.info({ content: "사진은 최대 4개까지 업로드할 수 있어요." });
      tempFiles.pop();
    }
    for (let i = 0; i < tempFiles.length; i++) {
      if (tempFiles[i].size > 1024 ** 2) {
        Modal.info({ content: "이미지 파일은 1MB까지 업로드할 수 있어요" });
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

  return { fileList, setFileList, tempUrlList, setTempUrlList, onChangeFiles };
};
