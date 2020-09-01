import React, { memo } from "react";
import { withTranslation } from "react-i18next";

import SeeLink from "../../../partials/see-all-link/see-all-link";

import "./vessel-header-info.css";

const VesselHeaderInfo = ({ t, data, headerText, itemsAmount }) => (
  <div className="flex-column vessel-view-item box-shadow white-bg margin-top padding-bottom vessel-header-info">
    <div className="flex-row justify-between padding border-bottom gray-bg">
      <h3>{headerText}</h3>
      <div className="item-label">{!!itemsAmount ? itemsAmount : ""}</div>
    </div>
    {!data && <div className="padding">N/A</div>}
    <div className="flex-row align-center padding">
      {headerText === "Flag States" && (
        <div className="nationality-img">
          <img
            className="full-view"
            src={require("../../../../assets/nationality.png")}
            alt="no icon"
          />
        </div>
      )}
      {data || "N/A"}
    </div>
    {itemsAmount > 1 && (
      <div className="flex-row justify-center padding-top">
        <SeeLink linkText={t("BUTTONS.SEE_ALL")} />
      </div>
    )}
  </div>
);

export default withTranslation("translation")(memo(VesselHeaderInfo));
