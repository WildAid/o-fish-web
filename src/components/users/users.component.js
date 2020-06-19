import React from "react";
import { withRouter } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";
import Highlighter from "react-highlight-words";
import moment from "moment";

import SearchPanel from "../partials/search-panel/search-panel.component";

import { checkUserType, getHighlightedText } from "../../helpers/get-data";

import UserService from "./../../services/user.service";
import SearchService from "./../../services/search.service";

import {
  USERS_ACTIVITIES_PAGE,
  EDIT_USER_PAGE,
} from "./../../root/root.constants";

import "./users.css";

const userService = UserService.getInstance();
const searchService = SearchService.getInstance();

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
    highlighted: [],
    currentFilter: null,
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
    newState = newState ? newState : {};
    newState.loading = true;
    this.setState(newState, () => {
      const { limit, offset, searchQuery, currentFilter } = this.state;

      userService
        .getUsers(limit, offset, searchQuery, currentFilter)
        .then((data) => {
          this.setState({
            loading: false,
            users: data.users || [],
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
    this.loadData();
  }

  render() {
    const {
      users,
      total,
      limit,
      activitiesAmount,
      page,
      searchQuery,
      highlighted,
      loading,
    } = this.state;

    return (
      <div className="padding-bottom flex-column align-center">
        <SearchPanel handler={this.search} value={searchQuery} />
        <div className="flex-row standard-view">
          <div className="items-amount">
            {loading
              ? "Loading..."
              : !!users.length
              ? `${total} Users`
              : "No Users found"}
          </div>
        </div>
        {!!users.length && (
          <div className="flex-row standard-view">
            <NavLink to={USERS_ACTIVITIES_PAGE}>
              <button className="blue-btn">
                See Activity
                {activitiesAmount.length ? `(${activitiesAmount.length})` : ""}
              </button>
            </NavLink>
            <button className="blue-btn">+ Filter</button>
          </div>
        )}
        {!!users.length && (
          <div className="table-wrapper">
            <table className="custom-table">
              <thead>
                <tr className="table-row row-head">
                  <td>
                    <div className="flex-row align-center">
                      <input className="check-item" type="checkbox" />
                      <p>Name</p>
                    </div>
                  </td>
                  <td>Agency</td>
                  <td>User Type</td>
                  <td>Created on</td>
                  <td>Status</td>
                  <td></td>
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
                          <div className="user-img">
                            <img
                              className="full-view"
                              src={require("../../assets/user-icon.png")}
                              alt="no logo"
                            />
                          </div>
                          <Highlighter
                            highlightClassName="highlighted"
                            searchWords={highlighted}
                            autoEscape={true}
                            textToHighlight={`${item.name.first} ${item.name.last}`}
                          />
                        </div>
                      </td>
                      <td>
                        <Highlighter
                          highlightClassName="highlighted"
                          searchWords={highlighted}
                          autoEscape={true}
                          textToHighlight={item.agency.name}
                        />
                      </td>
                      <td>{checkUserType(item)}</td>
                      <td>
                        {item.createdOn
                          ? moment(item.createdOn).format("LLL")
                          : "N/A"}
                      </td>
                      <td>
                        <div className={`status-icon ${status}-status-icon`}>
                          {status}
                        </div>
                      </td>
                      <td>
                        <NavLink to={EDIT_USER_PAGE}>
                          <div className="edit-img">
                            <img
                              className="full-view"
                              src={require("../../assets/edit-icon.png")}
                              alt="no icon"
                            />
                          </div>
                        </NavLink>
                      </td>
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

export default withRouter(UsersMain);
