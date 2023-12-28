import { notification, message } from "antd";

export default {
  openMessage() {
    message.warning("Menghubungkan Ulang...");
  },
  errorMessage(content) {
    message.error(content);
  },
  successMessage(content) {
    message.success({ content, duration: 5 });
  },

  openNotificationWithIcon(type, content) {
    notification[type]({
      message: "Something when wrong",
      duration: 10,
      description:
        typeof content === "undefined"
          ? "Please check your connection!"
          : content,
    });
  },
};
