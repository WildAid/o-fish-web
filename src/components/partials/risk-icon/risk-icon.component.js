import React, { memo } from "react";

import { getColor } from "../../../helpers/get-data";

import "./risk-icon.css";

const RiskIcon = ({ safetyLevel }) => {
  if (!safetyLevel) return;

  const iconColors = getColor(safetyLevel.toLowerCase());

  return (
    <div
      className="flex-row justify-center risk-icon"
      style={{
        background: iconColors.bg,
        color: iconColors.color,
      }}
    >
      {safetyLevel.toUpperCase()}
    </div>
  );
};

export default memo(RiskIcon);
