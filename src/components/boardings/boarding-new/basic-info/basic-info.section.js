import React, { Component } from "react";
import { TextField } from "@material-ui/core";
import { withTranslation } from "react-i18next";
import DateFnsUtils from "@date-io/moment";

import ChartBox from "../../../charts/chart-box.component";

import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
} from "@material-ui/pickers";

const boardingChartOptions = {
  chartId: "5b79cc2a-96b0-413a-9eb4-4afc9f515c8b",
  width: "100%",
  height: "100%",
  refreshInterval: 1300,
  filter: { _id: "8121-121221" },
};

class BasicInfoSection extends Component {
  state = {
    date: null,
    location: [0, 0],
  };

  handleChange = (field, value) => {
    this.setState({
      [field]: value,
    }, () => {
      this.props.onChange(this.state);
    });
  };

  handleLocationChange = (field, value) => {
    let { location } = this.state;
    location[field === 'lat' ? 0 : 1] = value;

    this.setState({
      ...this.state,
      location,
    }, () => {
      this.props.onChange(this.state);
    });
  }

  render() {
    const { t } = this.props;
    const {
      date,
      location,
    } = this.state;
    return (
      <section className="flex-column basic-info box-shadow white-bg margin-top">
        <div className="table-name border-bottom">
          {t("BOARDING_PAGE.EDIT_BOARDING.BASIC_INFO")}
        </div>
        <div className="padding-25">
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <h3 className="item-name">{t("FILTER.HOME_PAGE.DATE_TIME")}</h3>
            <KeyboardDateTimePicker
              required
              disableToolbar
              variant="inline"
              format="YYYY/MM/DD HH:mm:ss"
              margin="normal"
              id="date-picker"
              label={t("FILTER.HOME_PAGE.DATE_TIME")}
              value={date}
              onChange={(date) => this.handleChange("date", date.toDate())}
              ampm={false}
              style={{
                width: '100%'
              }}
            />
          </MuiPickersUtilsProvider>
        </div>
        <div className="padding-25">
          <h3 className="item-name">
            {t("FILTER.MAIN.BOARDING_INFO.LOCATION")}
          </h3>
          <div className="chart-container">
            <ChartBox options={boardingChartOptions} className="with-map" />
          </div>
          <div className="flex-row justify-between padding-top">
            <div className="flex-column half-row-view">
              <TextField
                required
                id="latitude"
                label={t("BOARDING_PAGE.VIEW_BOARDING.LATITUDE")}
                value={location[0]}
                onChange={({ target: { value } }) => this.handleLocationChange('lat', value)}
                type="number"
              />
            </div>
            <div className="flex-column half-row-view">
              <div className="flex-column">
                <TextField
                  required
                  id="longitude"
                  label={t("BOARDING_PAGE.VIEW_BOARDING.LONGITUDE")}
                  value={location[1]}
                  onChange={({ target: { value } }) => this.handleLocationChange('long', value)}
                  type="number"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default withTranslation("translation")(BasicInfoSection);
