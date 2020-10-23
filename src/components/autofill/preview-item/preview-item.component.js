import React, { memo } from "react";
import moment from "moment";
import Highlighter from "react-highlight-words";
import { withTranslation } from "react-i18next";

import RiskIcon from "../../partials/risk-icon/risk-icon.component";

import TextViewer from "../../partials/text-viewer/text-viewer";

import "../autofill.css";
import { Link } from "react-router-dom";
import { BOARDINGS_PAGE, CREW_PAGE, VESSELS_PAGE } from "../../../root/root.constants";

const PreviewItem = ({
  item,
  itemName,
  icon,
  previewName,
  subText,
  searchWords,
  t,
}) => {
  let searchResultsLink = "#" 
  switch(itemName){
    case "BOARDINGS": searchResultsLink = BOARDINGS_PAGE.replace(":filter", null)
    break;
    case "VESSELS": searchResultsLink = VESSELS_PAGE.replace(":filter", null)
    break;
    case "CREW MEMBERS": searchResultsLink = CREW_PAGE.replace(":filter", null)
    break;
    default: searchResultsLink="#"
    break;
  }
  
  if (!item) return;

  const isBoardings = itemName === "BOARDINGS";
  const name = isBoardings
    ? moment(item[previewName]).format("LLL")
    : item[previewName];
  const text =
    itemName === "BOARDINGS"
      ? item[subText.toLowerCase()]
      : item[subText.toLowerCase()].slice(0, 2).join(", ");

  return (
    <div className="flex-column border-bottom">
      <div className="font-12 preview-item-name">{itemName}</div>
      <div className="flex-row preview-item-info">
        <div className="preview-item-img">
          <img
            className="full-view"
            src={require(`../../../assets/${icon}-icon.png`)}
            alt="no icon"
          />
        </div>
        <div>
          <div className="flex-row font-16">
            <Link className="preview-item-results-link" to={searchResultsLink}>
              <Highlighter
                highlightClassName="highlighted"
                searchWords={searchWords}
                autoEscape={true}
                textToHighlight={name}
              />
            </Link>
            {isBoardings && (
              <div className="margin-left">
                <RiskIcon
                  safetyLevel={
                    item.safetyLevel.level
                      ? item.safetyLevel.level
                      : item.safetyLevel
                  }
                />
              </div>
            )}
          </div>
          <div className="flex-row font-12 preview-info">
            <TextViewer
              mainText={text}
              subText={subText}
              searchWords={searchWords}
            />
            {isBoardings &&
              !!item.violations &&
              !!item.violations.length &&
              item.violations[0].offence && (
                <TextViewer
                  mainText={item.violations[0].offence.explanation}
                  subText={t("TABLE.VIOLATIONS")}
                />
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default withTranslation("translation")(memo(PreviewItem));
