import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import moment from "moment";

import ManageSharedDataByGlobalAdmin from "./manage-shared-data-dialog/manage-shared-data-by-global-admin";

import "./data-sharing.css";

class AgencyDataSharing extends Component {
  state = {
    dialogDisplayed: false,
  };

  showDialog = () => {
    this.setState({
      dialogDisplayed: true,
    });
  };

  showDialog = () => {
    this.setState({
      dialogDisplayed: true,
    });
  };

  cancelDialog = () => {
    this.setState({
      dialogDisplayed: false,
    });
  };

  saveDialog = () => {
    this.cancelDialog();
  };

  render() {
    const { dialogDisplayed } = this.state;
    const { agency } = this.props;
    const { t } = this.props;

    return (
      <div className="padding-bottom flex-column align-center form-data">
        <div className="full-view">
          <div className="flex-row justify-between align-center">
            <div className="flex-column">
              <div className="header-name">{t("DATA_SHARING.SHARED_DATA")}</div>
              <div className="padding-left padding-bottom">
                {agency &&
                agency.partnerAgencies &&
                agency.partnerAgencies.length &&
                agency.partnerAgencies.length === 1
                  ? t("DATA_SHARING.SHARING_DATA_WITH", {
                      agency: agency.name,
                      sharingAgency: agency.partnerAgencies[0].name,
                    })
                  : t("DATA_SHARING.FOLLOWING_AGENCIES", {
                      agency: agency ? agency.name : "",
                    })}
              </div>
            </div>
            <button className="blue-btn">{t("BUTTONS.SHARE_DATA")}</button>
          </div>
          <table className="data-sharing-table custom-table">
            <thead>
              <tr className="table-row row-head border-bottom">
                <td>{t("TABLE.AGENCY")}</td>
                <td>{t("DATA_SHARING.BOARDINGS_FROM")}</td>
                <td>{t("DATA_SHARING.BOARDINGS_TO")}</td>
                <td></td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {agency &&
              agency.partnerAgencies &&
              agency.partnerAgencies.length ? (
                agency.partnerAgencies.map((item, ind) => (
                  <tr className="row-body" key={ind}>
                    <td>
                      <div className="flex-row align-center">{item.name}</div>
                    </td>
                    <td>
                      {item.fromDate
                        ? `${moment(item.fromDate).format("L")} ${moment(
                            item.fromDate
                          ).format("LT")}`
                        : t("WARNINGS.NO_START_DATE")}
                    </td>
                    <td>
                      {item.toDate
                        ? `${moment(item.toDate).format("L")} ${moment(
                            item.toDate
                          ).format("LT")}`
                        : t("WARNINGS.NO_END_DATE")}
                    </td>
                    <td>
                      <div
                        className="pointer white-btn"
                        onClick={this.showDialog}
                      >
                        {t("BUTTONS.MANAGE_SHARED_DATA")}
                      </div>
                    </td>
                    <td>
                      <div className="blue-color">
                        {t("BUTTONS.STOP_SHARING")}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">
                    <div className="flex-row justify-center padding-top no-sharing-data">
                      {t("DATA_SHARING.SHARING_DATA_WITH_ZERO_AGENCIES")}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {agency &&
            (!agency.partnerAgencies ||
              (agency.partnerAgencies && !agency.partnerAgencies.length)) && (
              <div className="flex-row justify-center">
                <button className="blue-btn">{t("BUTTONS.SHARE_DATA")}</button>
              </div>
            )}
          {dialogDisplayed && (
            <ManageSharedDataByGlobalAdmin
              onCancel={this.cancelDialog}
              onSave={this.saveDialog}
            />
          )}
        </div>
      </div>
    );
  }
}

export default withTranslation("translation")(AgencyDataSharing);
