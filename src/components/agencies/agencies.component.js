import React from "react";
import { withRouter } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";

import SearchPanel from "../partials/search-panel/search-panel.component";

import history from "../../root/root.history";

import { getHighlightedText, goToPage } from "./../../helpers/get-data";

import AgencyService from "./../../services/agency.service";
import SearchService from "./../../services/search.service";

import {
  VIEW_AGENCIES_PAGE,
  EDIT_AGENCIES_PAGE,
} from "./../../root/root.constants";

import "./agencies.css";

const agencyService = AgencyService.getInstance();
const searchService = SearchService.getInstance();

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
    history.push(path.replace(":id", id));
    e.stopPropagation();
  };

  loadData(newState) {
    newState = newState || {};
    newState.loading = true;
    this.setState(newState, () => {
      const { limit, offset, searchQuery, currentFilter } = this.state;

      agencyService
        .getAgencies(limit, offset, searchQuery, currentFilter)
        .then((data) => {
          this.setState({
            loading: false,
            agencies: data.agencies || [],
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
    const { agencies, total, limit, page, searchQuery, loading } = this.state;

    return (
      <div className="padding-bottom flex-column align-center">
        <SearchPanel
          handler={this.search}
          value={searchQuery}
          isAutofill={false}
        />
        <div className="flex-row justify-between standard-view">
          <div className="items-amount">
            {loading
              ? "Loading..."
              : total
              ? `${total} Agencies`
              : "No Agencies found"}
          </div>
        </div>
        {!!agencies.length && (
          <div className="standard-view">
            <button className="blue-btn">+ Filter</button>
          </div>
        )}
        {!!agencies.length && (
          <div className="table-wrapper">
            <table className="agencies-table custom-table">
              <thead>
                <tr className="table-row row-head border-bottom">
                  <td>Agency</td>
                  <td>Description</td>
                  <td>Officers</td>
                  <td>Status</td>
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
                      onClick={() => goToPage(VIEW_AGENCIES_PAGE, item._id)}
                    >
                      <td className="blue-color">{item.name}</td>
                      <td>{item.description}</td>
                      <td>{item.officers || "N/A"}</td>
                      <td>
                        <div className={`status-icon ${status}-status-icon`}>
                          {status}
                        </div>
                      </td>
                      <td className="blue-color">
                        <div
                          className="flex-row justify-center"
                          onClick={(e) => this.goTo(e, EDIT_AGENCIES_PAGE)}
                        >
                          Edit
                        </div>
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

export default withRouter(AgenciesMain);
