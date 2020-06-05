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
}) => {
  return (
    <div className="item-info">
      <div className="icon-img">
        <img
          className="icon-image"
          src={require(`../../../assets/${icon}-icon.png`)}
          alt="no icon"
        />
      </div>
      <div className="info">
        <div className="name-info">
          <div className="name">
            <Highlighter
              highlightClassName="highlighted"
              searchWords={searchWords || []}
              autoEscape={true}
              textToHighlight={name}
            />
          </div>
          {nameIcon && <div className="captain-icon">CAPTAIN</div>}
        </div>
        <TextViewer mainText={mainText} subText={subText} />
      </div>
    </div>
  );
};

export default memo(ItemInfo);
