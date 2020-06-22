import React, { Component } from "react";
import { withRouter } from "react-router";
import { NavLink } from "react-router-dom";

import ItemInfo from "../../partials/item-info/item-info";

import { CREW_PAGE } from "../../../root/root.constants.js";

import "../search-results.css";

class FoundCrew extends Component {
  render() {
    const { crewList, total, searchWords } = this.props;

    return (
      <div className="standard-view">
        <div className="white-bg box-shadow all-items-list">
          <div className="flex-row justify-between align-end full-view padding-top padding-bottom border-bottom">
            <div className="main-info">
              <div className="item-name">
                Captains &amp; Crew {`(${total})`}
              </div>
            </div>
            {total > 1 && (
              <NavLink className="item-link" to={CREW_PAGE}>
                See all
              </NavLink>
            )}
          </div>
          <div className="items-list">
            <div className="flex-row align-center border-bottom padding">
              <ItemInfo
                name={crewList[0].name}
                searchWords={searchWords}
                nameIcon={crewList[0].rank === "captain"}
                icon="crew"
                mainText={crewList[0].vessels.slice(0, 3).join(", ")}
                subText="Vessels"
                label="Crew Member"
              />
              <div className="btn-wrapper"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(FoundCrew);
