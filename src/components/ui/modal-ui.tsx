import { Modal } from "antd";

interface ModalUIProps {
  modalOpen: boolean;
  onOkFn: () => Promise<void> | void;
  onCancelFn: () => void;
  title: string;
}

export const ModalUI = ({
  modalOpen,
  onOkFn,
  onCancelFn,
  title,
}: ModalUIProps) => {
  return (
    <Modal
      open={modalOpen}
      cancelText="취소"
      okText="확인"
      onOk={onOkFn}
      onCancel={onCancelFn}
      okButtonProps={{
        style: {
          backgroundColor: `#ef151e`,
        },
      }}
      width={300}
      title={title}
    />
  );
};
