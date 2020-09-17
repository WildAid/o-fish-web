import React, { Component, Fragment } from "react";
import { withTranslation } from "react-i18next";
import moment from "moment";

import DatesRange from "./../partials/dates-range/dates-range.component";
import BoardingsTable from "./../boardings/boardings-table/boardings-table.component";
import UserPhoto from "./../partials/user-photo/user-photo.component";
import LoadingPanel from "./../partials/loading-panel/loading-panel.component";
import SearchPanel from "./../partials/search-panel/search-panel.component";

import { getHighlightedText } from "./../../helpers/get-data";

import BoardingService from "./../../services/boarding.service";
import AuthService from "./../../services/auth.service";
import SearchService from "./../../services/search.service";

const authService = AuthService.getInstance();
const boardingService = BoardingService.getInstance();
const searchService = SearchService.getInstance();

class AgenciesDashboard extends Component {
  state = {
    boardings: [],
    vessels: [],
    crew: [],
    total: 0,
    limit: 50,
    offset: 0,
    isMapShown: true,
    highlighted: [],
    loading: true,
    page: 1,
    searchQuery: "",
    currentFilter: {
      date: { $gt: moment().subtract(1, "year").toDate() },
    },
  };

  handlePageChange = (e, page) => {
    const { limit } = this.state;
    const newOffset = (page - 1) * limit;
    this.loadData({ offset: newOffset, page: page });
  };

  showMap = () => {
    const { isMapShown } = this.state;

    this.setState({
      isMapShown: !isMapShown,
    });
  };

  loadData(newState) {
    newState = newState || {};
    newState.loading = true;

    this.setState(newState, () => {
      const { limit, offset, currentFilter, searchQuery } = this.state;

      boardingService
        .getBoardingsWithFacet(limit, offset, searchQuery, {
          ...currentFilter,
          "reportingOfficer.email": authService.user.email,
        })
        .then((data) => {
          this.setState({
            loading: false,
            boardings: data.boardings,
            total: data.amount && data.amount[0] ? data.amount[0].total : 0,
            highlighted: getHighlightedText(
              data.highlighted ? data.highlighted : []
            ),
          });
        })
        .catch((error) => {
          console.error(error);
        });
    });
  }

  changeFilter = (filter) => {
    let filterObject = {
      $and: [
        {
          date: { $gt: new Date(filter.start) },
        },
        {
          date: { $lte: new Date(filter.end) },
        },
      ],
    };
    this.setState({ currentFilter: filterObject });
  };

  search = (value) => {
    searchService
      .search(value)
      .then((data) => {
        this.setState({ ...data });
      })
      .catch((error) => {
        console.error(error);
      });
    this.setState({ searchQuery: value });
  };

  componentDidMount() {
    this.loadData();
  }

  render() {
    const { changeFilter, t } = this.props;
    const {
      boardings,
      vessels,
      crew,
      total,
      limit,
      isMapShown,
      highlighted,
      page,
      loading,
      searchQuery,
    } = this.state;
    const { user } = authService;

    return (
      <div className="flex-column full-view align-center global-agencies-page">
        <SearchPanel
          handler={this.search}
          value={searchQuery}
          boardings={boardings}
          vessels={vessels}
          crew={crew}
          searchWords={highlighted}
          isAutofill={true}
        />
        <div className="standard-view page-header">
          <div className="flex-row full-view justify-between align-center margin-top">
            <div className="flex-column margin-bottom">
              <div className="item-label">{t("HOME_PAGE.DASHBOARD")}</div>
              <div className="font-35">{t("NAVIGATION.AGENCIES")}</div>
            </div>
            <DatesRange onFilterChange={changeFilter} />
          </div>
        </div>
        <div className="flex-column align-center white-bg box-shadow standard-view margin-top margin-bottom padding-bottom">
          {/* {!!agencies.length && ( */}
          {/* <Fragment>
            <div className="flex-row justify-between align-center full-view padding-top padding-bottom border-bottom">
              <div className="item-name padding-left">
                {t("HOME_PAGE.COMPLIANCE_RATE")}
              </div>
              <div className="blue-btn">
                <img
                  className="icon"
                  src={require("../../assets/filter-icon.png")}
                  alt="no logo"
                />
              </div>
            </div>
            <div className="table-wrapper">
              <table className="agencies-table custom-table">
                <thead>
                  <tr className="table-row row-head border-bottom">
                    <td>{t("TABLE.AGENCY")}</td>
                    <td>{t("NAVIGATION.BOARDINGS")}</td>
                    <td>{t("TABLE.VIOLATIONS")}</td>
                    <td>{t("HOME_PAGE.COMPLIANCE_RATE")}</td>
                    <td></td>
                  </tr>
                </thead>
                <tbody>
                  {agencies.map((item, ind) => (
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
                      <td
                        className="blue-color"
                        onClick={(e) => {
                          e.stopPropagation();
                          goToPage(EDIT_AGENCIES_PAGE, item._id);
                        }}
                      >
                        {t("BUTTONS.EDIT")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Fragment> */}
          {/* )} */}
        </div>
      </div>
    );
  }
}

export default withTranslation("translation")(AgenciesDashboard);
