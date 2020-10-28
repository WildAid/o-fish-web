import React, { Component } from "react";
import { withRouter } from "react-router";
import { NavLink } from "react-router-dom";

import ItemInfo from "../../partials/item-info/item-info";

import { VESSELS_PAGE, VIEW_VESSEL_PAGE } from "../../../root/root.constants.js";

import "../search-results.css";

// FIXME: move to get-data
export const getVesselViewPageLinkWithFilter = (vessel) => {
  const filter = {};
  if (vessel.permitNumber) {
    filter["vessel.permitNumber"] = vessel.permitNumber;
  }
  if (vessel.name) {
    vessel["vessel.name"] = vessel.name;
  }

  // FIXME: DRY with goToPageWithFilter
  return VIEW_VESSEL_PAGE.replace(":filter", JSON.stringify(filter))
};

class FoundVessels extends Component {
  render() {
    const { vesselsList, total, searchWords } = this.props;

    const vessel = vesselsList[0];

    console.log(vessel)
    // TODO: get other attributes from query to formulate proper query for link
    // { _id, catches } defined
    // { permitNumber, name } undefined

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
                name={vessel._id}
                icon="vessel"
                mainText={vesselsList[0].catches.slice(0, 3).join(", ")}
                subText="Catches"
                label="Vessel"
                searchWords={searchWords}
                itemInfoLink={getVesselViewPageLinkWithFilter(vessel)}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(FoundVessels);
