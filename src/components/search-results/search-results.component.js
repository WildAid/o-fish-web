import React, { Component } from "react";

import SearchService from "./../../services/search.service";

import Vessels from "./vessels/vessels.component";
import Boardings from "./boardings/boardings.component";
import Crew from "./crew/crew.component";

import SearchPanel from "./../partials/search-panel/search-panel.component";

import "./search-results.css";

const searchService = SearchService.getInstance();

class SearchResults extends Component {
  state = {
    vessels: [],
    boardings: [],
    crew: [],
    vesselsAmount: 0,
    boardingsAmount: 0,
    crewAmount: 0,
    query: "",
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
    this.setState({ query: value });
  };

  componentDidMount() {
    console.log(searchService.searchResults);
    this.setState(searchService.searchResults);
  }

  render() {
    const {
      vessels,
      boardings,
      crew,
      vesselsAmount,
      boardingsAmount,
      highlighted,
      query
    } = this.state;

    return (
      <div className="search-results">
        <SearchPanel handler={this.search} value={query} />
        {!!vessels.length && (
          <Vessels
            vesselsList={vessels}
            total={vesselsAmount}
            searchWords={highlighted}
          />
        )}
        {!!crew.length && (
          <Crew crewList={crew} total={crew.length} searchWords={highlighted} />
        )}
        {!!boardings.length && (
          <Boardings
            boardingsList={boardings}
            total={boardingsAmount}
            searchWords={highlighted}
          />
        )}
      </div>
    );
  }
}

export default SearchResults;
