import React, { Component } from "react";
import { withRouter } from "react-router";
import { NavLink } from "react-router-dom";
import { withTranslation } from "react-i18next";

import {
  HOME_PAGE,
  BOARDINGS_PAGE,
  VESSELS_PAGE,
  CREW_PAGE,
  USERS_PAGE,
  AGENCIES_PAGE,
  NEW_USER_PAGE,
  PROFILE_PAGE,
  USERS_GROOP_PAGE,
} from "../../root/root.constants.js";

import UserPhoto from "./../partials/user-photo/user-photo.component";

import AuthService from "../../services/auth.service";

import { resetSearch } from "./../../helpers/get-data";
import storage from "./../../helpers/localStorageData";

import "./header.css";

const authService = AuthService.getInstance();

class Header extends Component {
  state = {
    activeMenu: "",
    currentUser: null,
  };

  showActiveMenu = (value) => {
    const { activeMenu } = this.state;

    const newActive = value === activeMenu ? "" : value;

    this.setState({ activeMenu: newActive });
  };

  navigate = () => {
    this.setState({ activeMenu: "" });
    resetSearch();
  };

  logout = () => {
    storage.clear();
    window.location.href = "/";
  };

  componentDidMount() {
    if (this.state.currentUser !== authService.user) {
      this.setState({ currentUser: { ...authService.user } });
    }
    authService.on("user-object-changed", (user) => {
      if (user) {
        this.setState({ currentUser: { ...user } });
      }
    });
  }

  render() {
    const { activeMenu, currentUser } = this.state;
    const { t } = this.props;

    return (
      currentUser && (
        <header className="flex-row align-center justify-center full-view header-top">
          <div className="flex-row align-center justify-between standard-view">
            <NavLink to={HOME_PAGE}>
              <div className="header-logo-img">
                <img
                  className="icon"
                  src={require("../../assets/logo.png")}
                  alt="no logo"
                />
              </div>
            </NavLink>
            {(currentUser.global.admin || currentUser.agency.admin) && (
              <div className="flex-row align-center justify-between full-view padding-left">
                <div className="flex-row align-center justify-between half-row-view padding-left">
                  <div className="relative">
                    <div
                      className="flex-row align-baseline pointer"
                      onClick={() => this.showActiveMenu("dashboard")}
                    >
                      <div className="nav-item">
                        {t("NAVIGATION.DASHBOARD")}
                      </div>
                      <img
                        className="custom-down-arrow"
                        src={require("../../assets/angle-arrow-down.svg")}
                        alt="no arrow img"
                      />
                    </div>
                    {activeMenu === "dashboard" && (
                      <div className="flex-column absolute box-shadow white-bg nav-menu dashboard-menu">
                        <NavLink
                          onClick={this.navigate}
                          className="nav-link"
                          to={HOME_PAGE}
                        >
                          {t("NAVIGATION.AGENCIES")}
                        </NavLink>
                        <NavLink
                          onClick={this.navigate}
                          className="nav-link"
                          to={HOME_PAGE}
                        >
                          {currentUser && currentUser.name
                            ? `${currentUser.name.first} ${currentUser.name.last}`
                            : t("WARNINGS.NOT_AUTHENTICATED")}
                        </NavLink>
                      </div>
                    )}
                  </div>
                  <div className="relative">
                    <div
                      className="flex-row align-baseline pointer"
                      onClick={() => this.showActiveMenu("boarding")}
                    >
                      <div className="nav-item">
                        {t("NAVIGATION.BOARDING_RECORDS")}
                      </div>
                      <img
                        className="custom-down-arrow"
                        src={require("../../assets/angle-arrow-down.svg")}
                        alt="no arrow img"
                      />
                    </div>
                    {activeMenu === "boarding" && (
                      <div className="flex-column absolute box-shadow white-bg nav-menu boardings-menu">
                        <NavLink
                          onClick={this.navigate}
                          className="nav-link"
                          to={BOARDINGS_PAGE.replace(":filter", "null")}
                        >
                          {t("NAVIGATION.BOARDINGS")}
                        </NavLink>
                        <NavLink
                          onClick={this.navigate}
                          className="nav-link"
                          to={VESSELS_PAGE.replace(":filter", "null")}
                        >
                          {t("NAVIGATION.VESSELS")}
                        </NavLink>
                        <NavLink
                          onClick={this.navigate}
                          className="nav-link"
                          to={CREW_PAGE.replace(":filter", "null")}
                        >
                          {t("NAVIGATION.CREW")}
                        </NavLink>
                      </div>
                    )}
                  </div>
                  <div className="relative">
                    <div
                      className="flex-row align-baseline pointer"
                      onClick={() => this.showActiveMenu("users")}
                    >
                      <div className="nav-item">{t("NAVIGATION.USERS")}</div>
                      <img
                        className="custom-down-arrow"
                        src={require("../../assets/angle-arrow-down.svg")}
                        alt="no arrow img"
                      />
                    </div>
                    {activeMenu === "users" && (
                      <div className="flex-column absolute box-shadow white-bg nav-menu users-menu">
                        <NavLink
                          onClick={this.navigate}
                          className="nav-link"
                          to={USERS_PAGE}
                        >
                          {t("NAVIGATION.ALL_USERS")}
                        </NavLink>
                        <NavLink
                          onClick={this.navigate}
                          className="nav-link"
                          to={NEW_USER_PAGE}
                        >
                          {t("NAVIGATION.CREATE_NEW_USER")}
                        </NavLink>
                      </div>
                    )}
                  </div>
                  <div className="relative">
                    <NavLink
                      onClick={this.navigate}
                      className="nav-menu-item"
                      to={AGENCIES_PAGE}
                    >
                      {t("NAVIGATION.AGENCIES")}
                    </NavLink>
                  </div>
                </div>
                <div className="relative">
                  <div
                    className="flex-row pointer"
                    onClick={() => this.showActiveMenu("profile")}
                  >
                    <div className="flex-row align-center">
                      <UserPhoto
                        imageId={currentUser ? currentUser.profilePic : null}
                        defaultIcon={true}
                      />
                    </div>
                    <div className="flex-row align-center profile-name">
                      {currentUser && currentUser.name
                        ? `${currentUser.name.first} ${currentUser.name.last}`
                        : t("WARNINGS.NOT_AUTHENTICATED")}
                    </div>
                    <img
                      className="custom-down-arrow"
                      src={require("../../assets/angle-arrow-down.svg")}
                      alt="no arrow img"
                    />
                  </div>
                  {activeMenu === "profile" && (
                    <div className="flex-column absolute box-shadow white-bg nav-menu profile-menu">
                      <NavLink
                        onClick={this.navigate}
                        className="nav-link"
                        to={PROFILE_PAGE}
                      >
                        {t("NAVIGATION.ACCOUNT")}
                      </NavLink>
                      <div className="nav-link pointer" onClick={this.logout}>
                        {t("NAVIGATION.LOG_OUT")}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
            {!currentUser.global.admin && !currentUser.agency.admin && (
              <div className="flex-row align-center justify-between full-view padding-left">
                <div className="flex-row align-center justify-between padding-left">
                  <NavLink to={HOME_PAGE} className="nav-menu-item">
                    {t("NAVIGATION.MY_DASHBOARD")}
                  </NavLink>
                  <div className="relative menu-item">
                    <div
                      className="flex-row align-baseline pointer"
                      onClick={() => this.showActiveMenu("boarding")}
                    >
                      <div className="nav-item">
                        {t("NAVIGATION.BOARDING_RECORDS")}
                      </div>
                      <img
                        className="custom-down-arrow"
                        src={require("../../assets/angle-arrow-down.svg")}
                        alt="no arrow img"
                      />
                    </div>
                    {activeMenu === "boarding" && (
                      <div className="flex-column absolute box-shadow white-bg nav-menu boardings-menu">
                        <NavLink
                          onClick={this.navigate}
                          className="nav-link"
                          to={BOARDINGS_PAGE.replace(":filter", "null")}
                        >
                          {t("NAVIGATION.BOARDINGS")}
                        </NavLink>
                        <NavLink
                          onClick={this.navigate}
                          className="nav-link"
                          to={VESSELS_PAGE.replace(":filter", "null")}
                        >
                          {t("NAVIGATION.VESSELS")}
                        </NavLink>
                        <NavLink
                          onClick={this.navigate}
                          className="nav-link"
                          to={CREW_PAGE.replace(":filter", "null")}
                        >
                          {t("NAVIGATION.CREW")}
                        </NavLink>
                      </div>
                    )}
                  </div>
                  <div className="relative menu-item">
                    <div
                      className="flex-row align-baseline pointer"
                      onClick={() => this.showActiveMenu("users")}
                    >
                      <div className="nav-item">{t("NAVIGATION.USERS")}</div>
                      <img
                        className="custom-down-arrow"
                        src={require("../../assets/angle-arrow-down.svg")}
                        alt="no arrow img"
                      />
                    </div>
                    {activeMenu === "users" && (
                      <div className="flex-column absolute box-shadow white-bg nav-menu users-menu">
                        <NavLink
                          onClick={this.navigate}
                          className="nav-link"
                          to={USERS_PAGE}
                        >
                          {t("NAVIGATION.ALL_USERS")}
                        </NavLink>
                        <NavLink
                          onClick={this.navigate}
                          className="nav-link"
                          to={USERS_GROOP_PAGE}
                        >
                          {t("NAVIGATION.USER_GROOP")}
                        </NavLink>
                      </div>
                    )}
                  </div>
                </div>
                <div className="relative">
                  <div
                    className="flex-row pointer"
                    onClick={() => this.showActiveMenu("profile")}
                  >
                    <div className="flex-row align-center">
                      <UserPhoto
                        imageId={currentUser ? currentUser.profilePic : null}
                        defaultIcon={true}
                      />
                    </div>
                    <div className="flex-row align-center profile-name">
                      {currentUser && currentUser.name
                        ? `${currentUser.name.first} ${currentUser.name.last}`
                        : t("WARNINGS.NOT_AUTHENTICATED")}
                    </div>
                    <img
                      className="custom-down-arrow"
                      src={require("../../assets/angle-arrow-down.svg")}
                      alt="no arrow img"
                    />
                  </div>
                  {activeMenu === "profile" && (
                    <div className="flex-column absolute box-shadow white-bg nav-menu profile-menu">
                      <NavLink
                        onClick={this.navigate}
                        className="nav-link"
                        to={PROFILE_PAGE}
                      >
                        {t("NAVIGATION.ACCOUNT")}
                      </NavLink>
                      <div className="nav-link pointer" onClick={this.logout}>
                        {t("NAVIGATION.LOG_OUT")}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </header>
      )
    );
  }
}

export default withRouter(withTranslation("translation")(Header));
