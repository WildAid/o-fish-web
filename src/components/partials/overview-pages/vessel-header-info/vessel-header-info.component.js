import React, { memo } from "react";

import "./vessel-header-info.css";

const VesselHeaderInfo = ({ t, data, headerText, itemsAmount }) => (
  <div className="flex-column vessel-view-item justify-between box-shadow white-bg margin-top padding-bottom vessel-header-info">
    <div className="flex-row justify-between padding border-bottom gray-bg">
      <h3>{headerText}</h3>
      <div className="item-label">{!!itemsAmount ? itemsAmount : ""}</div>
    </div>
    {!data && <div className="padding">{t("WARNINGS.NO_VIOLATIONS")}</div>}
    {data && data.map((el, ind) => {
      const member = headerText === "Captains" ? el.name : el;
      return (
        <div key={ind} className="flex-row align-center padding">
          {headerText === "Flag States" && (
            <div className="nationality-img">
              <img
                className="full-view"
                src={require("../../../../assets/nationality.png")}
                alt="no icon"
              />
            </div>
          )}
          {member || "N/A"}
        </div>
      );
    })}
  </div>
);

export default memo(VesselHeaderInfo);
