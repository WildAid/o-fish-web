import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { withRouter } from "react-router";

import {
  getHighlightedText,
  getSharedAgenciesList,
  goToPageWithFilter
} from "./../../helpers/get-data";

import SearchPanel from "./../partials/search-panel/search-panel.component";
import FilterPanel from "./../partials/filter-panel/filter-panel.component";
import LoadingPanel from "./../partials/loading-panel/loading-panel.component";
import SearchResultsFor from "./../partials/search-results-for/search-results-for.component";
import BoardingsTable from "./boardings-table/boardings-table.component";

import SearchService from "./../../services/search.service";
import StitchService from "./../../services/stitch.service";
import BoardingService from "./../../services/boarding.service";
import AuthService from "../../services/auth.service";

import { NEW_BOARDING_PAGE } from "../../root/root.constants.js";

import "./boardings.css";

const searchService = SearchService.getInstance();
const stitchService = StitchService.getInstance();
const boardingService = BoardingService.getInstance();
const authService = AuthService.getInstance();

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
  Crews: [
    {
      name: "crewLicense",
      field: "crew.license",
      title: "Crew License Number",
      type: "string-equal",
    },
    {
      name: "crewName",
      field: "crew.name",
      title: "Crew name",
    },
    {
      name: "captainLicense",
      field: "captain.license",
      title: "Captain license Number",
      type: "string-equal",
    },
    {
      name: "captainName",
      field: "captain.lastName",
      title: "Captain name",
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
    currentFilter: {},
    searchQuery:
      searchService.searchResults && searchService.searchResults.query
        ? searchService.searchResults.query
        : "",
    highlighted: [],
    loading: true,
    mounted: false,
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
    goToPageWithFilter(NEW_BOARDING_PAGE)
    // history.push(NEW_BOARDING_PAGE);
  };

  loadData = (newState) => {
    newState = newState || {};
    newState.loading = true;

    this.setState(newState, async () => {
      const { limit, offset, searchQuery, currentFilter } = this.state;

      const isNotGlobalAdmin =
        authService.user &&
        authService.user.global &&
        !authService.user.global.admin;

      const agenciesToShareData = isNotGlobalAdmin
        ? await getSharedAgenciesList(
            authService.user.agency.name,
            authService.user
          )
        : null;

      boardingService
        .getBoardingsWithFacet(
          limit,
          offset,
          searchQuery,
          currentFilter,
          agenciesToShareData
        )
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
  };

  componentDidMount() {
    if (this.props.match.params.filter) {
      const filter = JSON.parse(this.props.match.params.filter);
      this.loadData({ mounted: true, currentFilter: filter });
    } else {
      this.loadData({ mounted: true });
    }
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
      mounted,
      page,
    } = this.state;
    const { t } = this.props;

    boardingsChartOptions.filter = {
      _id: { $in: boardings.map((item) => item._id) },
    };

    return mounted ? (
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
          <BoardingsTable
            isMapShown={isMapShown}
            boardings={boardings}
            highlighted={highlighted}
            total={total}
            limit={limit}
            page={page}
            handlePageChange={this.handlePageChange}
          />
        ) : loading ? (
          <LoadingPanel />
        ) : (
          t("WARNINGS.NO_BOARDINGS")
        )}
      </div>
    ) : (
      ""
    );
  }
}

export default withRouter(withTranslation("translation")(Boardings));
