import React, { Component, Fragment } from "react";
import { NavLink } from "react-router-dom";
import { withTranslation } from "react-i18next";

import { EDIT_AGENCIES_PAGE } from "./../../../root/root.constants";

import { goToPage } from "./../../../helpers/get-data";

import AgencyService from "./../../../services/agency.service";
import AgencyFormData from "../form-data/form-data.js"

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
    loading: false
  };

  handleChangeTab = (newTab) => {
    this.setState({
      activeTab: newTab,
    });
  };

  componentDidMount() {
    const { id } = this.props.match.params;

    this.setState({ loading: true }, () => {
      agencyService
        .getAgency(id)
        .then((data) => {
          const agencyInfo = { ...data, ...this.state.agencyInfo };

          this.setState({
            agencyInfo,
            loading: false,
          });
        })
        .catch((error) => {
          console.error(error);
        });
    });
  }

  render() {
    const { agencyInfo, activeTab, loading } = this.state;
    const { t } = this.props;

    return (
      <div className="padding-bottom flex-column align-center">
        <div className="flex-row justify-between standard-view border-bottom agency-header">
          <div className="flex-column">
            {loading ? (
              t("LOADING.LOADING")
            ) : (
              <Fragment>
                <div className="item-label">{t("TABLE.AGENCY")}</div>
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
          <NavLink to={EDIT_AGENCIES_PAGE.replace(":id", agencyInfo._id)}>
            <button className="blue-btn">{t("BUTTONS.EDIT_AGENCY")}</button>
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
              {t("TABLE.OFFICERS")}
            </div>
            <div
              className={`agency-tab ${
                2 === activeTab ? "active-agency-tab" : ""
              }`}
              onClick={() => this.handleChangeTab(2)}
            >
              {t("AGENCY_PAGE.FORM_DATA")}
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
                            {`${t("TABLE.OFFICERS")} (${
                              agencyInfo.officers.length
                            })`}
                          </div>
                          <button className="white-btn">
                            {t("BUTTONS.CREATE_REPORT")}
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
                      : t("WARNINGS.NO_OFFICERS")}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="full-view white-bg box-shadow agency-tab-content">
                    <AgencyFormData agency={agencyInfo}></AgencyFormData>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation("translation")(ViewAgency);
