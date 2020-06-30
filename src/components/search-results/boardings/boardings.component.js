import React, { Component } from "react";
import { withRouter } from "react-router";
import { NavLink } from "react-router-dom";
import moment from "moment";

import TextViewer from "../../partials/text-viewer/text-viewer";
import RiskIcon from "../../partials/risk-icon/risk-icon.component";

import {
  getViolations,
  getCatches,
  goBoarding,
} from "./../../../helpers/get-data";

import { BOARDINGS_PAGE } from "../../../root/root.constants.js";

import "../search-results.css";

class FoundBoardings extends Component {
  render() {
    const { boardingsList, total, searchWords } = this.props;

    return (
      <div className="standard-view">
        <div className="white-bg box-shadow all-items-list">
          <div className="flex-row justify-between align-end full-view padding-top padding-bottom border-bottom">
            <div className="main-info">
              <div className="item-name">Boardings ({total})</div>
            </div>
            {total > 1 && (
              <NavLink className="item-link" to={BOARDINGS_PAGE}>
                See all
              </NavLink>
            )}
          </div>
          <div className="items-list">
            <div
              className="flex-row align-center border-bottom padding pointer"
              onClick={() => goBoarding(boardingsList[0]._id)}
            >
              <div className="icon-img">
                <img
                  className="full-view"
                  src={require(`../../../assets/boarding-icon.png`)}
                  alt="no icon"
                />
              </div>
              <div className="flex-column justify-between boarding-info">
                <div className="flex-column">
                  <div className="flex-row align-center">
                    <div className="item-info-name">
                      {moment(boardingsList[0].date).format("LLL")}
                    </div>
                    <RiskIcon
                      safetyLevel={
                        boardingsList[0].safetyLevel.level
                          ? boardingsList[0].safetyLevel.level
                          : boardingsList[0].safetyLevel
                      }
                    />
                  </div>
                  <div className="item-label">Boarding</div>
                </div>
                <div className="flex-row justify-between">
                  <TextViewer
                    mainText={boardingsList[0].vessel}
                    subText="Vessel"
                    searchWords={searchWords}
                  />
                  <TextViewer
                    mainText={getCatches(boardingsList[0].catch)}
                    subText="Catch"
                  />
                  <TextViewer
                    mainText={getViolations(boardingsList[0].violations)}
                    subText="Violations"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(FoundBoardings);
