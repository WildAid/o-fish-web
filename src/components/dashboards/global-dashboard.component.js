import React, { Component, Fragment } from "react";
import { withTranslation } from "react-i18next";

import ComplianceRateSection from "../home/compliance-rate-section/compliance-rate.section";
import BoardingsSection from "../home/boardings-section/boardings.section";
import PatrolHoursSection from "../home/patrol-hours-section/patrol-hours.section";
import DatesRange from "./../partials/dates-range/dates-range.component";

class GlobalDashboard extends Component {
  render() {
    const { user, isLoaded, changeFilter, datesFilter, t } = this.props;

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

export default withTranslation("translation")(GlobalDashboard);
