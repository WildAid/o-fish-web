import React from "react";
import withRouter from "../../helpers/withRouter";
import Pagination from "@material-ui/lab/Pagination";
import { withTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

import SearchPanel from "../partials/search-panel/search-panel.component";


import {
  getHighlightedText,
  goToPage,
} from "./../../helpers/get-data";

import AgencyService from "./../../services/agency.service";
import SearchService from "./../../services/search.service";
import AuthService from "./../../services/auth.service";

import {
  VIEW_AGENCIES_PAGE,
  EDIT_AGENCIES_PAGE,
  NEW_AGENCIES_PAGE,
} from "./../../root/root.constants";

import "./agencies.css";

const agencyService = AgencyService.getInstance();
const searchService = SearchService.getInstance();
const authService = AuthService.getInstance();

class AgenciesMain extends React.Component {
  state = {
    agencies: [],
    total: 0,
    limit: 50,
    offset: 0,
    page: 1,
    loading: false,
    searchQuery:
      searchService.searchResults && searchService.searchResults.query
        ? searchService.searchResults.query
        : "",
    highlighted: [],
    currentFilter: null,
    isAdmin: false,
    isAgencyAdmin: false,
  };

  search = (value) => {
    if (searchService.searchResults && searchService.searchResults.query) {
      searchService.searchResults.query = value;
    }
    this.loadData({
      offset: 0,
      searchQuery: value,
    });
  };

  handlePageChange = (e, page) => {
    const { limit } = this.state;

    const newOffset = (page - 1) * limit;

    this.loadData({
      offset: newOffset,
      page: page,
    });
  };

  goTo = (e, path, id) => {
    this.props.router.navigate(path.replace(":id", id));
    e.stopPropagation();
  };

  getAgenciesWithOfficers = (agencies, officers) => {
    return agencies.map((agency) => {
      if (officers) {
        var agencyWithOfficers = officers.find(
          (el) => el._id[0] === agency.name
        );
      }
      if (agencyWithOfficers) {
        agency.officers = Array.from(new Set(agencyWithOfficers.officers))
          .length;
      }
      return agency;
    });
  };

  loadData(newState) {
    newState = newState || {};
    newState.loading = true;
    this.setState(newState, () => {
      const { limit, offset, searchQuery, currentFilter } = this.state;

      agencyService
        .searchAgencies(limit, offset, searchQuery, currentFilter)
        .then((data) => {
          this.setState({
            loading: false,
            agencies:
              this.getAgenciesWithOfficers(data.agencies, data.officers) || [],
            total: data.amount && data.amount[0] ? data.amount[0].total : 0,
            highlighted: data.highlighted
              ? getHighlightedText(data.highlighted)
              : [],
          });
        })
        .catch((error) => {
          console.error(error);
        });
    });
  }

  componentDidMount() {
    if (authService.user.global.admin) {
      this.loadData({ isAdmin: true });
    } else if (authService.user.agency.admin) {
      this.loadData({ isAgencyAdmin: true });
    } else if (authService.user.agency.admin && authService.user.global.admin) {
      this.loadData({ isAgencyAdmin: true, isAdmin: true });
    }
  }

  render() {
    const {
      agencies,
      total,
      limit,
      page,
      searchQuery,
      loading,
      isAdmin,
      isAgencyAdmin,
    } = this.state;
    const { t } = this.props;

    return isAdmin || isAgencyAdmin ? (
      <div className="padding-bottom flex-column align-center agencies-page">
        <SearchPanel
          handler={this.search}
          value={searchQuery}
          isAutofill={false}
        />
        <div className="flex-row justify-between align-center padding-top standard-view">
          <div>
            <div className="item-label">{t("NAVIGATION.AGENCIES")}</div>
            <div className="items-amount">
              {loading
                ? t("LOADING.LOADING")
                : total
                  ? `${total} ${t("NAVIGATION.AGENCIES")}`
                  : t("WARNINGS.NO_AGENCIES")}
            </div>
          </div>
          {isAdmin && !isAgencyAdmin && (
            <NavLink
              onClick={this.navigate}
              className="white-btn "
              to={NEW_AGENCIES_PAGE}
            >
              {t("NAVIGATION.CREATE_NEW_AGENCY")}
            </NavLink>
          )}
        </div>
        {!!agencies.length && (
          <div className="standard-view flex-row justify-start">
            <div className="blue-btn">
              {t("FILTER.FILTER")}
              <img
                className="custom-down-arrow"
                src={require("../../assets/angle-arrow-down.svg").default}
                alt="no arrow img"
              />
            </div>
          </div>
        )}
        {!!agencies.length && (
          <div className="table-wrapper">
            <table className="agencies-table custom-table">
              <thead>
                <tr className="table-row row-head border-bottom">
                  <td>{t("TABLE.AGENCY")}</td>
                  <td>{t("TABLE.DESCRIPTION")}</td>
                  <td>{t("TABLE.OFFICERS")}</td>
                  <td>{t("TABLE.STATUS")}</td>
                  <td></td>
                </tr>
              </thead>
              <tbody>
                {agencies.map((item, ind) => {
                  const status = item.active ? "active" : "inactive";

                  return (
                    <tr
                      className="table-row row-body"
                      key={ind}
                      onClick={() =>
                        (!authService.user.agency.admin &&
                          authService.user.global.admin) ||
                          authService.user.global.admin
                          ? goToPage(VIEW_AGENCIES_PAGE, item._id)
                          : authService.user.agency.name === item.name
                            ? goToPage(VIEW_AGENCIES_PAGE, item._id)
                            : ""
                      }
                    >
                      <td className="blue-color">{item.name}</td>
                      <td>{item.description}</td>
                      <td>{item.officers || "N/A"}</td>
                      <td>
                        <div className={`status-icon ${status}-status-icon`}>
                          {status}
                        </div>
                      </td>
                      {authService.user.agency.admin &&
                        !authService.user.global.admin &&
                        authService.user.agency.name === item.name ? (
                        <td
                          className="blue-color"
                          onClick={(e) => {
                            e.stopPropagation();
                            goToPage(EDIT_AGENCIES_PAGE, item._id);
                          }}
                        >
                          {t("BUTTONS.EDIT")}
                        </td>
                      ) : authService.user.global.admin ? (
                        <td
                          className="blue-color"
                          onClick={(e) => {
                            e.stopPropagation();
                            goToPage(EDIT_AGENCIES_PAGE, item._id);
                          }}
                        >
                          {t("BUTTONS.EDIT")}
                        </td>
                      ) : (
                        <td></td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        {total > limit && (
          <Pagination
            page={page}
            count={Math.ceil(total / limit)}
            shape="rounded"
            onChange={this.handlePageChange}
          />
        )}
      </div>
    ) : (
      <div className="flex-row padding-top justify-center">
        {t("WARNINGS.NOT_AUTHORIZED")}
      </div>
    );
  }
}

export default withRouter(withTranslation("translation")(AgenciesMain));
