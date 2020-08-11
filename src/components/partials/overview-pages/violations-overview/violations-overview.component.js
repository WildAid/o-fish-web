import React, { memo } from "react";
import { withTranslation } from "react-i18next";
import moment from "moment";

import SeeAll from "../../../partials/see-all-link/see-all-link";

const violations = [
  {
    violation: "Lingcode 2347",
    license: "No Commercial License",
    vessel: "The Black Perl",
    result: "Warnings",
    boarding: "2020-04-18T16:16:37.000+00:00",
  },
  {
    violation: "Lingcode 2347",
    license: "Lingcode in Season",
    vessel: "The Black Perl",
    result: "Warnings",
    boarding: "2020-04-18T16:16:37.000+00:00",
  },
  {
    violation: "Lingcode 2347",
    license: "No Commercial License",
    vessel: "The Black Perl",
    result: "Warnings",
    boarding: "2020-04-18T16:16:37.000+00:00",
  },
];

const ViolationsOverview = ({ t }) => (
  <div className="flex-column justify-between full-view box-shadow padding white-bg margin-top">
    <div className="flex-row justify-between">
      <h3>Violations</h3>
      <div className="item-label">{violations.length}</div>
    </div>
    <table className="custom-table boardings-table">
      <thead>
        <tr className="table-row row-head border-bottom">
          <td>{t("TABLE.VIOLATION")}</td>
          <td>{t("TABLE.VESSEL")}</td>
          <td>{t("TABLE.RESULT")}</td>
          <td>{t("BOARDING_PAGE.VIEW_BOARDING.BOARDING")}</td>
          <td></td>
        </tr>
      </thead>
      <tbody>
        {violations.map((violation, ind) => (
          <tr className="table-row row-body">
            <td>
              <div className="flex-column">
                <div>{violation.violation}</div>
                <div>{violation.license}</div>
              </div>
            </td>
            <td>{violation.vessel}</td>
            <td>{violation.result}</td>
            <td>{moment(violation.boarding).format("L")}</td>
            <td>
              <button className="white-btn">
                {t("BOARDING_PAGE.VIEW_BOARDING.VIEW_BOARDING")}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <div className="flex-row justify-center padding-top">
      <SeeAll />
    </div>
  </div>
);

export default withTranslation("translation")(memo(ViolationsOverview));
