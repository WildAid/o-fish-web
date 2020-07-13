import React, { Component } from "react";

import { withAuth } from "../../auth/auth.component";

import "./profile.css";

class Profile extends Component {
  state = {
    isMenuOpen: false,
  };

  render() {
    const { isMenuOpen } = this.state;
    const { logout, isAuthenticated, user } = this.props;

    return (
      <div
        className="profile flex-row profile-info pointer relative"
        onClick={() => this.setState({ isMenuOpen: !isMenuOpen })}
      >
        <div className="flex-row align-center profile-img">
          <img
            className="icon"
            src={require("../../../assets/user-header-icon.png")}
            alt="no logo"
          />
        </div>
        <div className="flex-row align-center profile-name">
          {isAuthenticated ? user.profile.data.email : "Not authenticated!"}
        </div>
        <img
          className="custom-down-arrow"
          src={require("../../../assets/angle-arrow-down.svg")}
          alt="no location img"
        />
        {isMenuOpen && (
          <div className="flex-column absolute box-shadow white-bg nav-menu">
            <div onClick={logout} className="logout">
              Log Out
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default withAuth(Profile);
