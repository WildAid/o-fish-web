import React, { memo } from "react";
import { withTranslation } from "react-i18next";
import moment from "moment";

import SeeLink from "../../../partials/see-all-link/see-all-link";

const ViolationsOverview = ({ t, violations }) => (
  <div className="flex-column justify-between full-view box-shadow padding-bottom white-bg margin-top violations-section">
    <div className="flex-row justify-between padding border-bottom gray-bg">
      <h3>{t("TABLE.VIOLATIONS")}</h3>
      <div className="item-label">{violations.length}</div>
    </div>
    <table className="margin-left margin-right">
      <thead>
        <tr className="table-row row-head border-bottom">
          <td>{t("TABLE.VIOLATION")}</td>
          <td>{t("TABLE.RESULT")}</td>
          <td>{t("TABLE.ISSUED_TO")}</td>
          <td>{`${t("BOARDING_PAGE.VIEW_BOARDING.BOARDING")} ${t(
            "TABLE.DATE"
          )}`}</td>
          <td></td>
        </tr>
      </thead>
      <tbody>
        {violations.map((violation, ind) => (
          <tr key={ind} className="table-row row-body">
            <td>
              <div className="flex-column">
                <div>{violation.violation}</div>
                <div>{violation.license}</div>
              </div>
            </td>
            <td>{violation.result}</td>
            <td>{violation.issuedBy}</td>
            <td>{moment(violation.boarding).format("L")}</td>
            <td>
              <SeeLink
                linkText={t("BOARDING_PAGE.VIEW_BOARDING.VIEW_BOARDING")}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <div className="flex-row justify-center padding-top">
      <SeeLink linkText={t("BUTTONS.SEE_ALL")} />
    </div>
  </div>
);

export default withTranslation("translation")(memo(ViolationsOverview));
