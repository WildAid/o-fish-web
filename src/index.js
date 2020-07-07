import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import { I18nextProvider } from "react-i18next";
import i18next from "./helpers/i18n/index";

import history from "./root/root.history";
import routes from "./root/root.routes";

import * as serviceWorker from "./serviceWorker";

import "./index.css";
import "./styles/shared.css";

ReactDOM.render(
  <I18nextProvider i18n={i18next}>
    <Router history={history}>{renderRoutes(routes)}</Router>
  </I18nextProvider>,
  document.getElementById("root")
);

serviceWorker.unregister();
