import React, { Component, Fragment } from "react";
import { NavLink } from "react-router-dom";

import { EDIT_AGENCIES_PAGE } from "./../../../root/root.constants";

import AgencyService from "./../../../services/agency.service";

import "./view-agency.css";

const agencyService = AgencyService.getInstance();

class ViewAgency extends Component {
  state = {
    agencyInfo: {
      officers: [],
      catches: [],
      violations: [],
    },
    activeTab: 1,
    loading: false,
  };

  handleChangeTab = (newTab) => {
    this.setState({
      activeTab: newTab,
    });
  };

  componentDidMount() {
    const { id } = this.props.match.params;

    this.setState({ loading: true }, () => {
      const { limit, offset, searchQuery, currentFilter } = this.state;

      agencyService
        .getAgency(id)
        .then((data) => {
          const agencyInfo = { ...data, ...this.state.agencyInfo };

          this.setState({
            agencyInfo,
            loading: false
          });
        })
        .catch((error) => {
          console.error(error);
        });
    });
  }

  render() {
    const { agencyInfo, activeTab, loading } = this.state;

    return (
      <div className="padding-bottom flex-column align-center">
        <div className="flex-row justify-between standard-view border-bottom agency-header">
          <div className="flex-column">
            {loading ? (
              "Loading..."
            ) : (
              <Fragment>
                <div className="item-label">Agency</div>
                <div className="item-name">{agencyInfo.agency}</div>
                <div className="font-16">{agencyInfo.description}</div>
                <div className="flex-row agency-box">
                  <div className="agency-box-img">
                    <img
                      className="icon"
                      src={require("../../../assets/site-icon.png")}
                      alt="no logo"
                    />
                  </div>
                  {agencyInfo.site}
                </div>
                <div className="flex-row agency-box">
                  <div className="agency-box-img">
                    <img
                      className="icon"
                      src={require("../../../assets/email-icon.png")}
                      alt="no logo"
                    />
                  </div>
                  {agencyInfo.email}
                </div>
              </Fragment>
            )}
          </div>
          <NavLink to={EDIT_AGENCIES_PAGE}>
            <button className="blue-btn">Edit Agency Information</button>
          </NavLink>
        </div>
        <div className="flex-column justify-between standard-view">
          <div className="flex-row">
            <div
              className={`agency-tab ${
                1 === activeTab ? "active-agency-tab" : ""
              }`}
              onClick={() => this.handleChangeTab(1)}
            >
              Officers
            </div>
            <div
              className={`agency-tab ${
                2 === activeTab ? "active-agency-tab" : ""
              }`}
              onClick={() => this.handleChangeTab(2)}
            >
              Form Data
            </div>
          </div>
          <div className="flex-row">
            {1 === activeTab ? (
              <div className="full-view white-bg box-shadow agency-tab-content">
                <table className="custom-table">
                  <thead>
                    <tr className="border-bottom">
                      <td>
                        <div className="flex-row align-center justify-between agency-info-box">
                          <div className="table-name">
                            Officers {`(${agencyInfo.officers.length})`}
                          </div>
                          <button className="white-btn">
                            Create Activity Report
                          </button>
                        </div>
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    {agencyInfo.officers
                      ? agencyInfo.officers.map((officer, ind) => (
                          <tr className="table-row" key={ind}>
                            <td>
                              <div className="flex-row align-center agency-info-box">
                                <div className="officer-container-img">
                                  <img
                                    className="icon"
                                    src={require("../../../assets/crew-icon.png")}
                                    alt="no logo"
                                  />
                                </div>
                                {officer.name}
                              </div>
                            </td>
                          </tr>
                        ))
                      : "No officers found"}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="full-view white-bg box-shadow agency-tab-content">
                <div className="flex-row form-content">
                  <div className="flex-column box-shadow justify-between form-content-menu">
                    <div className="form-menu-item active-form-menu-item">
                      Catch
                      {agencyInfo.catches
                        ? `(${agencyInfo.catches.length})`
                        : ""}
                    </div>
                    <div className="form-menu-item">
                      Violations
                      {agencyInfo.violations
                        ? `(${agencyInfo.violations.length})`
                        : ""}
                    </div>
                    <div className="form-menu-item">
                      Prefered Nationatities
                      {agencyInfo.officers
                        ? `(${agencyInfo.officers.length})`
                        : ""}
                    </div>
                  </div>
                  <div className="flex-column form-search">
                    <div className="flex-row justify-between align-center form-search-panel">
                      <input
                        className="standard-view form-search-field"
                        type="search"
                        placeholder="Search Species"
                      ></input>
                      <button className="blue-btn">+ Add species</button>
                    </div>
                    <div className="box-shadow form-checkbox-list">
                      {agencyInfo.catches
                        ? agencyInfo.catches.map((item, ind) => (
                            <div
                              className="flex-row align-center form-info-box"
                              key={ind}
                            >
                              <input className="check-item" type="checkbox" />
                              {item.name}
                            </div>
                          ))
                        : "No catches found"}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default ViewAgency;
