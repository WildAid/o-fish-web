import React, { Component, Fragment } from "react";
import { withTranslation } from "react-i18next";
import moment from "moment";

import LoadingPanel from "./../partials/loading-panel/loading-panel.component";
import FilterPanel from "./../partials/filter-panel/filter-panel.component";
import SearchPanel from "./../partials/search-panel/search-panel.component";
import RiskIcon from "./../partials/risk-icon/risk-icon.component";

import BoardingDataHelper from "../partials/boarding-data.helper.js";
import OverviewService from "./../../services/overview.service";

import { convertFilter } from "./../../helpers/get-data";

const overviewService = OverviewService.getInstance();

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
    }
  ],
  "Vessel Information": [
    {
      name: "vessel.permitNumber",
      title: "Permit Number",
      type: "string-equal",
    },
    {
      name: "vessel.nationality",
      title: "Nationality",
    },
    {
      name: "vessel.name",
      title: "Name",
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

class ViolationsPage extends Component {
  state = {
    violations: [],
    loading: false,
    defaultFilter: null,
    mounted: false
  };

  componentDidMount() {
    const filter = JSON.parse(this.props.match.params.filter);

    this.setState({ loading: true, mounted: true, filter: filter }, () => {
      overviewService
        .getBoardingsByFilter(filter)
        .then((data) => {
          const dataHelper = new BoardingDataHelper(data);

          const newState = {
            defaultFilter : convertFilter(filter),
            loading: false,
            violations: dataHelper.getViolations(filter["crew.license"]),
          };
          this.setState(newState);
        })
        .catch((error) => {
          console.error(error);
        });
    });
  }

  render() {
    const { violations, loading, defaultFilter, mounted } = this.state;
    const { t } = this.props;

    return mounted && (
      <div className="flex-column justify-center align-center padding-bottom">
        <SearchPanel handler={this.search} isAutofill={false} />
        {!loading ? (
          <Fragment>
            <div className="flex-row align-center standard-view">
              <div>
                <div className="item-label margin-top">{t("TABLE.VIOLATIONS")}</div>
                <div className="item-name">{`${violations.length} ${t(
                  "TABLE.VIOLATIONS"
                )}`}</div>
              </div>
            </div>
            <div className="flex-row align-center standard-view">
              <div className="margin-right">{t("BOARDING_PAGE.ALL_DATES")} &#11206;</div>
              <FilterPanel
                options={{ searchByFilter: true }}
                filter={defaultFilter}
                configuration={filterConfiguration}
              />
            </div>
            <div className="table-wrapper">
              <table className="margin-left margin-right">
                <thead>
                  <tr className="table-row row-head border-bottom">
                    <td>{t("TABLE.VIOLATION")}</td>
                    <td>{t("TABLE.RESULT")}</td>
                    <td>{t("TABLE.ISSUED_TO")}</td>
                    <td>{t("TABLE.VESSEL")}</td>
                    <td>{t("BOARDING_PAGE.VIEW_BOARDING.BOARDING")}</td>
                    <td></td>
                  </tr>
                </thead>
                <tbody>
                  {violations.map((violation, ind) => (
                    <tr key={ind} className="table-row row-body">
                      <td>
                        <div className="flex-column">
                          <div>{violation.violation}</div>
                          <div>{violation.license}</div>
                        </div>
                      </td>
                      <td>{violation.result}</td>
                      <td>{violation.issuedBy}</td>
                      <td>{violation.vessel}</td>
                      <td>{moment(violation.boarding).format("L")}</td>
                      <td>
                        <RiskIcon safetyLevel={violation.risk} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Fragment>
        ) : (
          <LoadingPanel />
        )}
      </div>
    );
  }
}

export default withTranslation("translation")(ViolationsPage);
