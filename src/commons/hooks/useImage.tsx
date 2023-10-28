import { useState } from "react";

export const useImage = () => {
  const [imageModal, setImageModal] = useState(false);
  const [url, setUrl] = useState("");

  const onClickImage = (selectedUrl: string) => () => {
    setImageModal(true);
    setUrl(selectedUrl);
  };
  const onClickWrapper = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;

    setImageModal(false);
    setUrl("");
  };

  return { onClickImage, onClickWrapper, imageModal, url };
};
