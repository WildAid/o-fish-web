import React, { Component } from "react";
import SearchIcon from "@material-ui/icons/Search";
import moment from "moment";
import Icon from "@material-ui/core/Icon";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import {
  MuiPickersUtilsProvider,
  TimePicker,
  KeyboardTimePicker,
  KeyboardDateTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/moment";
import { withTranslation } from "react-i18next";

import "./dates-range.css";

export default withTranslation("translation")(class DatesRange extends Component {
  state = {
    dateStart: moment().subtract(1, "week").toDate(),
    dateEnd: new Date(),
    currentRange: "week",
    panelShown: false,
    filterValue: "",
  };

  dateChanged = (start, end, customRange) => {
    this.setState({
      dateStart: start,
      dateEnd: end,
      currentRange: customRange ? customRange : "custom"
    });
  };

  getFilterValue = () => {
    return { start: this.state.dateStart, end: this.state.dateEnd }
  }

  applyFilter = () => {
    const { searchQuery } = this.state;
    this.setState({
      panelShown: false
    });
    if (this.props.onFilterChange) {
      this.props.onFilterChange(this.getFilterValue());
    }
  };

  cancelFilter = () => {
    const { filterValue } = this.state;
    this.setState({
      dateStart: moment().subtract(1, "week").toDate(),
      dateEnd: new Date(),
      panelShown: false
    });
    if (this.props.onFilterChange) {
      this.props.onFilterChange(this.getFilterValue());
    }
  };

  render() {
    const { panelShown, dateStart, dateEnd, currentRange } = this.state;
    const { t } = this.props;

    return (
      <div className="dates-range relative">
        <div className="dates-range-plate flex-row justify-between" onClick={()=>this.setState({panelShown: !panelShown})}>
          {
            moment(dateStart).format("LL") + " - " + moment(dateEnd).format("LL")
          }
          {panelShown ?  <div className="icon">&#11205;</div> : <div className="icon">&#11206;</div>}
        </div>
        {panelShown &&
          <div className="dates-range-panel">

            <div className="full-view">
              <InputLabel id="range-label">
                {t("FILTER.DATES_RANGE.RANGE")}
              </InputLabel>
              <Select
                className="range-select"
                variant="outlined"
                labelId="range-label"
                onChange={(e) =>
                  this.setSearch("active", e.target.value)
                }
                value={currentRange}
                >
                <MenuItem value="week">
                  {t("FILTER.DATES_RANGE.LAST7DAYS")}
                </MenuItem>
                <MenuItem value="today">
                  {t("FILTER.DATES_RANGE.TODAY")}
                </MenuItem>
                <MenuItem value="yesterday">
                  {t("FILTER.DATES_RANGE.YESTERDAY")}
                </MenuItem>
                <MenuItem value="custom">
                  {t("FILTER.DATES_RANGE.CUSTOM")}
                </MenuItem>
              </Select>
            </div>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <div className="flex-row full-view justify-between date-time-row">
              <div  className="flex-row justify-around">
                <KeyboardDatePicker
                  className="date-picker"
                  variant="inline"
                  ampm={false}
                  label="Date"
                  value={dateStart}
                  onChange={(date) => this.dateChanged(date, dateEnd)}
                  onError={console.log}
                  format="yyyy/MM/DD"
                  />
                <TimePicker
                  className="time-picker"
                    variant="inline"
                    ampm={false}
                    label="Time"
                    value={dateStart}
                    onChange={(date) => this.dateChanged(date, dateEnd)}
                    />
                </div>
                {t("FILTER.TO")}
                <div className="flex-row justify-around">
                <KeyboardDateTimePicker
                  className="date-picker"
                  variant="inline"
                  ampm={false}
                  label="Date"
                  value={dateEnd}
                  onChange={(date) => this.dateChanged(dateStart, date)}
                  onError={console.log}
                  format="yyyy/MM/DD"
                  />
                <TimePicker
                  className="time-picker"
                    variant="inline"
                    ampm={false}
                    label="Time"
                    value={dateEnd}
                    onChange={(date) => this.dateChanged(dateStart, date)}
                    />
                  </div>
              </div>
              <div className="flex-row justify-between">
                <div
                  className="calendar-from calendar">
                  <KeyboardDatePicker
                    disableToolbar
                    format="MM/DD/YYYY"
                    margin="normal"
                    id="date-picker-inline"
                    value={dateStart}
                    variant="static"
                    onChange={(date) => this.dateChanged(date, dateEnd)}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                    >
                  </KeyboardDatePicker>
                </div>
                <div
                  className="calendar-to calendar">
                  <KeyboardDatePicker
                    disableToolbar
                    format="MM/DD/YYYY"
                    margin="normal"
                    id="date-picker-inline"
                    value={dateEnd}
                    variant="static"
                    onChange={(date) => this.dateChanged(dateStart, date)}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                    >
                  </KeyboardDatePicker></div>
                </div>
              </MuiPickersUtilsProvider>
              <div className="flex-row full-view buttons-row">
                <button className="blue-btn" onClick={this.applyFilter}>
                  {t("BUTTONS.APPLY")}
                </button>
                <button className="simple-btn" onClick={this.cancelFilter}>
                  {t("BUTTONS.CANCEL")}
                </button>
              </div>
            </div>}
          </div>
        );
      }
    });
