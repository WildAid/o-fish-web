import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import moment from "moment";

import CloseIcon from "@material-ui/icons/Close";

import { boardingInformation } from "./../data-sharing.constants";

import "../manage-shared-data-dialog/manage-shared-data-by-global-admin.css";

class SeeSharedDataDialog extends Component {
  state = {
    activeTabIndex: 0,
  };

  setActiveTab = (ind) => {
    this.setState({ activeTabIndex: ind });
  };

  render() {
    const { t, onCancel, agency } = this.props;
    const { activeTabIndex } = this.state;

    return (
      <div className="new-menu-dialog full-screen global-shared-data">
        <div className="shared-data-dialog internal flex-column">
          <div className="dialog-header">
            <h1 className="title dialog-title">
              {t("DATA_SHARING.DATA_PREVIOUSLY_SHARED_WITH", {
                agency: agency.name,
              })}
            </h1>
            <CloseIcon className="close-icon pointer" onClick={onCancel} />
          </div>
          <div className="flex-column full-view padding-bottom border-bottom time-frame">
            <h3>{t("DATA_SHARING.MANAGE_SHARED_DATA.TIME_FRAME")}</h3>
            <div className="flex-column">
              <div className="flex-row padding-bottom border-bottom">
                <div className="padding-right grey-color">
                  {t("DATA_SHARING.BOARDINGS_FROM")}
                </div>
                <div className="padding-left grey-color">
                  {t("DATA_SHARING.BOARDINGS_TO")}
                </div>
              </div>
              <div className="flex-row">
                <div className="padding-top padding-right">
                  {agency.fromDate
                    ? `${moment(agency.fromDate).format("L")} ${moment(
                      agency.fromDate
                    ).format("LT")}`
                    : t("WARNINGS.NO_START_DATE")}
                </div>
                <div className="padding-top padding-left">
                  {agency.toDate
                    ? `${moment(agency.toDate).format("L")} ${moment(
                      agency.toDate
                    ).format("LT")}`
                    : t("WARNINGS.NO_END_DATE")}
                </div>
              </div>
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
                    className={`boarding-details-tab pointer ${ind === activeTabIndex ? "active" : ""
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
                            </div>
                            {item.subItems.map((subItem, i) => (
                              <div
                                key={i}
                                className="flex-row justify-between row-body-boarding"
                              >
                                <div className="table-header-item justify-between">
                                  {t(subItem.subItemName)}
                                </div>
                                <div className="green-mark">
                                  <img
                                    className="full-view"
                                    src={require("../../../../assets/done-mark.svg").default}
                                    alt="Use/change this filter"
                                  />
                                </div>
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
            <div className="blue-btn" onClick={onCancel}>
              {t("BUTTONS.CLOSE")}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation("translation")(SeeSharedDataDialog);
