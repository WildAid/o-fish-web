import React, { memo } from "react";
import Highlighter from "react-highlight-words";
import { withTranslation } from "react-i18next";

import TextViewer from "../text-viewer/text-viewer";

import "./item-info.css";
import { Link } from "react-router-dom";

const ItemInfo = ({
  name,
  icon,
  mainText,
  subText,
  iconColor,
  nameIcon,
  searchWords,
  label,
  t,
  itemInfoLink
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
            <Link className="item-info-link " to={itemInfoLink}>
              <Highlighter
                highlightClassName="highlighted"
                searchWords={searchWords || []}
                autoEscape={true}
                textToHighlight={name}
              />
              </Link>
            </div>
            {nameIcon && <div className="captain-icon">{t("TABLE.CAPTAIN").toUpperCase()}</div>}
          </div>
          <div className="item-label">{label || ""}</div>
        </div>
        <TextViewer mainText={mainText} subText={subText} />
      </div>
    </div>
  );
};

export default withTranslation("translation")(memo(ItemInfo));
