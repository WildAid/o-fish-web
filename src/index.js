import React from "react";
import ReactDOM from "react-dom";
import { Router, HashRouter } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import { I18nextProvider } from "react-i18next";
import i18next from "./helpers/i18n/index";

import hashHistory  from "./root/root.history";
import routes from "./root/root.routes";

import * as serviceWorker from "./serviceWorker";

import "./index.css";
import "./styles/shared.css";

ReactDOM.render(
  <I18nextProvider i18n={i18next}>
    <HashRouter basename="/" history={hashHistory}>{renderRoutes(routes)}</HashRouter>
  </I18nextProvider>,
  document.getElementById("root")
);

serviceWorker.unregister();
