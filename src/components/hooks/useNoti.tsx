import { notification } from "antd";

export const useNoti = () => {
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (type: string) => {
    api.success({
      message: `${type} 성공 !`,
      placement: "topRight",
    });
  };

  return { openNotification, contextHolder };
};
