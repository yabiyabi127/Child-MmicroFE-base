import { Modal, Result } from "antd";
import React from "react";

export default function Notification(key, content) {
  let secondsToGo = 3;
  const modal = ModalType(key, content);
  setTimeout(() => {
    modal.destroy();
  }, secondsToGo * 1000);
}

function ModalType(key, content) {
  switch (key) {
    default: {
      return Modal.success({
        title: "Request Berhasil",
        content: (
          <Result
            status="success"
            title="Request Berhasil"
            subTitle={content}
          />
        ),
      });
    }
    case "success": {
      return Modal.success({
        title: "Request Berhasil",
        content: (
          <Result
            status="success"
            title="Request Berhasil"
            subTitle={content}
          />
        ),
      });
    }
    case "failed": {
      return Modal.error({
        title: "Request Gagal",
        content: (
          <div>
            <Result status="error" title="Request Gagal" subTitle={content} />
          </div>
        ),
      });
    }
    case "500": {
      return Modal.error({
        title: "Request Gagal",
        content: (
          <div>
            <Result
              status="500"
              title="500"
              subTitle="Terjadi Kesalahan Pada Server"
            />
          </div>
        ),
      });
    }
  }
}
