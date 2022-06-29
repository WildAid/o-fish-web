import React from "react";
import withRouter from "../../helpers/withRouter";
import { NavLink } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";
import Highlighter from "react-highlight-words";
import moment from "moment";
import { withTranslation } from "react-i18next";

import UserPhoto from "./../partials/user-photo/user-photo.component";

import SearchPanel from "../partials/search-panel/search-panel.component";

import {
  checkUserType,
  getHighlightedText,
} from "../../helpers/get-data";

import UserService from "./../../services/user.service";
import SearchService from "./../../services/search.service";
import AuthService from "./../../services/auth.service";

import {
  // USERS_ACTIVITIES_PAGE,
  EDIT_USER_PAGE,
  NEW_USER_PAGE,
} from "./../../root/root.constants";

import "./users.css";

const userService = UserService.getInstance();
const searchService = SearchService.getInstance();
const authService = AuthService.getInstance();

class UsersMain extends React.Component {
  state = {
    users: [],
    total: 0,
    limit: 50,
    offset: 0,
    activitiesAmount: [],
    page: 1,
    loading: false,
    searchQuery:
      searchService.searchResults && searchService.searchResults.query
        ? searchService.searchResults.query
        : "",
    currentFilter: null,
  };

  goEditUser = (id) => {
    //TODO: Use router!
    this.props.router.navigate(EDIT_USER_PAGE.replace(":id", id));
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

  checkUsers = (e, user) => {
    const { activitiesAmount } = this.state;

    let newActivities = [...activitiesAmount];

    if (e.target.checked) {
      newActivities.push(user);
    } else {
      newActivities = newActivities.filter((el) => {
        return el.id !== user.id;
      });
    }

    this.setState({ activitiesAmount: newActivities });
  };

  loadData(newState) {
    newState = newState || {};
    newState.loading = true;
    this.setState(newState, () => {
      const { limit, offset, searchQuery, currentFilter } = this.state;

      userService
        .getUsers(limit, offset, searchQuery, currentFilter)
        .then((data) => {
          this.setState({
            loading: false,
            users: data.users || [],
            total: data.amount && data.amount[0] ? data.amount[0].total : 0
          });
        })
        .catch((error) => {
          console.error(error);
        });
    });
  }

  componentDidMount() {
    this.loadData();
  }

  render() {
    const { t } = this.props;
    const {
      users,
      total,
      limit,
      page,
      searchQuery,
      loading,
    } = this.state;

    const isGlobalAdmin = authService.user.global.admin;
    const isAgencyAdmin = authService.user.agency.admin;
    const isFieldOfficer =
      !authService.user.global.admin && !authService.user.agency.admin;

    return (
      <div
        className={`padding-bottom flex-column align-center users-page ${isAgencyAdmin && !isGlobalAdmin ? "agency-admin" : ""
          }`}
      >
        <SearchPanel
          handler={this.search}
          value={searchQuery}
          isAutofill={false}
        />
        <div className="flex-row justify-between align-center padding-top standard-view">
          <div>
            <div className="item-label">{t("NAVIGATION.ALL_USERS")}</div>
            <div className="items-amount">
              {loading
                ? t("LOADING.LOADING")
                : total
                  ? `${total} ${t("NAVIGATION.USERS")}`
                  : t("WARNINGS.NO_USERS")}
            </div>
          </div>
          {(isAgencyAdmin || isGlobalAdmin) && (
            <div className="flex-row align-center padding-right">
              {/* <NavLink to={USERS_ACTIVITIES_PAGE} className="blue-btn">
                {t("BUTTONS.CREATE_REPORT")}
              </NavLink> */}
              <NavLink className="white-btn" to={NEW_USER_PAGE}>
                {t("NAVIGATION.ADD_NEW_USER")}
              </NavLink>
            </div>
          )}
        </div>
        {!!users.length && (
          <div className="flex-row standard-view justify-start">
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
        {!!users.length && (
          <div className="table-wrapper">
            <table className="custom-table">
              <thead>
                <tr className="table-row row-head border-bottom">
                  <td>
                    <div className="flex-row align-center">
                      <input className="check-item" type="checkbox" />
                      <p>{t("TABLE.NAME")}</p>
                    </div>
                  </td>
                  {isGlobalAdmin && <td>{t("TABLE.AGENCY")}</td>}
                  <td>{t("CREATE_USER_PAGE.USER_GROUP")}</td>
                  <td>{t("CREATE_USER_PAGE.ROLE")}</td>
                  {isAgencyAdmin && !isGlobalAdmin && (
                    <td>{t("TABLE.DATE_ADDED")}</td>
                  )}
                  {isFieldOfficer && !isGlobalAdmin && (
                    <td>{t("CREATE_AGENCY_PAGE.EMAIL")}</td>
                  )}
                  <td>{t("TABLE.STATUS")}</td>
                  {isAgencyAdmin && <td></td>}
                  {(!isGlobalAdmin || !isAgencyAdmin) && !isFieldOfficer && (
                    <td></td>
                  )}
                </tr>
              </thead>
              <tbody>
                {users.map((item, ind) => {
                  const status = item.active ? "active" : "inactive";

                  return (
                    <tr className="table-row row-body" key={ind}>
                      <td>
                        <div className="flex-row align-center">
                          <input
                            className="check-item"
                            type="checkbox"
                            onChange={(e) => this.checkUsers(e, item)}
                          />
                          <UserPhoto
                            imageId={item.profilePic || ""}
                            defaultIcon={false}
                          />
                          <Highlighter
                            highlightClassName="highlighted"
                            searchWords={[searchQuery]}
                            autoEscape={true}
                            textToHighlight={`${item.name.first} ${item.name.last}`}
                          />
                        </div>
                      </td>
                      {isGlobalAdmin && (
                        <td>
                          <Highlighter
                            highlightClassName="highlighted"
                            searchWords={[searchQuery]}
                            autoEscape={true}
                            textToHighlight={item.agency.name || ""}
                          />
                        </td>
                      )}
                      <td>
                        {isGlobalAdmin
                          ? item.group
                            ? item.group.name
                            : item.userGroup
                              ? item.userGroup.name
                              : "N/A"
                          : item.userGroup}
                      </td>
                      <td>{checkUserType(item)}</td>
                      {isAgencyAdmin && !isGlobalAdmin && (
                        <td>{moment(item.createdOn).format("L")}</td>
                      )}
                      {isFieldOfficer && !isGlobalAdmin && (
                        <td>{item.email}</td>
                      )}
                      <td>
                        <div className={`status-icon ${status}-status-icon`}>
                          {status}
                        </div>
                      </td>
                      {(isAgencyAdmin || isGlobalAdmin) && (
                        <td>
                          <div
                            className="pointer see-all"
                            onClick={() => this.goEditUser(item._id)}
                          >
                            {t("BUTTONS.EDIT")}
                          </div>
                        </td>
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
    );
  }
}

export default withRouter(withTranslation("translation")(UsersMain));
