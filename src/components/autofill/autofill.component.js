import React, { Component } from "react";
import SearchIcon from "@material-ui/icons/Search";
import { NavLink } from "react-router-dom";
import { withTranslation } from "react-i18next";

import PreviewItem from "./preview-item/preview-item.component";

import { SEARCH_RESULTS_PAGE } from "./../../root/root.constants";

import { getCrewViewPageWithFilter, getVesselViewPageWithFilter, getBoardingViewPage } from "../../helpers/get-data"

import "./autofill.css";

class Autofill extends Component {
  render() {
    const { t, vessels, crew, boardings, searchQuery, searchWords } = this.props;

    const firstVessel = vessels[0]
    const firstCrew = crew[0]
    const firstBoarding = boardings[0]

    return (
      <div className="standard-view white-bg border absolute standard-view autofill">
        {
          firstVessel && <PreviewItem
            item={firstVessel}
            itemName={t("NAVIGATION.VESSELS").toUpperCase()}
            icon="vessel"
            previewName="_id"
            subText={t("SEARCH.CATCHES")}
            searchWords={searchWords}
            itemInfoLink={getVesselViewPageWithFilter(firstVessel)}
          />
        }
        {
          firstCrew && <PreviewItem
            item={firstCrew}
            itemName={t("SEARCH.CREW_MEMBERS").toUpperCase()}
            icon="crew"
            previewName="name"
            subText={t("NAVIGATION.VESSELS")}
            searchWords={searchWords}
            itemInfoLink={getCrewViewPageWithFilter(firstCrew)}
          />
        }
        {
          firstBoarding && <PreviewItem
            item={firstBoarding}
            itemName={t("NAVIGATION.BOARDINGS").toUpperCase()}
            icon="boarding"
            previewName="date"
            subText={t("TABLE.VESSEL")}
            searchWords={searchWords}
            itemInfoLink={getBoardingViewPage(firstBoarding._id)}
          />
        }
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
