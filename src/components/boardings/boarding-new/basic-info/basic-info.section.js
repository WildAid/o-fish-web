import React, { Component } from "react";
import { TextField, FormControl, InputLabel, Select } from "@material-ui/core";
import { withTranslation } from "react-i18next";
import DateFnsUtils from "@date-io/moment";

import ChartBox from "../../../charts/chart-box.component";

import {
  MuiPickersUtilsProvider,
  TimePicker,
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
  state = {
    date: null,
    time: null,
    location: {
      latitude: ["", "", "", ""],
      longitude: ["", "", "", ""],
    },
  };

  handleChange = (field, value) => {
    this.setState({
      [field]: value,
    });

    this.props.onChange(this.state);
  };

  render() {
    const { t } = this.props;
    const {
      date,
      time,
      location: { latitude, longitude },
    } = this.state;

    return (
      <section className="flex-column basic-info box-shadow white-bg margin-top">
        <div className="table-name border-bottom">
          {t("BOARDING_PAGE.EDIT_BOARDING.BASIC_INFO")}
        </div>
        <div className="padding-25">
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <h3 className="item-name">{t("FILTER.HOME_PAGE.DATE_TIME")}</h3>
            <div className="flex-row justify-between align-center">
              <KeyboardDatePicker
                required
                disableToolbar
                variant="inline"
                format="yyyy/MM/DD"
                margin="normal"
                id="date-picker"
                className="half-row-view"
                label={t("TABLE.DATE")}
                value={date}
                onChange={(date) => this.handleChange("date", date)}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
              <TimePicker
                required
                className="time-picker half-row-view"
                variant="inline"
                ampm={false}
                label={t("TABLE.TIME")}
                value={time}
                onChange={(time) => this.handleChange("time", time)}
              />
            </div>
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
              <h3 className="item-name">
                {t("BOARDING_PAGE.VIEW_BOARDING.LATITUDE")}
              </h3>
              <div className="flex-row margin-top justify-between">
                <FormControl className="quarter-row-view">
                  <InputLabel required id="latitudeDirection">
                    {t("BOARDING_PAGE.NEW_BOARDING.DIRECTION")}
                  </InputLabel>
                  <Select readOnly={false} labelId="latitudeDirection"></Select>
                </FormControl>
                <TextField
                  required
                  id="latitudeDegrees"
                  label={t("BOARDING_PAGE.NEW_BOARDING.DEGREES")}
                  className="quarter-row-view"
                  value={latitude[1]}
                />
                <TextField
                  required
                  id="latitudeMinutes"
                  label={t("BOARDING_PAGE.NEW_BOARDING.MINUTES")}
                  className="quarter-row-view"
                  value={latitude[2]}
                />
                <TextField
                  required
                  id="latitudeSeconds"
                  label={t("BOARDING_PAGE.NEW_BOARDING.SECONDS")}
                  className="quarter-row-view"
                  value={latitude[3]}
                />
              </div>
            </div>
            <div className="flex-column half-row-view">
              <div className="flex-column">
                <h3 className="item-name">
                  {t("BOARDING_PAGE.VIEW_BOARDING.LONGTITUDE")}
                </h3>
                <div className="flex-row margin-top justify-between">
                  <FormControl className="quarter-row-view">
                    <InputLabel required id="longituteDirection">
                      {t("BOARDING_PAGE.NEW_BOARDING.DIRECTION")}
                    </InputLabel>
                    <Select
                      readOnly={false}
                      labelId="longituteDirection"
                    ></Select>
                  </FormControl>
                  <TextField
                    required
                    id="longitudeDegrees"
                    label={t("BOARDING_PAGE.NEW_BOARDING.DEGREES")}
                    className="quarter-row-view"
                    value={longitude[1]}
                  />
                  <TextField
                    required
                    id="longitudeMinutes"
                    label={t("BOARDING_PAGE.NEW_BOARDING.MINUTES")}
                    className="quarter-row-view"
                    value={longitude[2]}
                  />
                  <TextField
                    required
                    id="longitudeSeconds"
                    label={t("BOARDING_PAGE.NEW_BOARDING.SECONDS")}
                    className="quarter-row-view"
                    value={longitude[3]}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default withTranslation("translation")(BasicInfoSection);
