import React, { Component } from "react";
import SearchIcon from "@material-ui/icons/Search";
import Icon from "@material-ui/core/Icon";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/moment";
import { withTranslation } from "react-i18next";

import RiskIcon from "./../../partials/risk-icon/risk-icon.component";

import "./filter-panel.css";
import { FilterCaptain } from "./captain/filter-captain.component";

class FilterPart extends Component {
  state = { searchPanelShown: false, filterValue: "", searchQuery: "" };

  componentDidMount() {
    const { value } = this.props;
    if (value) {
      this.setState({ filterValue: value, searchQuery: value });
    }
  }

  setSearch = (value) => {
    this.setState({
      searchQuery: value,
    });
  };

  applyFilter = () => {
    const { searchQuery } = this.state;
    this.setState({
      filterValue: searchQuery,
      searchPanelShown: false,
    });
    if (this.props.onFilterChange) {
      this.props.onFilterChange(this.props.partName, searchQuery);
    }
  };

  cancelFilter = () => {
    const { filterValue } = this.state;
    this.setState({
      searchQuery: filterValue,
      searchPanelShown: false,
    });
    if (this.props.onFilterChange) {
      this.props.onFilterChange(this.props.partName, filterValue);
    }
  };

  showSearchPanel = (event) => {
    this.setState({ searchPanelShown: true });
  };

  removeFilterPart = () => {
    if (this.props.onRemove) {
      this.props.onRemove();
    }
  };

  render() {
    const { searchPanelShown, searchQuery, filterValue } = this.state;
    const { title, partType, value, t } = this.props;

    return (
      <div className="filter-part relative">
        {searchPanelShown && (
          <div className="filter-search-panel absolute white-bg box-shadow">
            <div className="search-panel search flex-row align-center">
              <div className="search-icon">
                <SearchIcon />
              </div>
              {partType === "date" ? (
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    format="MM/DD/YYYY"
                    margin="normal"
                    id="date-picker-inline"
                    value={searchQuery ? searchQuery : new Date()}
                    onChange={(date) => this.setSearch(date.format("L"))}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </MuiPickersUtilsProvider>
              ) : (
                <input
                  className="search-field"
                  type="search"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(event) => this.setSearch(event.target.value)}
                ></input>
              )}
            </div>
            <div className="flex-row">
              <button className="grey-btn" onClick={this.applyFilter}>
                {t("BUTTONS.APPLY")}
              </button>
              <button className="white-btn" onClick={this.cancelFilter}>
                {t("BUTTONS.CLOSE")}
              </button>
            </div>
          </div>
        )}
        {partType === "risk" ? (
          <div className="filter-part-tag">
            <div className="filter-part-name">{t("TABLE.RISK")}:</div>
            <RiskIcon safetyLevel={value} />
            <Icon
              className="remove-filter-btn pointer"
              onClick={this.removeFilterPart}
            >
              cancel
            </Icon>
            <Icon>expand_more</Icon>
          </div>
        ) : partType === "captain_name" ? <FilterCaptain /> : (
          <div className="filter-part-tag">
            <div className="filter-part-name">
              {filterValue ? `${title}:` : title}
            </div>
            <div className="filter-part-value">{filterValue}</div>
            <div
              className="show-panel-btn pointer"
              onClick={this.showSearchPanel}
            >
              <img
                className="icon"
                src={require("../../../assets/filled-arrow.svg").default}
                alt="Use/change this filter"
              />
            </div>
            <Icon
              className="remove-filter-btn pointer"
              onClick={this.removeFilterPart}
            >
              cancel
            </Icon>
          </div>
        )}
      </div>
    );
  }
}

export default withTranslation("translation")(FilterPart);
