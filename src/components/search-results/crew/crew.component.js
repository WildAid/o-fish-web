import React, { Component } from "react";
import withRouter from "../../../helpers/withRouter";
import { NavLink } from "react-router-dom";

import ItemInfo from "../../partials/item-info/item-info";

import { CREW_PAGE } from "../../../root/root.constants.js";

import "../search-results.css";

import { getCrewViewPageWithFilter } from '../../../helpers/get-data'

class FoundCrew extends Component {
  render() {
    const { crewList, total, searchWords } = this.props;

    const crew = crewList[0];

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
              <NavLink className="item-link" to={CREW_PAGE.replace(":filter", "null")}>
                See all
              </NavLink>
            )}
          </div>
          <div className="items-list">
            <div className="flex-row align-center border-bottom padding">
              <ItemInfo
                name={crew.name}
                searchWords={searchWords}
                nameIcon={crew.rank === "captain"}
                icon="crew"
                mainText={crew.vessels.slice(0, 3).join(", ")}
                subText="Vessels"
                label="Crew Member"
                itemInfoLink={getCrewViewPageWithFilter(crew)}
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
