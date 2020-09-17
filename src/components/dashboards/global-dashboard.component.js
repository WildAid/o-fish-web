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
        vvf
      </Fragment>
    );
  }
}

export default withTranslation("translation")(GlobalDashboard);
