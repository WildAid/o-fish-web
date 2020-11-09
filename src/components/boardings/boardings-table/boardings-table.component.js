import React, { Component, Fragment } from "react";
import { withTranslation } from "react-i18next";
import moment from "moment";
import Highlighter from "react-highlight-words";
import Pagination from "@material-ui/lab/Pagination";

import ChartBox from "../../charts/chart-box.component";
import RiskIcon from "./../../partials/risk-icon/risk-icon.component";

import { goBoardingViewPage } from "./../../../helpers/get-data";

import StitchService from "./../../../services/stitch.service";

const stitchService = StitchService.getInstance();

const boardingsChartOptions = {
  width: "100%",
  height: "100%",
  refreshInterval: 1300,
  useAuthenticatedAccess: true,
  ...stitchService.chartsConfig["boardings"],
};

class BoardingsTable extends Component {
  render() {
    const {
      t,
      handlePageChange,
      isMapShown,
      boardings,
      highlighted,
      total,
      page,
      limit,
    } = this.props;

    boardingsChartOptions.filter = {
      _id: { $in: boardings.map((item) => item._id) },
    };

    return (
      <Fragment>
        {isMapShown && (
          <div className="flex-row align-center all-boardings-map">
            <ChartBox options={boardingsChartOptions} className="with-map" />
          </div>
        )}
        <div className="table-wrapper">
          <table className="custom-table boardings-table">
            <thead>
              <tr className="table-row row-head border-bottom">
                <td>{t("TABLE.DATE")}</td>
                <td>{t("TABLE.TIME")}</td>
                <td>{t("TABLE.VESSEL")}</td>
                <td>{t("TABLE.PERMIT_NUMBER")}</td>
                <td>{t("TABLE.CAPTAIN")}</td>
                <td>{t("TABLE.VIOLATIONS")}</td>
                <td>{t("TABLE.BOARDED_BY")}</td>
                <td>{t("TABLE.RISK")}</td>
              </tr>
            </thead>
            <tbody>
              {boardings.map((item, ind) => (
                <tr
                  className="table-row row-body"
                  key={ind}
                  onClick={() => goBoardingViewPage(item._id)}
                >
                  <td> {moment(item.date).format("L")}</td>
                  <td> {moment(item.date).format("LT")}</td>
                  <td>
                    <Highlighter
                      highlightClassName="highlighted"
                      searchWords={highlighted}
                      autoEscape={true}
                      textToHighlight={item.vessel ? item.vessel.name : ""}
                    />
                  </td>
                  <td>{item.vessel && item.vessel.permitNumber ? item.vessel.permitNumber : "N/A"}</td>
                  <td>{item.captain.name}</td>
                  <td>
                    {!!item.inspection.summary.violations
                      ? item.inspection.summary.violations.length
                      : "N/A"}
                  </td>
                  <td>{`${item.reportingOfficer.name.first} ${item.reportingOfficer.name.last}`}</td>
                  <td>
                    <RiskIcon
                      safetyLevel={
                        item.inspection.summary.safetyLevel &&
                        item.inspection.summary.safetyLevel.level
                          ? item.inspection.summary.safetyLevel.level
                          : item.inspection.summary.safetyLevel
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {total > limit && (
          <Pagination
            page={page}
            count={Math.ceil(total / limit)}
            shape="rounded"
            onChange={handlePageChange}
          />
        )}
      </Fragment>
    );
  }
}

export default withTranslation("translation")(BoardingsTable);
