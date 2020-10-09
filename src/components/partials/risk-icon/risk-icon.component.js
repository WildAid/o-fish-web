import React, { memo } from "react";

import "./risk-icon.css";

const RiskIcon = ({ safetyLevel }) => {
  if (!safetyLevel) return;

  return (
    <div
      className="flex-row justify-center risk-icon">
      :{safetyLevel}
    </div>
  );
};

export default memo(RiskIcon);
