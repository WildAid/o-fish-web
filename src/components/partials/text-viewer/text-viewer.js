import React, { memo } from "react";
import Highlighter from "react-highlight-words";

import "./text-viewer.css";

const TextViewer = ({ mainText, subText, searchWords, mainTextFirst }) => (
  <div className="text">
    {!mainTextFirst && (
      <div className="sub-text">
        {typeof subText == "object"
          ? subText
            ? "Incorrect value"
            : ""
          : subText}
      </div>
    )}
    <div className="main-text">
      <Highlighter
        highlightClassName="highlighted"
        searchWords={searchWords || []}
        autoEscape={true}
        textToHighlight={
          (typeof mainText == "object"
            ? mainText
              ? "Incorrect value"
              : ""
            : mainText) || []
        }
      />
    </div>
    {mainTextFirst && (
      <div className="sub-text">
        {typeof subText == "object"
          ? subText
            ? "Incorrect value"
            : ""
          : subText}
      </div>
    )}
  </div>
);

export default memo(TextViewer);
