import React, { Component } from "react";
import { withTranslation } from "react-i18next";

import TextField from "../text-field.component";
import ChartBox from "../../../charts/chart-box.component";

import StitchService from "./../../../../services/stitch.service";
import { convertCooardinatetoDMS } from "../../../../helpers/geolocation";

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

    const latDMS = location[1] ? convertCooardinatetoDMS(location[1]) : 0;
    const longDMS = location[0] ? convertCooardinatetoDMS(location[0]) : 0;

    return (
      <div className="flex-column basic-info">
        <section className="box-shadow padding white-bg margin-top">
          <h3>{t("FILTER.MAIN.BOARDING_INFO.LOCATION")}</h3>
          <div className="chart-container">
            <ChartBox options={boardingChartOptions} className="with-map" />
          </div>
          <div className="flex-row justify-between">
            <TextField
              label={t("BOARDING_PAGE.VIEW_BOARDING.LATITUDE")}
              className="half-row-view"
              name="latitude"
              value={`${latDMS} ${location[1] >= 0 ? "N" : "S"}`}
            />
            <TextField
              label={t("BOARDING_PAGE.VIEW_BOARDING.LONGITUDE")}
              className="half-row-view"
              name="time"
              value={`${longDMS} ${location[0] >= 0 ? "E" : "W"}`}
            />
          </div>
        </section>
      </div>
    );
  }
}

export default withTranslation("translation")(BasicInfoSection);
