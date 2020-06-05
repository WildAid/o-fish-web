import React, { Component } from "react";
import ChartBox from "./../../charts/chart-box.component";
import FilterPanel from "./../../partials/filter-panel/filter-panel.component";
import StitchService from "./../../../services/stitch.service";

const stitchService = StitchService.getInstance();

const chartOptions = {
  width: "100%",
  height: "100%",
  refreshInterval: 1300,
  useAuthenticatedAccess: true,
  ...stitchService.chartsConfig["boardings"]
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

class BoardingsSection extends Component {
  state = { filter: "" };

  filterChanged = (value) => {
    chartOptions.filter = value;
    this.setState({ filter: value });
  };

  render() {
    return (
      <section className="flex-column justify-start align-start standard-view white-bg box-shadow margin-bottom charts-section">
        <div className="flex-row justify-between align-center full-view">
          <h2 className="chart-name">Boardings</h2>
          <FilterPanel
            options={{ useChartsSyntax: true }}
            configuration={filterConfiguration}
            onFilterChanged={(value) => this.filterChanged(value)}
          />
        </div>
        <div className="flex-row justify-between align-stretch full-view lg-chart">
          <ChartBox options={chartOptions} />
        </div>
      </section>
    );
  }
}

export default BoardingsSection;
