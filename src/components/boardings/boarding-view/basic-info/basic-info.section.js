import React, { Component } from "react";
import TextField from "../text-field.component";
import ChartBox from "../../../charts/chart-box.component";

const boardingChartOptions = {
  chartId: "5b79cc2a-96b0-413a-9eb4-4afc9f515c8b",
  width: "100%",
  height: "100%",
  refreshInterval: 1300,
  filter: {},
};

export default class BasicInfoSection extends Component {
  render() {
    const { _id, location } = this.props.dataObject;
    boardingChartOptions.filter = { _id: _id };

    return (
      <div className="flex-column basic-info">
        <section className="box-shadow padding white-bg margin-top">
          <h3>Location</h3>
          <div className="chart-container">
            <ChartBox
              options={boardingChartOptions}
              className="with-map"
            ></ChartBox>
          </div>
          <div className="flex-row justify-between">
            <TextField
              label="Lattitude"
              className="half-row-view"
              name="lattitude"
              value={location.latitude}
            />
            <TextField
              label="Longtitude"
              className="half-row-view"
              name="time"
              value={location.longitude}
            />
          </div>
        </section>
      </div>
    );
  }
}
