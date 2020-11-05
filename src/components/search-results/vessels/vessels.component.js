import React, { Component } from "react";
import { withRouter } from "react-router";
import { NavLink } from "react-router-dom";

import ItemInfo from "../../partials/item-info/item-info";

import { VESSELS_PAGE } from "../../../root/root.constants.js";

import "../search-results.css";

import { getVesselViewPageWithFilter } from "../../../helpers/get-data"

class FoundVessels extends Component {
  render() {
    const { vesselsList, total, searchWords } = this.props;

    const firstVessel = vesselsList[0];
    firstVessel.name = firstVessel._id

    const vessel = {
      ...firstVessel,
      name: firstVessel._id,
    };

    return (
      <div className="standard-view">
        <div className="white-bg box-shadow all-items-list">
          <div className="flex-row justify-between align-end full-view padding-top padding-bottom border-bottom">
            <div className="main-info">
              <div className="item-name">Records of Vessels ({total})</div>
            </div>
            {total > 1 && (
              <NavLink className="item-link" to={VESSELS_PAGE.replace(":filter", "null")}>
                See all
              </NavLink>
            )}
          </div>
          <div className="items-list">
            <div className="flex-row align-center border-bottom padding">
              <ItemInfo
                name={vessel.name}
                icon="vessel"
                mainText={vesselsList[0].catches.slice(0, 3).join(", ")}
                subText="Catches"
                label="Vessel"
                searchWords={searchWords}
                itemInfoLink={getVesselViewPageWithFilter(vessel)}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(FoundVessels);
