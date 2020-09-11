import React, { Component, Fragment } from "react";
import { withTranslation } from "react-i18next";

import ComplianceRateSection from "../home/compliance-rate-section/compliance-rate.section";
import BoardingsSection from "../home/boardings-section/boardings.section";
import PatrolHoursSection from "../home/patrol-hours-section/patrol-hours.section";
import DatesRange from "./../partials/dates-range/dates-range.component";
import Boardings from "./../boardings/boardings.component";

class FieldDashboard extends Component {
  render() {
    const { user, isLoaded, changeFilter, datesFilter, t } = this.props;
    console.log(user);

    return (
      <Fragment>
        <div className="standard-view page-header">
          <div className="item-label">{t("HOME_PAGE.DASHBOARD")}</div>
          <div className="flex-row full-view justify-between align-center">
            <div className="item-name">
              {isLoaded && user
                ? `${user.name.first} ${user.name.last}`
                : t("LOADING.LOADING")}
            </div>
            <DatesRange onFilterChange={changeFilter} />
          </div>
        </div>
        {/* {isLoaded && (
          <Boardings/>
        )} */}
      </Fragment>
    );
  }
}

export default withTranslation("translation")(FieldDashboard);
