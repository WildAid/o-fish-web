import React, { Component } from "react";

import SearchPanel from "./../partials/search-panel/search-panel.component";

import SearchService from "./../../services/search.service";

import FieldDashboard from "./../dashboards/field-dashboard.component";

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
    const {
      vessels,
      boardings,
      crew,
      searchQuery,
      highlighted,
    } = this.state;

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
        <FieldDashboard />
      </div>
    );
  }
}

export default Home;
