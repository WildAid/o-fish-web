import React, { Component } from "react";
import { withTranslation } from "react-i18next";

import TextField from "../text-field.component";
import ChartBox from "../../../charts/chart-box.component";

import StitchService from "./../../../../services/stitch.service";

const stitchService = StitchService.getInstance();

const boardingChartOptions = {
  width: "100%",
  height: "100%",
  refreshInterval: 1300,
  useAuthenticatedAccess: true,
  ...stitchService.chartsConfig["boardings"],
};

class BasicInfoSection extends Component {
  render() {
    const { _id, location } = this.props.dataObject;
    const { t } = this.props;

    boardingChartOptions.filter = { _id: _id };

    return (
      <div className="flex-column basic-info">
        <section className="box-shadow padding white-bg margin-top">
          <h3>{t("FILTER.MAIN.BOARDING_INFO.LOCATION")}</h3>
          <div className="chart-container">
            <ChartBox
              options={boardingChartOptions}
              className="with-map"
            />
          </div>
          <div className="flex-row justify-between">
            <TextField
              label={t("BOARDING_PAGE.VIEW_BOARDING.LATTITUDE")}
              className="half-row-view"
              name="lattitude"
              value={location.latitude}
            />
            <TextField
              label={t("BOARDING_PAGE.VIEW_BOARDING.LONGTITUDE")}
              className="half-row-view"
              name="time"
              value={location.longitude}
            />
          </div>
        </section>
      </div>
    );
  }
}

export default withTranslation("translation")(BasicInfoSection);
