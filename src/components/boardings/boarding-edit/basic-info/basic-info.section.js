import React, { Component } from "react";
import { TextField } from "@material-ui/core";
import { withTranslation } from "react-i18next";
import DateFnsUtils from "@date-io/moment";
import { BSON } from "mongodb-stitch-browser-sdk";

import ChartBox from "../../../charts/chart-box.component";

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

class BasicInfoSection extends Component {
  state = { dateTime: new Date(), location: [0, 0] };

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
    const location = [parseFloat(long), parseFloat(lat)];
    this.setState({
      location: location,
    });
    if (this.props.onChange) {
      const { dataObject } = this.props;
      dataObject.location = [
        new BSON.Double(parseFloat(long)),
        new BSON.Double(parseFloat(lat)),
      ];
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
    const { dataObject, t } = this.props;
    const { dateTime } = this.state;
    const location = this.state.location;

    if (dataObject) {
      boardingChartOptions.filter = { _id: dataObject._id };
    }

    return (
      <div className="flex-column basic-info">
        <div className="item-name margin-left margin-top">
          {t("BOARDING_PAGE.EDIT_BOARDING.BASIC_INFO")}
        </div>
        <section className="box-shadow padding white-bg margin-top">
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <h3>{t("FILTER.HOME_PAGE.DATE_TIME")}</h3>
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
          <h3>{t("FILTER.MAIN.BOARDING_INFO.LOCATION")}</h3>
          <div className="chart-container">
            <ChartBox options={boardingChartOptions} className="with-map" />
          </div>
          <br />
          <div className="flex-row justify-between">
            <TextField
              id="latitudeField"
              label={t("BOARDING_PAGE.VIEW_BOARDING.LATITUDE")}
              className="half-row-view"
              value={location[1]}
              onChange={(event) => {
                this.handleLocationChange(location[0], event.target.value);
              }}
            />
            <TextField
              id="longitudeField"
              label={t("BOARDING_PAGE.VIEW_BOARDING.LONGITUDE")}
              className="half-row-view"
              value={location[0]}
              onChange={(event) => {
                this.handleLocationChange(event.target.value, location[1]);
              }}
            />
          </div>
        </section>
      </div>
    );
  }
}

export default withTranslation("translation")(BasicInfoSection);
