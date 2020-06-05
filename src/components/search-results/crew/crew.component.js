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
      <div className="item-block">
        <div className="all-items-list">
          <div className="item-all-info">
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
            <div className="item">
              <div className="item-wrapper">
                <ItemInfo
                  name={crewList[0].name}
                  searchWords={searchWords}
                  nameIcon={crewList[0].rank === "captain"}
                  icon="crew"
                  mainText={crewList[0].vessels.slice(0, 3).join(", ")}
                  subText="Vessels"
                />
              </div>
              <div className="btn-wrapper">
                <button
                  className="view-item-btn"
                  type="submit"
                  // onClick={this.viewRecord}
                  variant="contained"
                  color="primary"
                >
                  View Crew Member
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(FoundCrew);
