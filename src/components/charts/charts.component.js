import React, { Component, Fragment } from "react";
import { withTranslation } from "react-i18next";

import ComplianceRateSection from "../home/compliance-rate-section/compliance-rate.section";
import BoardingsSection from "../home/boardings-section/boardings.section";
import PatrolHoursSection from "../home/patrol-hours-section/patrol-hours.section";
import DatesRange from "./../partials/dates-range/dates-range.component";

class ChartsPage extends Component {
  state = {
    vessels: [],
    boardings: [],
    crew: [],
    searchQuery: "",
    highlighted: [],
    isLoaded: true,
    datesFilter: {
      date: { $gt: moment().subtract(1, "week").toDate() },
    },
  };

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
    this.setState({ datesFilter: filterObject });
  };

  render() {
    const { user, isLoaded, t } = this.props;

    return (
      <Fragment>
        <div className="standard-view page-header">
          <div className="item-label">{t("HOME_PAGE.DASHBOARD")}</div>
          <div className="flex-row full-view justify-between align-center">
            <div className="item-name">
              {isLoaded && user ? user.agency.name : t("LOADING.LOADING")}
            </div>
            <DatesRange onFilterChange={changeFilter} />
          </div>
        </div>
        {isLoaded && (
          <Fragment>
            <ComplianceRateSection filter={datesFilter} />
            <BoardingsSection filter={datesFilter} />
            <PatrolHoursSection filter={datesFilter} />
          </Fragment>
        )}
      </Fragment>
    );
  }
}

export default withTranslation("translation")(ChartsPage);
