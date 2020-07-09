import React, { Component } from "react";
import { withTranslation } from "react-i18next";

import ComplianceRateSection from "./compliance-rate-section/compliance-rate.section";
import BoardingsSection from "./boardings-section/boardings.section";
import PatrolHoursSection from "./patrol-hours-section/patrol-hours.section";
import SearchPanel from "./../partials/search-panel/search-panel.component";

import SearchService from "./../../services/search.service";

import "./home.css";

const searchService = SearchService.getInstance();

class Home extends Component {
  state = {
    vessels: [],
    boardings: [],
    crew: [],
    searchQuery: "",
    highlighted: [],
  };

  search = (value) => {
    searchService
      .search(value)
      .then((data) => {
        this.setState(data);
      })
      .catch((error) => {
        console.error(error);
      });
    this.setState({ searchQuery: value });
  };

  render() {
    const { vessels, boardings, crew, searchQuery, highlighted } = this.state;
    const { t } = this.props;

    return (
      <div className="flex-column full-view align-center home">
        <SearchPanel
          handler={this.search}
          value={searchQuery}
          vessels={vessels}
          boardings={boardings}
          crew={crew}
          searchWords={highlighted}
          isAutofill={true}
        />
        <h1>{`${t("HOME_PAGE.OVERVIEW")} April 01, 2020 - April 25, 2020`}</h1>
        <ComplianceRateSection />
        <BoardingsSection />
        <PatrolHoursSection />
      </div>
    );
  }
}

export default withTranslation("translation")(Home);
