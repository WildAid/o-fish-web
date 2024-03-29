import React, { Component, Fragment } from "react";
import { withTranslation } from "react-i18next";
import Pagination from "@material-ui/lab/Pagination";

import DatesRange from "./../partials/dates-range/dates-range.component";
import SearchPanel from "./../partials/search-panel/search-panel.component";

import { getHighlightedText } from "./../../helpers/get-data";

import SearchService from "./../../services/search.service";
import AgencyService from "./../../services/agency.service";

import { CHARTS_PAGE, BOARDINGS_PAGE } from "./../../root/root.constants";
import withRouter from "../../helpers/withRouter";

const searchService = SearchService.getInstance();
const agencyService = AgencyService.getInstance();

class AgenciesDashboard extends Component {
  state = {
    boardings: [],
    vessels: [],
    crew: [],
    agencies: [],
    total: 0,
    limit: 50,
    offset: 0,
    highlighted: [],
    loading: true,
    page: 1,
    searchQuery: "",
    currentFilter: null,
  };

  handlePageChange = (e, page) => {
    const { limit } = this.state;
    const newOffset = (page - 1) * limit;
    this.loadData({ offset: newOffset, page: page });
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
            agencies: data.agencies,
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

  changeFilter = (filter) => {
    let filterObject = {
      ...this.state.currentFilter,
      date: { $gt: new Date(filter.start), $lte: new Date(filter.end) }
    };

    this.loadData({ currentFilter: filterObject });
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
    const { t, router } = this.props;

    const {
      boardings,
      vessels,
      crew,
      agencies,
      total,
      limit,
      highlighted,
      page,
      loading,
      searchQuery,
    } = this.state;

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
              <div className="font-35">{t("NAVIGATION.AGENCIES_DASHBOARD")}</div>
            </div>
            <DatesRange onFilterChange={this.changeFilter} />
          </div>
        </div>
        {!loading ? (
          <div className="flex-column align-center white-bg box-shadow standard-view margin-top margin-bottom padding-bottom">
            {!!agencies.length && (
              <Fragment>
                <div className="flex-row justify-between align-center full-view padding-top padding-bottom border-bottom">
                  <div className="item-name padding-left">
                    {t("HOME_PAGE.COMPLIANCE_RATE")}
                  </div>
                  <div className="blue-btn filter-btn">
                    <img
                      className="icon"
                      src={require("../../assets/filter-icon.png").default}
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
                          onClick={() => router.navigate(CHARTS_PAGE.replace(":id", item.name))}
                        >
                          <td className="blue-color">{item.name}</td>
                          <td>{item.boardings}</td>
                          <td>{item.violations}</td>
                          <td>
                            {item.boardings
                              ? Math.round(
                                ((item.boardings - item.violations) /
                                  item.boardings) *
                                100
                              )
                              : 100}
                            %
                          </td>
                          <td
                            className="blue-color"
                            onClick={(e) => {
                              e.stopPropagation();
                              router.navigate(BOARDINGS_PAGE.replace(":filter", JSON.stringify({
                                agency: item.name,
                              })));
                            }}
                          >
                            {`${t("BUTTONS.VIEW")} ${t(
                              "NAVIGATION.BOARDINGS"
                            )}`}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Fragment>
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
          t("LOADING.LOADING")
        )}
      </div>
    );
  }
}

export default withRouter(withTranslation("translation")(AgenciesDashboard));
