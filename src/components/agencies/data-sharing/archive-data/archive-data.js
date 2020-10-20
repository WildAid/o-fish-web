import React from "react";
import { withTranslation } from "react-i18next";
import moment from "moment";

import "./archive-data.css";

const ArchiveData = ({ t, archiveAgencies }) => {
  return (
    <div className="padding-bottom flex-column align-center form-data archive-table">
      <div className="full-view white-bg box-shadow">
        <div className="flex-row justify-between align-center">
          <div className="flex-column">
            <div className="header-name">
              {t("DATA_SHARING.PREVIOUSLY_SHARED_DATA")}
            </div>
          </div>
        </div>
        <div className="flex-row align-center margin-bottom full-view">
          <table className="data-sharing-table custom-table">
            <thead>
              <tr className="row-head border-bottom">
                <td>{t("TABLE.AGENCY")}</td>
                <td>{t("DATA_SHARING.BOARDINGS_FROM")}</td>
                <td>{t("DATA_SHARING.BOARDINGS_TO")}</td>
                <td></td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {archiveAgencies &&
                archiveAgencies.map((item, ind) => (
                  <tr className="table-row row-body" key={ind}>
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
                      <div className="pointer white-btn">
                        {t("BUTTONS.SEE_SHARED_DATA")}
                      </div>
                    </td>
                    <td></td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default withTranslation("translation")(ArchiveData);
