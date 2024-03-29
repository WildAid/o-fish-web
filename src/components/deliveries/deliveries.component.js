import React, { Component, Fragment } from "react";
import { withTranslation } from "react-i18next";

import LoadingPanel from "./../partials/loading-panel/loading-panel.component";
import FilterPanel from "./../partials/filter-panel/filter-panel.component";
import SearchPanel from "./../partials/search-panel/search-panel.component";
import RiskIcon from "./../partials/risk-icon/risk-icon.component";

import BoardingDataHelper from "../partials/boarding-data.helper.js";
import OverviewService from "./../../services/overview.service";
import withRouter from "../../helpers/withRouter";

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
    },
    {
      name: "location",
      title: "Location",
      type: "location",
    },
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

class DeliveriesPage extends Component {
  state = {
    deliveries: [],
    loading: false,
    mounted: false,
  };

  componentDidMount() {
    const filter = JSON.parse(this.props.router.params.filter);

    this.setState({ loading: true, mounted: true, filter: filter }, () => {
      overviewService
        .getBoardingsByFilter(filter)
        .then((data) => {
          const dataHelper = new BoardingDataHelper(data);

          const newState = {
            loading: false,
            deliveries: dataHelper.getDeliveries(),
          };
          this.setState(newState);
        })
        .catch((error) => {
          console.error(error);
        });
    });
  }

  render() {
    const { deliveries, loading, mounted } = this.state;
    const { t } = this.props;

    return (
      mounted && (
        <div className="flex-column justify-center align-center padding-bottom photos-overview">
          <SearchPanel handler={this.search} isAutofill={false} />
          {!loading ? (
            <Fragment>
              <div className="flex-row align-center standard-view">
                <div>
                  <div className="item-label margin-top">
                    {t("TABLE.DELIVERIES")}
                  </div>
                  <div className="item-name">{`${deliveries.length} ${t(
                    "TABLE.DELIVERIES"
                  )}`}</div>
                </div>
              </div>
              <div className="flex-row align-center standard-view">
                <div className="margin-right">
                  {t("BOARDING_PAGE.ALL_DATES")} &#11206;
                </div>
                <FilterPanel
                  options={{ searchByFilter: true }}
                  configuration={filterConfiguration}
                />
              </div>
              <div className="table-wrapper">
                <table className="full-view">
                  <thead>
                    <tr className="table-row row-head border-bottom">
                      <td>{`${t("FILTER.MAIN.LAST_DELIVERY.NAME")} ${t(
                        "TABLE.DATE"
                      )}`}</td>
                      <td>{t("FILTER.MAIN.LAST_DELIVERY.BUSINESS")}</td>
                      <td>{t("TABLE.ADDRESS")}</td>
                      <td>{t("TABLE.VESSEL")}</td>
                      <td>{t("BOARDING_PAGE.VIEW_BOARDING.BOARDING")}</td>
                      <td></td>
                    </tr>
                  </thead>
                  <tbody>
                    {deliveries.map((delivery, ind) => (
                      <tr key={ind} className="table-row row-body">
                        <td>{delivery.lastDelivery}</td>
                        <td>{delivery.business}</td>
                        <td>{delivery.location}</td>
                        <td>{delivery.vessel}</td>
                        <td>{delivery.date}</td>
                        <td>
                          <RiskIcon safetyLevel={delivery.risk} />
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
      )
    );
  }
}

export default withRouter(withTranslation("translation")(DeliveriesPage));
