import React, { memo, Fragment } from "react";
import { withTranslation } from "react-i18next";
import moment from "moment";

import { goToPage, goToPageWithFilter } from "./../../../../helpers/get-data";

import SeeLink from "../../../partials/see-all-link/see-all-link";
import RiskIcon from "../../../partials/risk-icon/risk-icon.component";

import {
  VIEW_BOARDING_PAGE,
  BOARDING_FILTERED_PAGE,
} from "../../../../root/root.constants.js";

import "./boardings-overview.css";

const BoardingsOverview = ({ t, boardings, filter }) => (
  <div className="flex-column justify-between full-view box-shadow padding-bottom white-bg margin-top border-radius">
    <div className="flex-row justify-between padding border-bottom gray-bg">
      <h3>{t("NAVIGATION.BOARDINGS")}</h3>
      <div className="item-label">
        {!!boardings.length ? boardings.length : ""}
      </div>
    </div>
    {!!boardings.length ? (
      <Fragment>
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
            {boardings.slice(0, 4).map((boarding, ind) => {
              return (
                <tr
                  key={ind}
                  className="table-row row-body"
                  onClick={() =>
                    goToPage(VIEW_BOARDING_PAGE, boarding.id)
                  }
                >
                  <td>{moment(boarding.date).format("L")}</td>
                  <td>{moment(boarding.time).format("LT")}</td>
                  <td>{boarding.violations}</td>
                  <td>{boarding.citations}</td>
                  <td>{boarding.warnings}</td>
                  <td>{boarding.boardedBy}</td>
                  <td>
                    <RiskIcon safetyLevel={boarding.risk} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div
          className="flex-row justify-center padding-top"
          onClick={() => goToPageWithFilter(BOARDING_FILTERED_PAGE, filter)}
        >
          <SeeLink linkText={t("BUTTONS.SEE_ALL")} />
        </div>
      </Fragment>
    ) : (
      <div className="padding">{t("WARNINGS.NO_BOARDINGS")}</div>
    )}
  </div>
);

export default withTranslation("translation")(memo(BoardingsOverview));
