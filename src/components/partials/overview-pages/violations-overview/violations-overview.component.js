import React, { memo, Fragment } from "react";
import { withTranslation } from "react-i18next";
import moment from "moment";

import { getBoardingViewPage } from "./../../../../helpers/get-data";

import {
  VIOLATIONS_PAGE,
} from "../../../../root/root.constants.js";

import SeeLink from "../../../partials/see-all-link/see-all-link";
import { useNavigate } from "react-router-dom";

const ViolationsOverview = ({ t, filter, violations }) => {
  const navigate = useNavigate();
  return (
    <div className="flex-column justify-between full-view box-shadow padding-bottom white-bg margin-top violations-section">
      <div className="flex-row justify-between padding border-bottom gray-bg">
        <h3>{t("TABLE.VIOLATIONS")}</h3>
        <div className="item-label">
          {!!violations && !!violations.length ? violations.length : ""}
        </div>
      </div>
      {!!violations.length ? (
        <Fragment>
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
              {violations.slice(0, 4).map((violation, ind) => (
                <tr key={ind} className="table-row row-body">
                  <td>
                    <div className="flex-column">
                      <div>{violation.violation}</div>
                      <div>{violation.code}</div>
                    </div>
                  </td>
                  <td>{violation.result}</td>
                  <td>{violation.issuedBy}</td>
                  <td>{moment(violation.boardingDate).format("L")}</td>
                  <td
                    onClick={() =>
                      navigate(getBoardingViewPage(violation.boardingId))
                    }
                  >
                    <SeeLink
                      linkText={t("BOARDING_PAGE.VIEW_BOARDING.VIEW_BOARDING")}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div
            className="flex-row justify-center padding-top"
            onClick={() => navigate(VIOLATIONS_PAGE.replace(":filter", JSON.stringify(filter)))}
          >
            <SeeLink linkText={t("BUTTONS.SEE_ALL")} />
          </div>
        </Fragment>
      ) : (
        <div className="padding">{t("WARNINGS.NO_VIOLATIONS")}</div>
      )}
    </div>
  )
};

export default withTranslation("translation")(memo(ViolationsOverview));
