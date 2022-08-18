import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import i18next from "./helpers/i18n/index";

import hashHistory from "./root/root.history";

import * as serviceWorker from "./serviceWorker";

import "./index.css";
import "./styles/shared.css";
import Routes from "./root/root.routes";
import './styles/fonts.css';

ReactDOM.render(
  <I18nextProvider i18n={i18next}>
    <HashRouter ab basename="/" history={hashHistory}>
      <Routes />
    </HashRouter>
  </I18nextProvider>,
  document.getElementById("root")
);

serviceWorker.unregister();
