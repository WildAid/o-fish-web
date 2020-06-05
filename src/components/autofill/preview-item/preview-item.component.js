import React, { memo } from "react";
import moment from "moment";
import Highlighter from "react-highlight-words";

import TextViewer from "../../partials/text-viewer/text-viewer";
import { getColor } from "./../../../helpers/get-data";

import "../autofill.css";

const PreviewItem = ({
  item,
  itemName,
  icon,
  previewName,
  subText,
  searchWords,
}) => {
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
            <Highlighter
              highlightClassName="highlighted"
              searchWords={searchWords}
              autoEscape={true}
              textToHighlight={name}
            />
            {isBoardings && (
              <div
                className="risk-icon"
                style={{
                  background: getColor(
                    item.safetyLevel.level
                      ? item.safetyLevel.level.toLowerCase()
                      : item.safetyLevel.toLowerCase()
                  ),
                }}
              ></div>
            )}
          </div>
          <div className="font-12 preview-info">
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
                  subText="Violations"
                />
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(PreviewItem);
