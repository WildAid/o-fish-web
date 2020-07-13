//@flow

import React, { Component } from "react";
import { renderRoutes } from "react-router-config";

import AuthService from "../services/auth.service";

import Header from "../components/header/header.component";

import "./root.css";

const authService = AuthService.getInstance();

class Root extends Component {
  render() {
    const { route } = this.props;

    return (
      <div className="root">
        {!!authService.isAuthenticated && <Header />}
        <main>{renderRoutes(route.routes)}</main>
      </div>
    );
  }
}

export default Root;
