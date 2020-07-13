import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import { renderRoutes } from "react-router-config";

import history from "./root/root.history";
import routes from "./root/root.routes";

import * as serviceWorker from "./serviceWorker";

import "./index.css";
import "./styles/shared.css";

ReactDOM.render(
  <Router history={history}>{renderRoutes(routes)}</Router>,
  document.getElementById("root")
);

serviceWorker.unregister();
