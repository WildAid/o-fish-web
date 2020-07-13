import React, { Component } from "react";
import { renderRoutes } from "react-router-config";

import Header from "../components/header/header.component";
import { withAuth } from "../components/auth/auth.component";

import "./root.css";

class Root extends Component {
  render() {
    const { route, isAuthenticated } = this.props;

    return (
      <div className="root">
        {isAuthenticated && <Header />}
        <main>{renderRoutes(route.routes)}</main>
      </div>
    );
  }
}

export default withAuth(Root);
