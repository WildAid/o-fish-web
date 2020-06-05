import React, { Component } from "react";
import { withRouter } from "react-router";
import { NavLink } from "react-router-dom";

import {
  HOME_PAGE,
  BOARDINGS_PAGE,
  VESSELS_PAGE,
  CREW_PAGE,
  USERS_PAGE,
  AGENCIES_PAGE,
  NEW_USER_PAGE,
  NEW_AGENCIES_PAGE,
} from "../../../root/root.constants.js";

import { resetSearch } from "./../../../helpers/get-data";

import "../header.css";

class Navigation extends Component {
  state = {
    activeMenu: "",
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

  render() {
    const { activeMenu } = this.state;

    return (
      <div className="flex-row align-center half-row-view">
        <NavLink to={HOME_PAGE}>
          <div className="header-logo-img">
            <img
              className="icon"
              src={require("../../../assets/logo.png")}
              alt="no logo"
            />
          </div>
        </NavLink>
        <div className="flex-row justify-between full-view padding-left">
          <div className="flex-column relative">
            <div
              className="flex-row align-baseline pointer"
              onClick={() => this.showActiveMenu("dashboard")}
            >
              <div className="nav-item">Dashboard</div>
              <img
                className="custom-down-arrow"
                src={require("../../../assets/angle-arrow-down.svg")}
                alt="no location img"
              />
            </div>
            {activeMenu === "dashboard" && (
              <div className="flex-column absolute box-shadow white-bg nav-menu dashboard-menu">
                <NavLink
                  onClick={this.navigate}
                  className="nav-link"
                  to={HOME_PAGE}
                >
                  Global Dashboard
                </NavLink>
              </div>
            )}
          </div>
          <div className="flex-column relative">
            <div
              className="flex-row align-baseline pointer"
              onClick={() => this.showActiveMenu("boarding")}
            >
              <div className="nav-item">Boarding Records</div>
              <img
                className="custom-down-arrow"
                src={require("../../../assets/angle-arrow-down.svg")}
                alt="no location img"
              />
            </div>
            {activeMenu === "boarding" && (
              <div className="flex-column absolute box-shadow white-bg nav-menu boardings-menu">
                <NavLink
                  onClick={this.navigate}
                  className="nav-link"
                  to={BOARDINGS_PAGE}
                >
                  Boardings
                </NavLink>
                <NavLink
                  onClick={this.navigate}
                  className="nav-link"
                  to={VESSELS_PAGE}
                >
                  Vessels
                </NavLink>
                <NavLink
                  onClick={this.navigate}
                  className="nav-link"
                  to={CREW_PAGE}
                >
                  Crew
                </NavLink>
              </div>
            )}
          </div>
          <div className="flex-column relative">
            <div
              className="flex-row align-baseline pointer"
              onClick={() => this.showActiveMenu("users")}
            >
              <div className="nav-item">Users</div>
              <img
                className="custom-down-arrow"
                src={require("../../../assets/angle-arrow-down.svg")}
                alt="no location img"
              />
            </div>
            {activeMenu === "users" && (
              <div className="flex-column absolute box-shadow white-bg nav-menu users-menu">
                <NavLink
                  onClick={this.navigate}
                  className="nav-link"
                  to={USERS_PAGE}
                >
                  All Users
                </NavLink>
                <NavLink
                  onClick={this.navigate}
                  className="nav-link"
                  to={NEW_USER_PAGE}
                >
                  Create New User
                </NavLink>
              </div>
            )}
          </div>
          <div className="flex-column relative">
            <div
              className="flex-row align-baseline pointer"
              onClick={() => this.showActiveMenu("agencies")}
            >
              <div className="nav-item">Agencies</div>
              <img
                className="custom-down-arrow"
                src={require("../../../assets/angle-arrow-down.svg")}
                alt="no location img"
              />
            </div>
            {activeMenu === "agencies" && (
              <div className="flex-column absolute box-shadow white-bg nav-menu agencies-menu">
                <NavLink
                  onClick={this.navigate}
                  className="nav-link"
                  to={AGENCIES_PAGE}
                >
                  All Agencies
                </NavLink>
                <NavLink
                  onClick={this.navigate}
                  className="nav-link"
                  to={NEW_AGENCIES_PAGE}
                >
                  Create New Agency
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Navigation);
