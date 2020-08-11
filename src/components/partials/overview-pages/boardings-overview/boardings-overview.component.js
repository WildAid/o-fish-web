import React, { memo } from "react";
import { withTranslation } from "react-i18next";
import moment from "moment";

import RiskIcon from "../../../partials/risk-icon/risk-icon.component";
import SeeAll from "../../../partials/see-all-link/see-all-link";

import "./boardings-overview.css";

// const boardings = [
//   {
//     date: "2020-04-18T16:16:37.000+00:00",
//     time: "2020-04-18T16:16:37.000+00:00",
//     agency: "Galapagos",
//     violations: 13,
//     citations: 4,
//     warnings: 7,
//     risk: "red",
//   },
//   {
//     date: "2020-04-18T16:16:37.000+00:00",
//     time: "2020-04-18T16:16:37.000+00:00",
//     agency: "My Agency",
//     violations: 11,
//     citations: 9,
//     warnings: 18,
//     risk: "amber",
//   },
//   {
//     date: "2020-04-18T16:16:37.000+00:00",
//     time: "2020-04-18T16:16:37.000+00:00",
//     agency: "Galapagos",
//     violations: 1,
//     citations: 6,
//     warnings: 15,
//     risk: "green",
//   },
// ];

const BoardingsOverview = ({ t, boardings }) => (
  <div className="flex-column justify-between full-view box-shadow padding-bottom white-bg margin-top border-radius">
    <div className="flex-row justify-between padding border-bottom gray-bg">
      <h3>Boardings</h3>
      <div className="item-label">{boardings.length}</div>
    </div>
    <table className="boardings-table margin-left margin-right">
      <thead>
        <tr className="table-row row-head border-bottom">
          <td>{t("TABLE.DATE")}</td>
          <td>{t("TABLE.TIME")}</td>
          <td>{t("TABLE.VIOLATIONS")}</td>
          <td>{t("TABLE.CITATIONS")}</td>
          <td>{t("TABLE.WARNINGS")}</td>
          <td>{t("TABLE.BOARDED_BY")}</td>
          <td>{t("TABLE.RISK")}</td>
        </tr>
      </thead>
      <tbody>
        {boardings.map((boarding, ind) => (
          <tr key={ind} className="table-row row-body">
            <td>{moment(boarding.date).format("L")}</td>
            <td>{moment(boarding.time).format("LT")}</td>
            <td>{boarding.violations}</td>
            <td>{boarding.citations}</td>
            <td>{boarding.warnings}</td>
            <td>{boarding.boardingBy}</td>
            <td>
              <RiskIcon safetyLevel={boarding.risk} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    {boardings.length > 1 && (<div className="flex-row justify-center padding-top">
      <SeeAll />
    </div>)}
  </div>
);

export default withTranslation("translation")(memo(BoardingsOverview));
