import React, { memo } from "react";
import Highlighter from "react-highlight-words";

import TextViewer from "../text-viewer/text-viewer";

import "./item-info.css";

const ItemInfo = ({
  name,
  icon,
  mainText,
  subText,
  iconColor,
  nameIcon,
  searchWords,
  label,
}) => {
  return (
    <div className="flex-row item-info">
      <div className="padding-right icon-img">
        <img
          className="full-view"
          src={require(`../../../assets/${icon}-icon.png`)}
          alt="no icon"
        />
      </div>
      <div className="flex-column justify-between">
        <div className="flex-column">
          <div className="flex-row align-center">
            <div className="item-info-name">
              <Highlighter
                highlightClassName="highlighted"
                searchWords={searchWords || []}
                autoEscape={true}
                textToHighlight={name}
              />
            </div>
            {nameIcon && <div className="captain-icon">CAPTAIN</div>}
          </div>
          <div className="item-label">{label || ""}</div>
        </div>
        <TextViewer mainText={mainText} subText={subText} />
      </div>
    </div>
  );
};

export default memo(ItemInfo);
