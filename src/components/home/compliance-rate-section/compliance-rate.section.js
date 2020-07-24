import React, { memo, Component } from "react";
import { withTranslation } from "react-i18next";

import ChartBox from "./../../charts/chart-box.component";

import StitchService from "./../../../services/stitch.service";

const stitchService = StitchService.getInstance();

const chartBoardingsCount = {
  width: "100%",
  height: "100%",
  refreshInterval: 1300,
  useAuthenticatedAccess: true,
  ...stitchService.chartsConfig["boardings-count-chart"],
};

const chartCitationsAndWarnings = {
  width: "100%",
  height: "100%",
  refreshInterval: 1300,
  useAuthenticatedAccess: true,
  ...stitchService.chartsConfig["citations-and-warnings"],
};

const chartBoardingsCompliance = {
  width: "100%",
  height: "100%",
  refreshInterval: 1300,
  useAuthenticatedAccess: true,
  ...stitchService.chartsConfig["boarding-compliance"],
};

const chartComplianceRate = {
  width: "100%",
  height: "100%",
  refreshInterval: 1300,
  useAuthenticatedAccess: true,
  ...stitchService.chartsConfig["compliance-rate"],
};

class ComplianceRateSection extends Component{

  render(){
    const { t } = this.props;
    return (
      <section className="flex-column justify-start align-start standard-view white-bg box-shadow margin-bottom charts-section">
        <h2 className="chart-name">{t("HOME_PAGE.COMPLIANCE_RATE")}</h2>
        <div className="flex-row justify-between align-stretch full-view lg-chart">
          <div className="half-row-view">
            <div className="align-stretch md-chart compliance-rate-value ">
              <ChartBox options={chartComplianceRate}></ChartBox>
            </div>
            <div className="flex-row align-stretch md-chart">
              <div className="half-row-view">
                <ChartBox options={chartBoardingsCount}></ChartBox>
              </div>
              <div className="half-row-view">
                <ChartBox options={chartCitationsAndWarnings}></ChartBox>
              </div>
            </div>
          </div>
          <div className="half-row-view">
            <ChartBox options={chartBoardingsCompliance}></ChartBox>
          </div>
        </div>
      </section>
    );
  };

}
export default withTranslation("translation")(memo(ComplianceRateSection));
