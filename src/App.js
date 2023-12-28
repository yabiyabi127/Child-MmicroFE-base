import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import MainRoute from "pages/mainRoute";
import { setupAxios } from "setup/setupAxios";

function App(props) {
  useEffect(() => {
    setupAxios(store);
  }, []);
  return (
    <Provider store={store}>
      <BrowserRouter>
        <MainRoute historyParent={props.history} />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
