import React, { Component } from "react";
import SearchIcon from "@material-ui/icons/Search";
import { NavLink } from "react-router-dom";

import PreviewItem from "./preview-item/preview-item.component";

import { SEARCH_RESULTS_PAGE } from "./../../root/root.constants";

import "./autofill.css";

class Autofill extends Component {
  render() {
    const { vessels, crew, boardings, searchQuery, searchWords } = this.props;

    return (
      <div className="standard-view white-bg border box-shadow absolute standard-view autofill">
        <PreviewItem
          item={vessels[0]}
          itemName="VESSELS"
          icon="vessel"
          previewName="_id"
          subText="Catches"
          searchWords={searchWords}
        />
        <PreviewItem
          item={crew[0]}
          itemName="CREW MEMBERS"
          icon="crew"
          previewName="name"
          subText="Vessels"
          searchWords={searchWords}
        />
        <PreviewItem
          item={boardings[0]}
          itemName="BOARDINGS"
          icon="boarding"
          previewName="date"
          subText="Vessel"
          searchWords={searchWords}
        />
        <div className="flex-row preview-search">
          <SearchIcon />
          <NavLink className="custom-link" to={SEARCH_RESULTS_PAGE}>
            <div className="preview-search-text">
              See all results for "{searchQuery}"
            </div>
          </NavLink>
        </div>
      </div>
    );
  }
}

export default Autofill;
