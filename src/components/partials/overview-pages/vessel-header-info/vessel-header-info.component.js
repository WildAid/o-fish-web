import React, { memo } from "react";

import TextViewer from "../../../partials/text-viewer/text-viewer";
import SeeAll from "../../../partials/see-all-link/see-all-link";

import "./vessel-header-info.css";

const VesselHeaderInfo = ({
  mainText,
  subText,
  headerText,
  itemsAmount
}) => (
  <div className="flex-column vessel-view-item justify-between box-shadow padding white-bg margin-top vessel-header-info">
    <div className="flex-row justify-between">
      <h3>{headerText}</h3>
      <div className="item-label">{itemsAmount}</div>
    </div>
    {headerText !== "Captains" && (
      <div className="flex-row align-center padding-top">
        {headerText === "Nationalities" && (
          <div className="nationality-img">
            <img
              className="full-view"
              src={require("../../../../assets/nationality.png")}
              alt="no icon"
            />
          </div>
        )}
        {mainText}
      </div>
    )}
    {headerText === "Captains" && (
      <div className="flex-row justify-between padding-top">
        <TextViewer
          mainText={mainText}
          subText={subText}
          mainTextFirst={true}
        />
        <div className="sm-photo-icon">
          <img
            className="icon"
            src={require("../../../../assets/photo-icon.png")}
            alt="no logo"
          />
        </div>
      </div>
    )}
    {headerText === "Permit Numbers" && (
      <div className="flex-row justify-center">
        <SeeAll />
      </div>
    )}
  </div>
);

export default memo(VesselHeaderInfo);
