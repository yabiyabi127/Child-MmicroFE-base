import React, { useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { Drawer } from "antd";

function Index({
  children,
  title,
  placement,
  size,
  onClose,
  visible,
  width,
  container,
}) {
  let { path } = useRouteMatch();
  const [open, setOpen] = useState(false);
  const history = useHistory();

  useEffect(() => {
    setOpen(true);
  }, []);

  const onDrawerClose = () => {
    setOpen(false);
    const splitPath = path.split("/");
    if (splitPath.length > 1) {
      let stringPath = "";
      for (let i = 0; i < splitPath.length - 1; i++) {
        stringPath += splitPath[i] + "/";
      }
      stringPath = stringPath.substring(0, stringPath.length - 1);
      history.push(stringPath);
    } else {
      history.push("./");
    }
  };

  const kt_header_height = document.getElementById("kt_header").clientHeight;

  return (
    <Drawer
      title={typeof title === "undefined" ? "Right Panel" : title}
      placement={typeof placement === "undefined" ? "right" : placement}
      size={typeof size === "undefined" ? "large" : size}
      onClose={typeof onClose === "undefined" ? onDrawerClose : onClose}
      visible={typeof visible === "undefined" ? open : visible}
      width={typeof width === "undefined" ? "70%" : width}
      getContainer={
        typeof container === "undefined"
          ? document.getElementById("kt_content")
          : container
      }
      style={{ top: kt_header_height + "px" }}
    >
      {children}
    </Drawer>
  );
}

export default Index;
