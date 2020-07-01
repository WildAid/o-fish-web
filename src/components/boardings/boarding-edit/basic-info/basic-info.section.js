import React, { Component } from "react";
import { TextField } from "@material-ui/core";
import ChartBox from "../../../charts/chart-box.component";
import DateFnsUtils from "@date-io/moment";
import { BSON } from "mongodb-stitch-browser-sdk";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

const boardingChartOptions = {
  chartId: "5b79cc2a-96b0-413a-9eb4-4afc9f515c8b",
  width: "100%",
  height: "100%",
  refreshInterval: 1300,
  filter: { _id: "8121-121221" },
};

export default class BasicInfoSection extends Component {
  state = { dateTime: new Date(), location: { latitude: 0, longitude: 0 } };

  handleDateChange = (value) => {
    this.setState({
      dateTime: value,
    });
    if (this.props.onChange) {
      const { dataObject } = this.props;
      dataObject.date = value.toDate();
      this.props.onChange(dataObject);
    }
  };

  handleLocationChange = (long, lat) => {
    const location = {
      longitude: parseFloat(long),
      latitude: parseFloat(lat),
    };
    this.setState({
      location: location,
    });
    if (this.props.onChange) {
      const { dataObject } = this.props;
      dataObject.location =  {
        longitude: new BSON.Double(parseFloat(long)),
        latitude: new BSON.Double(parseFloat(lat)),
      };;
      this.props.onChange(dataObject);
    }
  };

  componentDidMount() {
    const { dataObject } = this.props;
    this.setState({
      dateTime: dataObject && dataObject.date ? dataObject.date : new Date(),
      location:
        dataObject && dataObject.location
          ? dataObject.location
          : this.state.location,
    });
  }

  render() {
    const { dataObject } = this.props;
    const { dateTime } = this.state;
    const location = this.state.location;

    if (dataObject) {
      boardingChartOptions.filter = { _id: dataObject._id };
    }

    return (
      <div className="flex-column basic-info">
        <div className="item-name margin-left margin-top">
          Basic Information
        </div>
        <section className="box-shadow padding white-bg margin-top">
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <h3>Date & Time</h3>
            <div className="flex-row justify-between">
              <KeyboardDatePicker
                className="half-row-view"
                disableToolbar
                format="MM/DD/YYYY"
                margin="normal"
                id="date-picker-inline"
                label="Date picker inline"
                value={dateTime}
                onChange={this.handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
              <KeyboardTimePicker
                className="half-row-view"
                margin="normal"
                id="time-picker"
                label="Time picker"
                value={dateTime}
                onChange={this.handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change time",
                }}
              />
            </div>
          </MuiPickersUtilsProvider>
        </section>
        <section className="box-shadow padding white-bg margin-top">
          <h3>Location</h3>
          <div className="chart-container">
            <ChartBox
              options={boardingChartOptions}
              className="with-map"
            ></ChartBox>
          </div>
          <br />
          <div className="flex-row justify-between">
            <TextField
              id="latitudeField"
              label="Lattitude:"
              className="half-row-view"
              value={location.latitude}
              onChange={(event) => {
                this.handleLocationChange(
                  location.longitude,
                  event.target.value
                );
              }}
            />
            <TextField
              id="longitudeField"
              label="Longtitude:"
              className="half-row-view"
              value={location.longitude}
              onChange={(event) => {
                this.handleLocationChange(
                  event.target.value,
                  location.latitude
                );
              }}
            />
          </div>
        </section>
      </div>
    );
  }
}
