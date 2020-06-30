import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import { EDIT_AGENCIES_PAGE } from "./../../../root/root.constants";

import "./view-agency.css";

class ViewAgency extends Component {
  state = {
    agencyInfo: {
      officers: [],
      catches: [],
      violations: [],
    },
    activeTab: 1,
  };

  handleChangeTab = (newTab) => {
    this.setState({
      activeTab: newTab,
    });
  };

  componentDidMount() {
    //TODO get real agency with corresponded data
    // const { id } = this.props.match.params;
  }

  render() {
    const { agencyInfo, activeTab } = this.state;

    return (
      <div className="padding-bottom flex-column align-center">
        <div className="flex-row justify-between standard-view border-bottom agency-header">
          <div className="flex-column">
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
                    {agencyInfo.officers.map((officer, ind) => (
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
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="full-view white-bg box-shadow agency-tab-content">
                <div className="flex-row form-content">
                  <div className="flex-column box-shadow justify-between form-content-menu">
                    <div className="form-menu-item active-form-menu-item">
                      Catch {`(${agencyInfo.catches.length})`}
                    </div>
                    <div className="form-menu-item">
                      Violations {`(${agencyInfo.violations.length})`}
                    </div>
                    <div className="form-menu-item">
                      Prefered Nationatities {`(${agencyInfo.officers.length})`}
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
                      {agencyInfo.catches.map((item, ind) => (
                        <div
                          className="flex-row align-center form-info-box"
                          key={ind}
                        >
                          <input className="check-item" type="checkbox" />
                          {item.name}
                        </div>
                      ))}
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
