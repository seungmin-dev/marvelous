import { useState } from "react";

export const useModal = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const onClickOpenModal = () => {
    setModalOpen((prev) => !prev);
  };
  return { modalOpen, onClickOpenModal };
};
