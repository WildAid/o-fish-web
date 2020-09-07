import React, { Component, Fragment } from "react";
import moment from "moment";
import Pagination from "@material-ui/lab/Pagination";
import Highlighter from "react-highlight-words";
import { withTranslation } from "react-i18next";

import {
  getColor,
  getHighlightedText,
  goToPageWithFilter
} from "./../../helpers/get-data";

import SearchPanel from "./../partials/search-panel/search-panel.component";
import FilterPanel from "./../partials/filter-panel/filter-panel.component";
import LoadingPanel from "./../partials/loading-panel/loading-panel.component";
import SearchResultsFor from "./../partials/search-results-for/search-results-for.component";
import RiskIcon from "../partials/risk-icon/risk-icon.component";

import SearchService from "./../../services/search.service";
import StitchService from "./../../services/stitch.service";
import { convertFilter } from "./../../helpers/get-data";

import { VIEW_VESSEL_PAGE } from "../../root/root.constants";

import "./vessels.css";

const searchService = SearchService.getInstance();
const stitchService = StitchService.getInstance();

const filterConfiguration = {
  Risk: [
    {
      name: "safetyLevel.red",
      field: "inspection.summary.safetyLevel",
      value: "Red",
      title: "Red",
      partTitle: "Risk: Red",
      type: "risk",
    },
    {
      name: "safetyLevel.amber",
      field: "inspection.summary.safetyLevel",
      value: "Amber",
      title: "Amber",
      partTitle: "Risk: Amber",
      type: "risk",
    },
    {
      name: "safetyLevel.green",
      field: "inspection.summary.safetyLevel",
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
      name: "permitNumber",
      field: "vessel.permitNumber",
      title: "Permit Number",
      type: "string-equal",
    },
    {
      name: "nationality",
      field: "vessel.nationality",
      title: "Nationality",
    },
  ],
  "Crews": [
    {
      name: "crewLicense",
      field: "crew.license",
      title: "Crew License Number",
      type: "string-equal",
    },
    {
      name: "crewName",
      field: "crew.lastName",
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

class Vessels extends Component {
  state = {
    vessels: [],
    total: 0,
    activePage: 10,
    limit: 50,
    offset: 0,
    searchQuery:
      searchService.searchResults && searchService.searchResults.query
        ? searchService.searchResults.query
        : "",
    highlighted: [],
    currentFilter: null,
    loading: false,
    defaultFilter: null,
    page: 1,
    mounted: false
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

  handleFilterChanged = (value) => {
    this.loadData({
      currentFilter: value,
    });
  };

  loadData(newState) {
    newState = newState ? newState : {};
    newState.loading = true;
    this.setState(newState, () => {
      const { limit, offset, searchQuery, currentFilter } = this.state;
      stitchService
        .getVesselsWithFacet(limit, offset, searchQuery, currentFilter)
        .then((data) => {
          this.setState({
            loading: false,
            vessels: !!data.vessels ? data.vessels : [],
            total: !!data.amount ? data.amount : 0,
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
    if (this.props.match.params.filter){
      const filter = JSON.parse(this.props.match.params.filter);
      //this.loadData({mounted: true});
      this.setState({mounted: true, defaultFilter: convertFilter(filter)});
      //The loadData will be called automatically from filter-panel
    } else {
      this.loadData({mounted: true});
    }
  }

  goVesselsViewPage(item){
    const filter = {};
    if (item.permitNumber){
      filter["vessel.permitNumber"] = item.permitNumber;
    }
    if (item.vessel){
      filter["vessel.name"] = item.vessel;
    }
    goToPageWithFilter(VIEW_VESSEL_PAGE, filter);
  }

  render() {
    const {
      vessels,
      total,
      limit,
      loading,
      highlighted,
      searchQuery,
      page,
      defaultFilter,
      mounted
    } = this.state;

    const { t } = this.props;

    return mounted && (
      <div className="padding-bottom flex-column align-center">
        <SearchPanel
          handler={this.search}
          value={searchQuery}
          isAutofill={false}
        />
        <div className="flex-row justify-between standard-view">
          {loading ? (
            <div className="items-amount">{t("LOADING.LOADING")}</div>
          ) : (
            <SearchResultsFor
              query={searchQuery}
              total={`${total} ${t("NAVIGATION.VESSELS")}`}
            />
          )}
          <FilterPanel
            options={{ searchByFilter: true }}
            configuration={filterConfiguration}
            filter={defaultFilter}
            onFilterChanged={this.handleFilterChanged}
          />
        </div>
        {vessels && vessels.length && !loading ? (
          <Fragment>
            <div className="table-wrapper">
              <table className="custom-table">
                <thead>
                  <tr className="table-row row-head border-bottom">
                    <td>{t("BOARDING_PAGE.VIEW_BOARDING.STATUS")}</td>
                    <td>{t("TABLE.PERMIT_NUMBER")}</td>
                    <td>{t("FILTER.MAIN.VESSEL_INFO.NATIONALITY")}</td>
                    <td>{t("TABLE.HOME_PORT")}</td>
                    <td>{t("TABLE.LAST_BOARDED")}</td>
                  </tr>
                </thead>
                <tbody>
                  {vessels.map((item, ind) => (
                    <tr
                      className="table-row row-body"
                      key={ind}
                      onClick={() => this.goVesselsViewPage(item)}
                    >
                      <td>
                        <Highlighter
                          highlightClassName="highlighted"
                          searchWords={highlighted}
                          autoEscape={true}
                          textToHighlight={item.vessel}
                        />
                      </td>
                      <td>{item.permitNumber || "N/A"}</td>
                      <td>
                        <div className="flex-row align-center">
                          <div className="nationality-img">
                            <img
                              className="full-view"
                              src={require("../../assets/nationality.png")}
                              alt="no icon"
                            />
                          </div>
                          {item.nationality || "N/A"}
                        </div>
                      </td>
                      <td>{item.homePort ? item.homePort.slice(0, 4).join(", ") : "N/A"}</td>
                      <td>
                        <div className="flex-row">
                          <div className="delivery-date">
                            {moment(item.date).format("LLL")}
                          </div>
                          <div
                            className="risk-icon"
                            style={{
                              background: `${getColor(
                                (item.safetyLevel && item.safetyLevel.level
                                  ? item.safetyLevel.level.toLowerCase()
                                  : item.safetyLevel
                                ).toLowerCase()
                              )}`,
                            }}
                          ></div>
                          <RiskIcon
                            safetyLevel={
                              item.safetyLevel && item.safetyLevel.level
                                ? item.safetyLevel.level
                                : item.safetyLevel
                            }
                          />
                        </div>
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
          t("WARNINGS.NO_VESSELS")
        )}
      </div>
    );
  }
}

export default withTranslation("translation")(Vessels);
