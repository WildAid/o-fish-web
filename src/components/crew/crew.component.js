import React, { Component, Fragment } from "react";
import moment from "moment";
import Pagination from "@material-ui/lab/Pagination";
import Highlighter from "react-highlight-words";
import { withTranslation } from "react-i18next";

import {
  getColor,
  getHighlightedText,
  goCrewViewPage
} from "./../../helpers/get-data";

import SearchPanel from "./../partials/search-panel/search-panel.component";
import FilterPanel from "./../partials/filter-panel/filter-panel.component";
import LoadingPanel from "./../partials/loading-panel/loading-panel.component";
import SearchResultsFor from "./../partials/search-results-for/search-results-for.component";

import SearchService from "./../../services/search.service";
import StitchService from "./../../services/stitch.service";
import { convertFilter } from "./../../helpers/get-data";

import "./crew.css";

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
  ]
};

class Crew extends Component {
  state = {
    crew: [],
    total: 0,
    activePage: 10,
    limit: 50,
    offset: 0,
    searchQuery:
      searchService.searchResults && searchService.searchResults.query
        ? searchService.searchResults.query
        : "",
    highlighted: [],
    loading: false,
    currentFilter: null,
    defaultFilter: null,
    page: 1,
    mounted: false
  };

  search = (value) => {
    if (searchService.searchResults && searchService.searchResults.query) {
      searchService.searchResults.query = value;
    }
    this.loadData({ searchQuery: value, offset: 0 });
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

  prepareSearchResultData(data) {
    const allCrew = [];
    data.forEach((crewMember) => {
      crewMember.highlights.forEach((el) => {
        if (el.path.includes("captain")) {
          const addedCrew = allCrew.find((item) => {
            return (
              item.license === crewMember.captain.license &&
              item.safetyLevel === crewMember.safetyLevel
            );
          });
          if (addedCrew) {
            addedCrew.violations += crewMember.violations;
            if (addedCrew.date < crewMember.date) {
              addedCrew.date = crewMember.date;
            }
            if (addedCrew.vessels.indexOf(crewMember.vessel) < 0) {
              addedCrew.vessels.push(crewMember.vessel);
            }
          } else {
            allCrew.push({
              name: crewMember.captain.name,
              rank: "captain",
              vessels: [crewMember.vessel],
              license: crewMember.captain.license,
              violations: crewMember.violations,
              date: crewMember.date,
              safetyLevel: crewMember.safetyLevel,
            });
          }
        } else {
          crewMember.crew.forEach((member) => {
            const addedCrew = allCrew.find((item) => {
              return (
                item.license === member.license &&
                item.safetyLevel === crewMember.safetyLevel
              );
            });
            const foundMatch = el.texts.find((item) => {
              if (item.type === "hit") {
                return item.value;
              }
              return null;
            }).value;
            if (
              member.name.includes(foundMatch) ||
              member.license.includes(foundMatch)
            ) {
              if (addedCrew) {
                addedCrew.violations += crewMember.violations;
                if (addedCrew.date < crewMember.date) {
                  addedCrew.date = crewMember.date;
                }
                if (addedCrew.vessels.indexOf(crewMember.vessel) < 0) {
                  addedCrew.vessels.push(crewMember.vessel);
                }
              } else {
                allCrew.push({
                  name: member.name,
                  rank: "crew",
                  vessels: [crewMember.vessel],
                  license: member.license,
                  violations: crewMember.violations,
                  date: crewMember.date,
                  safetyLevel: crewMember.safetyLevel,
                });
              }
            }
          });
        }
      });
    });
    return allCrew.sort((a, b) =>
      a.name === b.name ? 0 : a.name < b.name ? -1 : 1
    );
  }

  loadData(newState) {
    newState = newState ? newState : {};
    newState.loading = true;
    this.setState(newState, () => {
      const { limit, offset, searchQuery, currentFilter } = this.state;

      stitchService
        .getCrewsWithFacet(limit, offset, searchQuery, currentFilter)
        .then((data) => {
          const dataSource = searchQuery
            ? this.prepareSearchResultData(data.crew)
            : data.crew;
          this.setState({
            loading: false,
            crew: dataSource,
            total: searchQuery ? dataSource.length : data.amount || 0,
            highlighted:
              searchQuery || data.highlights
                ? getHighlightedText(data.highlights || [])
                : [],
          });
        })
        .catch((error) => {
          console.error(error);
        });
    });
  }

  render() {
    const {
      crew,
      total,
      limit,
      loading,
      highlighted,
      searchQuery,
      defaultFilter,
      page,
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
              total={`${total} ${t("SEARCH.CREW_MEMBERS")} `}
            />
          )}
          <FilterPanel
            options={{ searchByFilter: true }}
            filter={defaultFilter}
            configuration={filterConfiguration}
            onFilterChanged={this.handleFilterChanged}
          />
        </div>
        {crew && crew.length && !loading ? (
          <Fragment>
            <div className="table-wrapper">
              <table className="custom-table">
                <thead>
                  <tr className="table-row row-head border-bottom">
                    <td>{t("TABLE.NAME")}</td>
                    <td>{t("TABLE.LICENSE_NUMBER")}</td>
                    <td>{t("TABLE.VESSEL")}</td>
                    <td>{t("TABLE.VIOLATIONS")}</td>
                    <td>{t("TABLE.LAST_BOARDED")}</td>
                  </tr>
                </thead>
                <tbody>
                  {crew.map((item, ind) => (
                    <tr
                      className="table-row row-body"
                      key={ind}
                      onClick={() =>
                        goCrewViewPage(item)
                      }
                    >
                      <td>
                        <div className="flex-row align-center">
                          <div className="crew-name">
                            <Highlighter
                              highlightClassName="highlighted"
                              searchWords={highlighted}
                              autoEscape={true}
                              textToHighlight={item.name}
                            />
                          </div>
                          {item.rank === "captain" && (
                            <div className="captain-icon">
                              {t("TABLE.CAPTAIN").toUpperCase()}
                            </div>
                          )}
                        </div>
                      </td>
                      <td>
                        <Highlighter
                          highlightClassName="highlighted"
                          searchWords={highlighted}
                          autoEscape={true}
                          textToHighlight={item.license}
                        />
                      </td>
                      <td>{item.vessels.slice(0, 4).join(", ")}</td>
                      <td>
                        {item && item.violations ? item.violations : "N/A"}
                      </td>
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
          t("WARNINGS.NO_CREW")
        )}
      </div>
    );
  }
}

export default withTranslation("translation")(Crew);
