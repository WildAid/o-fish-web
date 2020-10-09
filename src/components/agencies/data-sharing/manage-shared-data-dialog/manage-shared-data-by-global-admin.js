import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  TimePicker,
  KeyboardDateTimePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/moment";
import moment from "moment";

import CloseIcon from "@material-ui/icons/Close";

import { boardingInformation } from "./../data-sharing.constants";

import "./manage-shared-data-by-global-admin.css";
// import "../../../partials/dates-range/dates-range.css";

class ManageSharedDataByGlobalAdmin extends Component {
  state = {
    activeTabIndex: 0,
    chooseDate: false,
    isFromDateShown: false,
    isToDateShown: false,
    isEndDate: false,
    startDate: moment().subtract(5, "year").toDate(),
    endDate: moment().endOf("day").toDate(),
  };

  setActiveTab = (ind) => {
    this.setState({ activeTabIndex: ind });
  };

  disableCalendarIfEndDate = () => {
    const { isEndDate, isToDateShown } = this.state;
    if (!isEndDate) {
      this.setState({ isToDateShown: !isToDateShown });
    }
  };

  handleDateChanging = (start, end) => {
    const closeCalendar = !start
      ? { isToDateShown: false }
      : { isFromDateShown: false };

    if (!start) start = this.state.startDate;
    if (!end) end = this.state.endDate;

    this.setState({ startDate: start, endDate: end, ...closeCalendar });
  };

  saveDataSharing = () => {
    const { chooseDate, startDate, endDate } = this.state;
    const { onSave } = this.props;

    chooseDate ? onSave(startDate, endDate) : onSave(null, null);
  };

  componentDidMount() {
    const { isDataManaging } = this.props;
    if (isDataManaging) this.setState({ chooseDate: true });
  }

  render() {
    const { t, onCancel, isDataManaging, agencyName } = this.props;
    const {
      activeTabIndex,
      chooseDate,
      isEndDate,
      isFromDateShown,
      isToDateShown,
      startDate,
      endDate,
    } = this.state;

    return (
      <div className="new-menu-dialog full-screen global-shared-data">
        <div className="shared-data-dialog internal flex-column">
          <div className="dialog-header">
            <h1 className="title dialog-title">
              {isDataManaging
                ? t(
                    "DATA_SHARING.MANAGE_SHARED_DATA.MANAGE_DATA_SHARING_WITH",
                    { agency: agencyName }
                  )
                : t("DATA_SHARING.MANAGE_SHARED_DATA.SHARE_BOARDING_DATA")}
            </h1>
            <CloseIcon className="close-icon pointer" onClick={onCancel} />
            {!isDataManaging && (
              <h2 className="dialog-subtitle">
                {t("DATA_SHARING.MANAGE_SHARED_DATA.CHOOSE_DATA_TO_SHARE")}
              </h2>
            )}
          </div>
          <div className="flex-column full-view padding-bottom border-bottom time-frame">
            <h3>{t("DATA_SHARING.MANAGE_SHARED_DATA.TIME_FRAME")}</h3>
            <div className="flex-row">
              <label className="custom-radio">
                {t("BOARDING_PAGE.ALL_DATES")}
                <input
                  type="radio"
                  name="radio"
                  defaultChecked
                  onChange={() => this.setState({ chooseDate: false })}
                />
                <span className="checkmark"></span>
              </label>
              <label className="custom-radio">
                {t("DATA_SHARING.MANAGE_SHARED_DATA.CHOOSE_DATES")}
                <input
                  type="radio"
                  name="radio"
                  onChange={() =>
                    this.setState({
                      chooseDate: true,
                      startDate: moment().subtract(1, "week").toDate(),
                    })
                  }
                />
                <span className="checkmark"></span>
              </label>
            </div>
            {chooseDate && (
              <div className="flex-row align-center">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <div className="time-frame relative full-view padding-top flex-column">
                    <div className="flex-row padding-bottom date-time-row">
                      <div className="flex-row justify-around">
                        <KeyboardDatePicker
                          onClick={() =>
                            this.setState({ isFromDateShown: !isFromDateShown })
                          }
                          className="date-picker"
                          variant="inline"
                          ampm={false}
                          label="Date"
                          value={startDate}
                          onChange={(date) => this.handleDateChanging(date, "")}
                          onError={console.log}
                          format="yyyy/MM/DD"
                        />
                        <TimePicker
                          className="time-picker"
                          variant="inline"
                          ampm={false}
                          label="Time"
                          value={startDate}
                          onChange={(date) => this.handleDateChanging(date, "")}
                        />
                      </div>
                      <div className="flex-row align-center padding-left padding-right">
                        {t("FILTER.TO")}
                      </div>
                      <div className="flex-row justify-around">
                        <KeyboardDateTimePicker
                          onClick={() => this.disableCalendarIfEndDate()}
                          className="date-picker"
                          variant="inline"
                          ampm={false}
                          label="Date"
                          value={endDate}
                          onChange={(date) => this.handleDateChanging("", date)}
                          onError={console.log}
                          format="yyyy/MM/DD"
                          disabled={isEndDate}
                        />
                        <TimePicker
                          className="time-picker"
                          variant="inline"
                          ampm={false}
                          label="Time"
                          value={endDate}
                          onChange={(date) => this.handleDateChanging("", date)}
                          disabled={isEndDate}
                        />
                      </div>
                      <div className="flex-row align-center padding-left">
                        <input
                          className="dialog-checkbox"
                          type="checkbox"
                          onChange={() => {
                            if (endDate) {
                              this.setState({
                                isEndDate: true,
                                isToDateShown: false,
                                endDate: null,
                              });
                            } else {
                              this.setState({
                                isEndDate: false,
                                endDate: moment().endOf("day").toDate(),
                              });
                            }
                          }}
                        />
                        <div>
                          {t("DATA_SHARING.MANAGE_SHARED_DATA.NO_END_DATE")}
                        </div>
                      </div>
                    </div>
                    <div className="flex-row">
                      {isFromDateShown && (
                        <div className="absolute box-shadow calendar-from calendar">
                          <KeyboardDatePicker
                            disableToolbar
                            format="MM/DD/YYYY"
                            margin="normal"
                            id="date-picker-inline"
                            value={startDate}
                            variant="static"
                            onChange={(date) =>
                              this.handleDateChanging(date, "")
                            }
                            KeyboardButtonProps={{
                              "aria-label": "change date",
                            }}
                          />
                        </div>
                      )}
                      {isToDateShown && (
                        <div className="absolute box-shadow calendar-to calendar">
                          <KeyboardDatePicker
                            disableToolbar
                            format="MM/DD/YYYY"
                            margin="normal"
                            id="date-picker-inline"
                            value={endDate}
                            variant="static"
                            onChange={(date) =>
                              this.handleDateChanging("", date)
                            }
                            KeyboardButtonProps={{
                              "aria-label": "change date",
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </MuiPickersUtilsProvider>
              </div>
            )}
          </div>
          <div className="full-view">
            <h3>{t("DATA_SHARING.MANAGE_SHARED_DATA.DATA")}</h3>
            <div className="flex-row full-view">
              <div className="flex-column boarding-data-to-share">
                <div className="grey-color padding-bottom">
                  {t("DATA_SHARING.MANAGE_SHARED_DATA.BOARDING_DATA")}
                </div>
                {boardingInformation.map((boarding, ind) => (
                  <div
                    className={`boarding-details-tab pointer ${
                      ind === activeTabIndex ? "active" : ""
                    }`}
                    onClick={() => this.setActiveTab(ind)}
                    key={ind}
                  >
                    {t(boarding.name)}
                  </div>
                ))}
              </div>
              <table>
                <thead>
                  <tr>
                    <td colSpan="2">
                      <div className="flex-row justify-between">
                        <div className="grey-color">
                          {t("DATA_SHARING.MANAGE_SHARED_DATA.FIELD")}
                        </div>
                        <div className="grey-color">
                          {t("DATA_SHARING.MANAGE_SHARED_DATA.READ_ACCESS")}
                        </div>
                      </div>
                    </td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan="2" align="left" className="padding-left">
                      {boardingInformation[activeTabIndex].itemsToShare.map(
                        (item, index) => (
                          <div key={index} className="flex-column item-box">
                            <div className="flex-row justify-between row-header-boarding">
                              <div className="table-header-item">
                                {t(item.itemName)}
                              </div>
                              <input
                                className="dialog-checkbox"
                                type="checkbox"
                                defaultChecked
                              />
                            </div>
                            {item.subItems.map((subItem, i) => (
                              <div
                                key={i}
                                className="flex-row justify-between row-body-boarding"
                              >
                                <div className="table-header-item justify-between">
                                  {t(subItem.subItemName)}
                                </div>
                                <input
                                  className="dialog-checkbox"
                                  type="checkbox"
                                  defaultChecked
                                />
                              </div>
                            ))}
                          </div>
                        )
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex-row justify-flex-end full-view">
            <button className="blue-btn" onClick={() => this.saveDataSharing()}>
              {t("BUTTONS.SAVE")}
            </button>
            <div className="simple-btn" onClick={onCancel}>
              {t("BUTTONS.CANCEL")}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation("translation")(ManageSharedDataByGlobalAdmin);
