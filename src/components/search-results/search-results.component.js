import React, { Component } from "react";

import SearchService from "./../../services/search.service";

import Vessels from "./vessels/vessels.component";
import Boardings from "./boardings/boardings.component";
import Crew from "./crew/crew.component";

import SearchPanel from "./../partials/search-panel/search-panel.component";
import SearchResultsFor from "./../partials/search-results-for/search-results-for.component";

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
      query,
    } = this.state;

    return (
      <div className="flex-column align-center padding-bottom">
        <SearchPanel handler={this.search} value={query} />
        <div className="standard-view ">
          <SearchResultsFor
            query={query}
            total={vesselsAmount + crew.length + boardingsAmount}
          />
        </div>
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
