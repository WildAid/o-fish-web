import React, { Component, Fragment } from "react";
import { NavLink } from "react-router-dom";
import { withTranslation } from "react-i18next";
import SearchIcon from "@material-ui/icons/Search";
import Pagination from "@material-ui/lab/Pagination";

import { EDIT_AGENCIES_PAGE, NEW_USER_PAGE,EDIT_USER_PAGE } from "./../../../root/root.constants";

import { checkUserType,goToPage } from "../../../helpers/get-data";

import AgencyService from "./../../../services/agency.service";
import AuthService from "../../../services/auth.service";

import AgencyFormData from "../form-data/form-data.js"
import AgencyDataSharing from "../data-sharing/data-sharing.js"
import UserPhoto from "../../partials/user-photo/user-photo.component";
import Highlighter from "react-highlight-words";

import "./view-agency.css";

const agencyService = AgencyService.getInstance();
const authService = AuthService.getInstance();

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

  goEditUser = (id) => {
    //TODO: Use router!
    goToPage(EDIT_USER_PAGE, id);
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
    const { agencyInfo, activeTab, loading, isFocused, total, limit, page } = this.state;

    const { t } = this.props;
    const isGlobalAdmin = authService.user.global.admin;
    const isAgencyAdmin = authService.user.agency.admin;
    const isFieldOfficer =
      !authService.user.global.admin && !authService.user.agency.admin;

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
              className={`agency-tab ${1 === activeTab ? "active-agency-tab" : ""
                }`}
              onClick={() => this.handleChangeTab(1)}
            >
              {t("TABLE.OFFICERS")}
            </div>
            <div
              className={`agency-tab ${2 === activeTab ? "active-agency-tab" : ""
                }`}
              onClick={() => this.handleChangeTab(2)}
            >
              {t("AGENCY_PAGE.FORM_DATA")}
            </div>
            <div
              className={`agency-tab ${3 === activeTab ? "active-agency-tab" : ""
                }`}
              onClick={() => this.handleChangeTab(3)}
            >
              {t("AGENCY_PAGE.DATA_SHARING")}
            </div>
          </div>
          <div className="flex-row">
            {1 === activeTab && (
              <div className="full-view white-bg box-shadow agency-tab-content">
                <div className="flex-row align-center justify-between agency-info-box">

                  <div className="table-name margin-left">
                    {`${agencyInfo.officers.length} ${t("TABLE.OFFICERS")}`}
                  </div>

                  <div className="flex-row align-center justify-between">
                    <div className={`flex-row officer-search-panel search ${isFocused ? "focused" : ""}`}>
                      <div className="flex-row align-center search-icon">
                        <SearchIcon htmlColor={isFocused ? `#0a4074` : "#979797"} />
                      </div>
                      <input
                        className="search-field officer-search-panel-input"
                        type="search"
                        placeholder={`${t("SEARCH.FILTER_SEARCH")} O-FISH`}
                        onChange={this.setSearch}
                        onFocus={() => this.setState({ isFocused: true })}
                      ></input>
                    </div>

                    <div className="margin-left margin-right">
                      <button className="white-btn">
                        {t("BUTTONS.CREATE_REPORT")}
                      </button>
                    </div>

                    <NavLink to={NEW_USER_PAGE}>
                      <button className="blue-btn">
                        {t("BUTTONS.ADD_NEW_USER")}
                      </button>
                    </NavLink>
                  </div>
                </div>
                {agencyInfo.officers ? (
                  <div className="margin-left margin-right">
                    <div className="margin-bottom">
                    <table className="custom-table">
                      <thead>
                        <tr className="table-row border-bottom officer-table-border-width">
                          <td>{t("TABLE.NAME")} </td>
                          <td>{t("CREATE_USER_PAGE.USER_GROUP")}</td>
                          <td>{t("CREATE_USER_PAGE.ROLE")}</td>
                          <td>{t("TABLE.STATUS")}</td>
                        </tr>
                      </thead>
                      <tbody>
                        {agencyInfo.officers.map((officer, ind) => {
                          const status = officer.active ? "active" : "inactive";
                          return (
                            <tr className="table-row" key={ind}>
                              <td>
                                <div className="flex-row align-center">
                                  <UserPhoto
                                    imageId={officer.profilePic || ""}
                                    defaultIcon={false}
                                  /><Highlighter
                                    highlightClassName="highlighted"
                                    searchWords={[]}
                                    autoEscape={true}
                                    textToHighlight={`${officer.name.first} ${officer.name.last}`}
                                  />
                                </div>
                              </td>
                              <td>
                                {isGlobalAdmin
                                  ? officer.group
                                    ? officer.group.name
                                    : officer.userGroup
                                      ? officer.userGroup.name
                                      : "N/A"
                                  : officer.userGroup}
                              </td>
                              <td>{checkUserType(officer)}</td>
                              {isFieldOfficer && !isGlobalAdmin && (
                                <td>{officer.email}</td>
                              )}
                              <td>
                                <div className={`status-icon ${status}-status-icon`}>
                                  {status}
                                </div>
                              </td>
                              {isAgencyAdmin && (
                                <td>
                                  <div
                                    className="pointer see-all"
                                    onClick={() => this.goEditUser(officer._id)}
                                  >
                                    {t("BUTTONS.EDIT")}
                                  </div>
                                </td>
                              )}
                            </tr>)
                        })}
                      </tbody>
                    </table>
                    </div>
                    { total > limit && (
                  <Pagination
                    page={page}
                    count={Math.ceil(total / limit)}
                    shape="rounded"
                    onChange={this.handlePageChange}
                  />
                )}
                  </div>
                ) : t("WARNINGS.NO_OFFICERS")}
              </div>
            )}
            {2 === activeTab && (
              <div className="full-view white-bg box-shadow agency-tab-content">
                <AgencyFormData agency={agencyInfo}></AgencyFormData>
              </div>
            )}
            {3 === activeTab && (
              <div className="full-view white-bg box-shadow agency-tab-content">
                <AgencyDataSharing agency={agencyInfo}></AgencyDataSharing>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation("translation")(ViewAgency);
