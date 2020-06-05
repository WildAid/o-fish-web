import React, { Component } from "react";
import { withRouter } from "react-router";
import { NavLink } from "react-router-dom";

import ItemInfo from "../../partials/item-info/item-info";

import { VESSELS_PAGE } from "../../../root/root.constants.js";

import "../search-results.css";

class FoundVessels extends Component {
  render() {
    const { vesselsList, total, searchWords } = this.props;

    return (
      <div className="item-block">
        <div className="all-items-list">
          <div className="item-all-info">
            <div className="main-info">
              <div className="item-name">Records of Vessels ({total})</div>
            </div>
            {total > 1 && (
              <NavLink className="item-link" to={VESSELS_PAGE}>
                See all
              </NavLink>
            )}
          </div>
          <div className="items-list">
            <div className="item">
              <div className="item-wrapper">
                <ItemInfo
                  name={vesselsList[0]._id}
                  icon="vessel"
                  mainText={vesselsList[0].catches.slice(0, 3).join(", ")}
                  subText="Catches"
                  searchWords={searchWords}
                />
              </div>
              <button
                className="view-item-btn"
                type="submit"
                // onClick={this.viewRecord}
                variant="contained"
                color="primary"
              >
                View Vessel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(FoundVessels);
