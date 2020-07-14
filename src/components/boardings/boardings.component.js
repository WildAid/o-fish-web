import React, { Component, Fragment } from "react";
import moment from "moment";
import { withTranslation } from "react-i18next";
import { withRouter } from "react-router";
import Pagination from "@material-ui/lab/Pagination";
import Highlighter from "react-highlight-words";

import history from "../../root/root.history";
import { getHighlightedText, goToPage } from "./../../helpers/get-data";

import ChartBox from "../charts/chart-box.component";
import SearchPanel from "./../partials/search-panel/search-panel.component";
import FilterPanel from "./../partials/filter-panel/filter-panel.component";
import LoadingPanel from "./../partials/loading-panel/loading-panel.component";
import RiskIcon from "./../partials/risk-icon/risk-icon.component";
import SearchResultsFor from "./../partials/search-results-for/search-results-for.component";

import SearchService from "./../../services/search.service";
import StitchService from "./../../services/stitch.service";
import BoardingService from "./../../services/boarding.service";

import { NEW_BOARDING_PAGE, VIEW_BOARDING_PAGE } from "../../root/root.constants.js";

import "./boardings.css";

const searchService = SearchService.getInstance();
const stitchService = StitchService.getInstance();
const boardingService = BoardingService.getInstance();

const boardingsChartOptions = {
  width: "100%",
  height: "100%",
  refreshInterval: 1300,
  useAuthenticatedAccess: true,
  ...stitchService.chartsConfig["boardings"],
};

const filterConfiguration = {
  Risk: [
    {
      name: "safetyLevel.red",
      field: "inspection.summary.safetyLevel.level",
      value: "Red",
      title: "Red",
      partTitle: "Risk: Red",
      type: "risk",
    },
    {
      name: "safetyLevel.amber",
      field: "inspection.summary.safetyLevel.level",
      value: "Amber",
      title: "Amber",
      partTitle: "Risk: Amber",
      type: "risk",
    },
    {
      name: "safetyLevel.green",
      field: "inspection.summary.safetyLevel.level",
      value: "Green",
      title: "Green",
      partTitle: "Risk: Green",
      type: "risk",
    },
  ],
  "Boarding Information": [
    {
      name: "date",
      title: "Date",
      type: "date",
    },
    {
      name: "date-from",
      title: "Date from",
      type: "date",
    },
    {
      name: "date-to",
      title: "Date To",
      type: "date",
    },
    {
      name: "time",
      field: "date",
      title: "Time",
      type: "time",
    },
    {
      name: "location",
      title: "Location",
      type: "location",
    },
  ],
  "Vessel Information": [
    {
      name: "vessel.name",
      title: "Vessel",
    },
    {
      name: "vessel.permitNumber",
      title: "Permit Number",
      type: "string-equal",
    },
    {
      name: "vessel.nationality",
      title: "Nationality",
    },
  ],
  "Last Delivery": [
    {
      name: "vessel.lastDelivery.date",
      title: "Date",
      partTitle: "LD Date",
      type: "date",
    },
    {
      name: "vessel.lastDelivery.business",
      title: "Business",
    },
    {
      name: "vessel.lastDelivery.location",
      title: "Location",
      partTitle: "LD Location",
    },
  ],
  Catch: [
    {
      name: "inspection.actualCatch.species",
      title: "Species",
    },
    {
      name: "inspection.actualCatch.weight",
      title: "Weight",
    },
    {
      name: "inspection.actualCatch.count",
      title: "Count",
    },
  ],
};

class Boardings extends Component {
  state = {
    boardings: [],
    total: 0,
    activePage: 10,
    limit: 50,
    offset: 0,
    isMapShown: true,
    currentFilter: null,
    searchQuery:
      searchService.searchResults && searchService.searchResults.query
        ? searchService.searchResults.query
        : "",
    highlighted: [],
    loading: true,
    page: 1,
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
    this.loadData({ offset: newOffset, page: page });
  };

  handleFilterChanged = (value) => {
    this.loadData({
      currentFilter: value,
    });
  };

  showMap = () => {
    const { isMapShown } = this.state;
    this.setState({
      isMapShown: !isMapShown,
    });
  };

  goNewBoarding = (boarding) => {
    history.push(NEW_BOARDING_PAGE);
  };

  loadData(newState) {
    newState = newState ? newState : {};
    newState.loading = true;
    this.setState(newState, () => {
      const { limit, offset, searchQuery, currentFilter } = this.state;
      boardingService
        .getBoardingsWithFacet(limit, offset, searchQuery, currentFilter)
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

  componentDidMount() {
    this.loadData();
  }

  render() {
    const {
      boardings,
      total,
      limit,
      loading,
      isMapShown,
      highlighted,
      searchQuery,
      page,
    } = this.state;
    const { t } = this.props;

    boardingsChartOptions.filter = {
      _id: { $in: boardings.map((item) => item._id) },
    };

    return (
      <div className="flex-column justify-center align-center padding-bottom">
        <SearchPanel
          handler={this.search}
          value={searchQuery}
          isAutofill={false}
        />
        <div className="flex-row justify-between standard-view align-center">
          {loading ? (
            <div className="items-amount">{t("LOADING.LOADING")}</div>
          ) : (
            <SearchResultsFor
              query={searchQuery}
              total={`${total} ${t("BOARDING_PAGE.VIEW_BOARDING.BOARDING")}`}
            />
          )}
          <button className="white-btn" onClick={this.goNewBoarding}>
            {`+ ${t("BUTTONS.NEW_BOARDING")}`}
          </button>
        </div>
        <div className="flex-row align-center standard-view">
          <div>{t("BOARDING_PAGE.ALL_DATES")} &#11206;</div>
          <div className="flex-row align-center show-map-handler">
            <input
              className="map-handler"
              type="checkbox"
              defaultChecked
              onChange={this.showMap}
            />
            <p>{t("BOARDING_PAGE.MAP")}</p>
          </div>
          <FilterPanel
            options={{ searchByFilter: true }}
            configuration={filterConfiguration}
            onFilterChanged={this.handleFilterChanged}
          />
        </div>

        {boardings && boardings.length && !loading ? (
          <Fragment>
            {isMapShown && (
              <div className="flex-row align-center all-boardings-map">
                <ChartBox
                  options={boardingsChartOptions}
                  className="with-map"
                />
              </div>
            )}
            <div className="table-wrapper">
              <table className="custom-table boardings-table">
                <thead>
                  <tr className="table-row row-head border-bottom">
                    <td>{t("TABLE.DATE")}</td>
                    <td>{t("TABLE.TIME")}</td>
                    <td>{t("TABLE.VESSEL")}</td>
                    <td>{t("TABLE.PERMIT_NUMBER")}</td>
                    <td>{t("TABLE.CAPTAIN")}</td>
                    <td>{t("TABLE.VIOLATIONS")}</td>
                    <td>{t("TABLE.BOARDED_BY")}</td>
                    <td>{t("TABLE.RISK")}</td>
                  </tr>
                </thead>
                <tbody>
                  {boardings.map((item, ind) => (
                    <tr
                      className="table-row row-body"
                      key={ind}
                      onClick={() => goToPage(VIEW_BOARDING_PAGE, item._id)}
                    >
                      <td> {moment(item.date).format("L")}</td>
                      <td> {moment(item.date).format("LT")}</td>
                      <td>
                        <Highlighter
                          highlightClassName="highlighted"
                          searchWords={highlighted}
                          autoEscape={true}
                          textToHighlight={item.vessel.name}
                        />
                      </td>
                      <td>{item.vessel.permitNumber || "N/A"}</td>
                      <td>{item.captain.name}</td>
                      <td>
                        {!!item.inspection.summary.violations
                          ? item.inspection.summary.violations.length
                          : "N/A"}
                      </td>
                      <td>{`${item.reportingOfficer.name.first} ${item.reportingOfficer.name.last}`}</td>
                      <td>
                        <RiskIcon
                          safetyLevel={
                            item.inspection.summary.safetyLevel &&
                            item.inspection.summary.safetyLevel.level
                              ? item.inspection.summary.safetyLevel.level
                              : item.inspection.summary.safetyLevel
                          }
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {total > limit && (
              <Pagination
                page={page}
                count={Math.ceil(total / limit)}
                shape="rounded"
                onChange={this.handlePageChange}
              />
            )}
          </Fragment>
        ) : loading ? (
          <LoadingPanel></LoadingPanel>
        ) : (
          t("WARNINGS.NO_BOARDINGS")
        )}
      </div>
    );
  }
}

export default withRouter(withTranslation("translation")(Boardings));
