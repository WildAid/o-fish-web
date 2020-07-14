import React, { Component } from "react";
import SearchIcon from "@material-ui/icons/Search";
import { NavLink } from "react-router-dom";
import { withTranslation } from "react-i18next";

import Autofill from "./../../autofill/autofill.component";

import CustomSelect from "./../custom-select/custom-select";

import { SEARCH_RESULTS_PAGE } from "./../../../root/root.constants";

import "./search-panel.css";

class SearchPanel extends Component {
  state = {
    searchQuery: "",
    isFocused: false,
    isFilled: false,
  };

  setSearch = (event) => {
    const { value } = event.target;
    const { handler } = this.props;

    this.setState({ searchQuery: value, isFilled: true }, () => {
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
    const { isFocused, searchQuery } = this.state;
    const {
      isAutofill,
      vessels,
      boardings,
      crew,
      value,
      highlighted,
    } = this.props;

    const { t } = this.props;

    return (
      <div
        className={`search-panel ${
          searchQuery || value ? "autofilled" : ""
        } relative flex-row justify-center align-center full-view padding-top padding-bottom white-bg`}
      >
        <div
          className={`flex-row justify-start align-center box-shadow standard-view absolute search ${
            isFocused ? "focused" : ""
          } ${searchQuery || value ? "filled" : ""}`}
        >
          <div className="flex-row align-center search-icon">
            <SearchIcon htmlColor={isFocused ? `#0a4074` : "#9e9e9e"} />
          </div>
          <input
            className="search-field"
            type="search"
            placeholder={`${t("SEARCH.FILTER_SEARCH")} O-FISH`}
            value={searchQuery || value || ""}
            onChange={this.setSearch}
            onFocus={() => this.setState({ isFocused: true })}
          ></input>
          <CustomSelect />
        </div>
        {isAutofill && !!value && (
          <Autofill
            vessels={vessels}
            boardings={boardings}
            crew={crew}
            searchQuery={value}
            searchWords={highlighted || []}
          />
        )}
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

export default withTranslation("translation")(SearchPanel);
