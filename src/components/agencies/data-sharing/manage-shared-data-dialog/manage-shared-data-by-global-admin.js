import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  TimePicker,
  KeyboardDateTimePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/moment";

import CloseIcon from "@material-ui/icons/Close";

import { boardingInformation } from "./../data-sharing.constants";

import "./manage-shared-data-by-global-admin.css";
// import "../../../partials/dates-range/dates-range.css";

class ManageSharedDataByGlobalAdmin extends Component {
  state = { activeTabIndex: 0, chooseDate: false, isCalendarShown: false, noEndDate: false };

  handleSubmit = (values) => {
    if (this.props.onApply) {
      this.props.onApply(values);
    }
  };

  cancelDialog = () => {
    if (this.props.onApply) {
      this.props.onApply();
    }
  };

  setActiveTab = (ind) => {
    this.setState({ activeTabIndex: ind });
  };

  render() {
    const { t, onCancel, onSave } = this.props;
    const { activeTabIndex, chooseDate, isCalendarShown, noEndDate } = this.state;

    return (
      <div className="new-menu-dialog full-screen global-shared-data">
        <div className="shared-data-dialog internal flex-column">
          <div className="dialog-header">
            <h1 className="title dialog-title">
              {t("DATA_SHARING.MANAGE_SHARED_DATA.SHARE_BOARDING_DATA")}
            </h1>
            <CloseIcon className="close-icon pointer" onClick={onCancel} />
            <h2 className="dialog-subtitle">
              {t("DATA_SHARING.MANAGE_SHARED_DATA.CHOOSE_DATA_TO_SHARE")}
            </h2>
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
                  onChange={(e) => this.setState({ chooseDate: false })}
                />
                <span className="checkmark"></span>
              </label>
              <label className="custom-radio">
                {t("DATA_SHARING.MANAGE_SHARED_DATA.CHOOSE_DATES")}
                <input
                  type="radio"
                  name="radio"
                  onChange={(e) => this.setState({ chooseDate: true })}
                />
                <span className="checkmark"></span>
              </label>
            </div>
            {chooseDate && (
              <div className="flex-row align-center">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <div className="time-frame standard-view padding-top flex-column">
                    <div className="flex-row padding-bottom date-time-row">
                      <div className="flex-row justify-around">
                        <KeyboardDatePicker
                          className="date-picker"
                          variant="inline"
                          ampm={false}
                          label="Date"
                          // value={dateStart}
                          // onChange={(date) => this.dateChanged(date, dateEnd)}
                          onError={console.log}
                          format="yyyy/MM/DD"
                        />
                        <TimePicker
                          className="time-picker"
                          variant="inline"
                          ampm={false}
                          label="Time"
                          // value={dateStart}
                          // onChange={(date) => this.dateChanged(date, dateEnd)}
                        />
                      </div>
                      <div className="flex-row align-center padding-left padding-right">{t("FILTER.TO")}</div>
                      <div className="flex-row justify-around">
                        <KeyboardDateTimePicker
                          className="date-picker"
                          variant="inline"
                          ampm={false}
                          label="Date"
                          // value={dateEnd}
                          // onChange={(date) => this.dateChanged(dateStart, date)}
                          onError={console.log}
                          format="yyyy/MM/DD"
                          disabled={noEndDate}
                        />
                        <TimePicker
                          className="time-picker"
                          variant="inline"
                          ampm={false}
                          label="Time"
                          // value={dateEnd}
                          // onChange={(date) => this.dateChanged(dateStart, date)}
                          disabled={noEndDate}
                        />
                      </div>
                    </div>
                    {isCalendarShown && (
                      <div className="flex-row justify-between">
                        <div className="calendar-from calendar">
                          <KeyboardDatePicker
                            disableToolbar
                            format="MM/DD/YYYY"
                            margin="normal"
                            id="date-picker-inline"
                            // value={dateStart}
                            variant="static"
                            // onChange={(date) => this.dateChanged(date, dateEnd)}
                            KeyboardButtonProps={{
                              "aria-label": "change date",
                            }}
                          ></KeyboardDatePicker>
                        </div>
                        <div className="calendar-to calendar">
                          <KeyboardDatePicker
                            disableToolbar
                            format="MM/DD/YYYY"
                            margin="normal"
                            id="date-picker-inline"
                            // value={dateEnd}
                            variant="static"
                            // onChange={(date) => this.dateChanged(dateStart, date)}
                            KeyboardButtonProps={{
                              "aria-label": "change date",
                            }}
                          ></KeyboardDatePicker>
                        </div>
                      </div>
                    )}
                  </div>
                </MuiPickersUtilsProvider>
                <div className="flex-row padding-top padding-bottom padding-left">
                  <input
                    className="dialog-checkbox"
                    type="checkbox"
                    onChange={() => this.setState({ noEndDate: !noEndDate })}
                  />
                  <div>{t("DATA_SHARING.MANAGE_SHARED_DATA.NO_END_DATE")}</div>
                </div>
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
            <button className="blue-btn save-btn" onClick={onSave}>
              {t("BUTTONS.SAVE")}
            </button>
            <button className="simple-btn" onClick={onCancel}>
              {t("BUTTONS.CANCEL")}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation("translation")(ManageSharedDataByGlobalAdmin);
