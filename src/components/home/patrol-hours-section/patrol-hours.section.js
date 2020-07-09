import React, { Component } from "react";
import { withTranslation } from "react-i18next";

import ChartBox from "./../../charts/chart-box.component";
import FilterPanel from "./../../partials/filter-panel/filter-panel.component";
import StitchService from "./../../../services/stitch.service";

const stitchService = StitchService.getInstance();

const chartOptions = {
  width: "100%",
  height: "100%",
  refreshInterval: 1300,
  useAuthenticatedAccess: true,
  ...stitchService.chartsConfig["patrol-hours"],
};

const filterConfiguration = {
  "Date & Time": [
    {
      name: "date",
      title: "Date",
      type: "date",
    },
  ],
  Agency: [
    {
      name: "agency",
      title: "Name",
      partTitle: "Agency",
    },
  ],
};

class PatrolHoursSection extends Component {
  state = { filter: "" };

  filterChanged = (value) => {
    chartOptions.filter = value;
    this.setState({ filter: value });
  };

  render() {
    const { t } = this.props;

    return (
      <section className="flex-column justify-start align-start standard-view white-bg box-shadow margin-bottom charts-section patrol-hours-section">
        <div className="flex-row justify-between align-center full-view">
          <h2 className="chart-name">{t("HOME_PAGE.OFFICER_PATROL_HOURS")}</h2>
          <FilterPanel
            options={{ useChartsSyntax: true }}
            configuration={filterConfiguration}
            onFilterChanged={(value) => this.filterChanged(value)}
          />
        </div>
        <div className="flex-row justify-between align-stretch full-view lg-chart">
          <ChartBox options={chartOptions}></ChartBox>
        </div>
      </section>
    );
  }
}

export default withTranslation("translation")(PatrolHoursSection);
