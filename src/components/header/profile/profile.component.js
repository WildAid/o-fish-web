import React, { Component } from "react";

import storage from "../../../helpers/localStorageData";

import AuthService from "../../../services/auth.service";

import "./profile.css";

const authService = AuthService.getInstance();

class Profile extends Component {
  state = {
    isMenuOpen: false,
  };

  logout = () => {
    storage.clear();
    window.location.href = "/";
  };

  render() {
    const { isMenuOpen } = this.state;
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
          {authService.isAuthenticated
            ? authService.user.profile.data.email
            : "Not authenticated!"}
        </div>
        <img
          className="custom-down-arrow"
          src={require("../../../assets/angle-arrow-down.svg")}
          alt="no location img"
        />
        {isMenuOpen && (
          <div className="flex-column absolute box-shadow white-bg nav-menu">
            <div onClick={this.logout} className="logout">
              Log Out
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Profile;
