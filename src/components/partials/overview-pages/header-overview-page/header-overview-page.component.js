import React, { memo } from "react";

import "./header-overview.css";

const HeaderOverview = ({ mainText, subText, img }) => (
  <div className="flex-row align-center standard-view">
    <div className="header-icon">
      <img
        className="icon"
        src={require(`../../../../assets/${img}.png`)}
        alt="no logo"
      />
    </div>
    <div>
      <div className="item-label">{subText}</div>
      <div className="item-name">{mainText}</div>
    </div>
  </div>
);

export default memo(HeaderOverview);
