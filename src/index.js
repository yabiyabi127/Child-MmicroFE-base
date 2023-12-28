import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { rsaEncription } from "utils/DataUser";
import { setKeycloak } from "utils/DataKeycloak";
import {
  API_AUTHWS,
  APP_LOGIN,
  APP_NAME,
  APP_VERSION,
  ENVIRONMENT,
  MODULE_SLUG,
} from "setup/application.properties";

/*CATATAN*/
// renderModulSatu & unmountModulSatu disesuaikan dari modulSlug pada microfrontend.json di Container?Parent Modul
window[`render${MODULE_SLUG}`] = (containerId, props) => {
  ReactDOM.render(<App {...props} />, document.getElementById(containerId));
  serviceWorker.unregister();
};
window[`unmount${MODULE_SLUG}`] = (containerId) => {
  return ReactDOM.unmountComponentAtNode(document.getElementById(containerId));
};

if (ENVIRONMENT === "production") {
  console.log = function () {};
  console.error = function () {};
  console.warn = function () {};
  console.table = function () {};
}

console.log(`${APP_NAME} ${APP_VERSION}`);

function ItsWork() {
  return (
    <div>
      Its work! {APP_VERSION} on {ENVIRONMENT}
    </div>
  );
}

const doLogin = (username, password) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const body = JSON.stringify({
    username,
    password: rsaEncription(password),
  });
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body,
    redirect: "follow",
  };

  fetch(`${API_AUTHWS}/user/login`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      const { status } = result;
      if (result && status === "success") {
        setKeycloak(result.item);
        setTimeout(() => {
          ReactDOM.render(<App />, document.getElementById("root"));
        }, 100);
      } else {
        ReactDOM.render(
          <div
            style={{
              backgroundColor: "black",
              color: "white",
              height: "100vh",
              fontSize: "50px",
              textAlign: "center",
            }}
          >
            Failed
          </div>,
          document.getElementById("root")
        );
      }
    })
    .catch((e) => alert("failed to login " + e.message));
};

function myFunction() {
  const username = prompt("Please Log in.\n\nUsername:", " ");
  if (username && username.trim().length > 0) {
    const password = prompt("Please Log in.\n\nPassword:", " ");
    if (password && password.trim().length > 0) {
      doLogin(username, password);
    } else {
      ReactDOM.render(<ItsWork />, document.getElementById("root"));
    }
  } else {
    ReactDOM.render(<ItsWork />, document.getElementById("root"));
  }
}

if (!document.getElementById("MainContent-container")) {
  const isCanLogin = APP_LOGIN === "true";
  if (window.location.pathname === "/login" && isCanLogin) {
    setTimeout(() => {
      myFunction();
    }, 3000);
  } else {
    ReactDOM.render(<ItsWork />, document.getElementById("root"));
  }
}
serviceWorker.unregister();
