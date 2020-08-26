import React, { memo } from "react";

import "./see-all-link.css";

const SeeLink = ({ linkText }) => (
  <div className="pointer see-all">{linkText}</div>
);

export default memo(SeeLink);
