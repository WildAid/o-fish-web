import React, { Component } from "react";

import ComplianceRateSection from "./compliance-rate-section/compliance-rate.section";
import BoardingsSection from "./boardings-section/boardings.section";
import PatrolHoursSection from "./patrol-hours-section/patrol-hours.section";
import SearchPanel from "./../partials/search-panel/search-panel.component";
import Autofill from "./../autofill/autofill.component";

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
        {/* {!!searchQuery && (
          <Autofill
            vessels={vessels}
            boardings={boardings}
            crew={crew}
            searchQuery={searchQuery}
            searchWords={highlighted}
          />
        )} */}
        <h1>Overview for April 01, 2020 - April 25, 2020</h1>
        <ComplianceRateSection />
        <BoardingsSection />
        <PatrolHoursSection />
      </div>
    );
  }
}

export default Home;
