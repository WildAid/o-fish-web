import React, { Component } from "react";
import SearchIcon from "@material-ui/icons/Search";

import CustomSelect from "./../custom-select/custom-select";

import "./search-panel.css";

class SearchPanel extends Component {
  state = {
    searchQuery: "",
  };

  setSearch = (event) => {
    const { value } = event.target;
    const { handler } = this.props;

    this.setState({ searchQuery: value }, ()=>{
      if (this.debounceInterval) {
        clearInterval(this.debounceInterval);
      }

      this.debounceInterval = setTimeout(() => {
        if (handler) {
          handler(value);
        }
        this.debounceInterval = null;
      }, 1000);
    });
  };

  render() {
    return (
      <div className="search-panel flex-row justify-center align-center full-view padding-top padding-bottom white-bg">
        <div className="flex-row justify-start align-center box-shadow standard-view search">
          <div className="flex-row align-center search-icon">
            <SearchIcon />
          </div>
          <input
            className="search-field"
            type="search"
            placeholder="Search O-FISH"
            value={this.state.searchQuery || this.props.value || ""}
            onChange={this.setSearch}
          ></input>
          <CustomSelect />
        </div>
      </div>
    );
  }
}

export default SearchPanel;
