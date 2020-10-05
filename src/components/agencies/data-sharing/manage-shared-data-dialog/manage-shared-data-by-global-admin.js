import React, { Component } from "react";
import { withTranslation } from "react-i18next";

import CloseIcon from "@material-ui/icons/Close";

import { boardingInformation } from "./../data-sharing.constants";

import "./manage-shared-data-by-global-admin.css";

class ManageSharedDataByGlobalAdmin extends Component {
  state = { activeTabIndex: 0 };

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
    const { activeTabIndex } = this.state;

    return (
      <div className="new-menu-dialog full-screen global-shared-data">
        <div className="shared-data-dialog internal flex-column">
          <div className="dialog-header">
            <h1 className="title dialog-title">
              {t("DATA_SHARING.MANAGE_SHARED_DATA.SHARE_BOARDING_DATA")}
            </h1>
            <CloseIcon
              className="close-icon pointer"
              onClick={onCancel}
            />
            <h2 className="dialog-subtitle">
              {`${t("DATA_SHARING.MANAGE_SHARED_DATA.CHOOSE_DATA_TO_SHARE")}`}
            </h2>
          </div>
          <div className="flex-column full-view padding-bottom border-bottom time-frame">
            <h3>{`${t("DATA_SHARING.MANAGE_SHARED_DATA.TIME_FRAME")}`}</h3>
            <div className="flex-row">
              <label className="custom-radio">
                {t("BOARDING_PAGE.ALL_DATES")}
                <input type="radio" name="radio" />
                <span className="checkmark"></span>
              </label>
              <label className="custom-radio">
                {t("DATA_SHARING.MANAGE_SHARED_DATA.CHOOSE_DATES")}
                <input type="radio" name="radio" />
                <span className="checkmark"></span>
              </label>
            </div>
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
                          {`${t("DATA_SHARING.MANAGE_SHARED_DATA.FIELD")}`}
                        </div>
                        <div className="grey-color">
                          {`${t(
                            "DATA_SHARING.MANAGE_SHARED_DATA.READ_ACCESS"
                          )}`}
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
              {`${t("BUTTONS.SAVE")}`}
            </button>
            <button className="simple-btn" onClick={onCancel}>
              {`${t("BUTTONS.CANCEL")}`}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation("translation")(ManageSharedDataByGlobalAdmin);
