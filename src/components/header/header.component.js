import React, { Component } from "react";
import { withRouter } from "react-router";

import Navigation from "./navigation/navigation.component";
import Profile from "./profile/profile.component";

import "./header.css";

class Header extends Component {
  render() {
    return (
      <header className="flex-row align-center justify-center full-view header-top">
        <div className="flex-row align-center justify-between standard-view">
          <Navigation />
          <Profile />
        </div>
      </header>
    );
  }
}

export default withRouter(Header);
