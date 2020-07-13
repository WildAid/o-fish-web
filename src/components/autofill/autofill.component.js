import React, { Component } from "react";
import SearchIcon from "@material-ui/icons/Search";
import { NavLink } from "react-router-dom";
import { withTranslation } from "react-i18next";

import PreviewItem from "./preview-item/preview-item.component";

import { SEARCH_RESULTS_PAGE } from "./../../root/root.constants";

import "./autofill.css";

class Autofill extends Component {
  render() {
    const { t, vessels, crew, boardings, searchQuery, searchWords } = this.props;

    return (
      <div className="standard-view white-bg border absolute standard-view autofill">
        <PreviewItem
          item={vessels[0]}
          itemName={t("NAVIGATION.VESSELS").toUpperCase()}
          icon="vessel"
          previewName="_id"
          subText={t("SEARCH.CATCHES")}
          searchWords={searchWords}
        />
        <PreviewItem
          item={crew[0]}
          itemName={t("SEARCH.CREW_MEMBERS").toUpperCase()}
          icon="crew"
          previewName="name"
          subText={t("NAVIGATION.VESSELS")}
          searchWords={searchWords}
        />
        <PreviewItem
          item={boardings[0]}
          itemName={t("NAVIGATION.BOARDINGS").toUpperCase()}
          icon="boarding"
          previewName="date"
          subText={t("TABLE.VESSEL")}
          searchWords={searchWords}
        />
        <div className="flex-row preview-search">
          <SearchIcon htmlColor='#0a4074'/>
          <NavLink className="custom-link" to={SEARCH_RESULTS_PAGE}>
            <div className="preview-search-text">
            {t('SEARCH.SEE_ALL_RESULTS', { searchQuery: searchQuery })}
            </div>
          </NavLink>
        </div>
      </div>
    );
  }
}

export default withTranslation("translation")(Autofill);
