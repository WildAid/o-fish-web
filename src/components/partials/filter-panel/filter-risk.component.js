import React, { Component } from "react";
import "./filter-panel.css";
import SearchIcon from "@material-ui/icons/Search";
import Icon from '@material-ui/core/Icon';
import DateFnsUtils from '@date-io/moment';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

export default class FilterPartForRisk extends Component {
  state = {searchPanelShown : false, filterValue: '', searchQuery : ''}

  setSearch = (value) => {
    this.setState({
      searchQuery : value
    });
  }

  applyFilter = () => {
    const {searchQuery} = this.state;
    this.setState({
      filterValue : searchQuery,
      searchPanelShown: false
    });
    if (this.props.onFilterChange){
      this.props.onFilterChange(this.props.partName, searchQuery);
    }
  }

  cancelFilter = () => {
    const {filterValue} = this.state;
    this.setState({
      searchQuery : filterValue,
      searchPanelShown: false
    });
    if (this.props.onFilterChange){
      this.props.onFilterChange(this.props.partName, filterValue);
    }
  }

  showSearchPanel = (event) => {
    this.setState({searchPanelShown : true});
  }

  removeFilterPart = () => {
    if (this.props.onRemove){
      this.props.onRemove();
    }
  }

  render() {
    const { searchPanelShown, searchQuery, filterValue } = this.state;
    const { title, partType } = this.props;
    return (
      <div className="filter-part">
        { searchPanelShown &&
          <div className="filter-search-panel">
            <div className="search-panel search flex-row">
              <div className="search-icon">
                <SearchIcon />
              </div>
              {partType == "date" ? (
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      disableToolbar
                      format="MM/DD/YYYY"
                      margin="normal"
                      id="date-picker-inline"
                      value={(searchQuery ? searchQuery : new Date())}
                      onChange={(date)=>this.setSearch(date.format("L"))}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                </MuiPickersUtilsProvider>
              ) : (
                <input
                  className="search-field"
                  type="search"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(event)=>this.setSearch(event.target.value)}
                  ></input>
              )}
            </div><br/>
            <div className="flex-row">
              <button className="apply-btn material-btn primary" onClick={this.applyFilter}>Apply</button>
              <button className="cancel-btn material-btn" onClick={this.cancelFilter}>Close</button>
            </div>
          </div>
        }
        <div className="filter-part-tag">
          <div className="filter-part-name">{title}</div>
          <div className="filter-part-value">{filterValue}</div>
          <div className="show-panel-btn" onClick={this.showSearchPanel}>
          <img
              className="icon"
              src={require("../../../assets/filled-arrow.svg").default}
              alt="Use/change this filter"
            />
          </div>
          <Icon className="remove-filter-btn" onClick={this.removeFilterPart}>cancel</Icon>
        </div>
      </div>
    )
  }
}
