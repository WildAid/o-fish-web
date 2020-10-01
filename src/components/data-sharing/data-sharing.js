import React, { Component } from "react";
import { withTranslation } from "react-i18next";

import AuthService from "../../services/auth.service";

import "./data-sharing.css";

const authService = AuthService.getInstance();

const agencies = [
  {
    agency: "WildAid",
    sharingAgency: "Gabon",
  },
];

class DataSharing extends Component {
  render() {
    const { t } = this.props;
    const userAgency = authService.user.agency.name;

    return (
      <div className="padding-bottom flex-column align-center form-data">
        <div className="flex-row standard-view">
          <div className="items-amount">{t("AGENCY_PAGE.DATA_SHARING")}</div>
        </div>
        <div className="box-shadow white-bg standard-view">
          <div className="header-name">{t("DATA_SHARING.SHARED_DATA")}</div>
          <div className="padding-left padding-bottom">
            {t("DATA_SHARING.SHARING_DATA_WITH", {
              agency: userAgency,
              sharingAgency: "Gabon",
            })}
          </div>
          <table className="data-sharing-table custom-table">
            <thead>
              <tr className="table-row row-head border-bottom">
                <td>{t("TABLE.AGENCY")}</td>
                <td>{t("DATA_SHARING.WHO_CAN_ACCESS_DATA")}</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {agencies.map((item, ind) => (
                <tr className="row-body" key={ind}>
                  <td>
                    <div className="flex-row align-center">
                      <div className="message-icon"></div>
                      {item.agency}
                    </div>
                  </td>
                  <td>{item.sharingAgency}</td>
                  <td>
                    <div className="pointer white-btn">
                      {t("BUTTONS.MANAGE_SHARED_DATA")}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default withTranslation("translation")(DataSharing);
