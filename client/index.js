import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";

import "./style.css";
import history from "./history";
import store from "./store";
import Routes from "./Routes";

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <Router history={history}>
        <Routes />
      </Router>
    </Provider>
  </StrictMode>,
  document.getElementById("app")
);
