import React, { Component } from "react";
import { withRouter } from "react-router";
import { NavLink } from "react-router-dom";
import moment from "moment";

import TextViewer from "../../partials/text-viewer/text-viewer";

import { getViolations, getCatches, getColor } from "./../../../helpers/get-data";

import { BOARDINGS_PAGE } from "../../../root/root.constants.js";

import "../search-results.css";

class FoundBoardings extends Component {
  render() {
    const { boardingsList, total, searchWords } = this.props;

    return (
      <div className="item-block">
        <div className="all-items-list">
          <div className="item-all-info">
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
            <div className="item">
              <div className="item-wrapper">
                <div className="icon-img">
                  <img
                    className="icon-image"
                    src={require(`../../../assets/boarding-icon.png`)}
                    alt="no icon"
                  />
                </div>
                <div className="item-box">
                  <div className="boarding-date">
                    <div
                      className="colored-icon"
                      style={{
                        background: getColor(
                          boardingsList[0].safetyLevel.level
                            ? boardingsList[0].safetyLevel.level.toLowerCase()
                            : boardingsList[0].safetyLevel.toLowerCase()
                        ),
                      }}
                    ></div>
                    <div className="name">
                      {moment(boardingsList[0].date).format("LLL")}
                    </div>
                  </div>
                  <div className="boarding-info">
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
              <div className="btn-wrapper">
                <button
                  className="view-item-btn"
                  type="submit"
                  // onClick={this.viewRecord}
                  variant="contained"
                  color="primary"
                >
                  View Boarding
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(FoundBoardings);
