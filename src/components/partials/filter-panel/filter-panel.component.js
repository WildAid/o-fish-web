import React, { Component } from "react";
import "./filter-panel.css";
import moment from "moment";
import SearchIcon from "@material-ui/icons/Search";
import FilterPart from "./filter-part.component";
import FilterLine from "./filter-line.component";

export default class FilterPanel extends Component {
  state = {isFilterPanelShown : false, filterParts: [], searchQuery : ''}

  constructFilter(filterParts){
    let filterObject = {};
    const { options } = this.props;
    filterParts.forEach((item)=>{
      switch (item.type) {
        case "value":
        case "risk":
          filterObject[item.field ? item.field : item.name] =
            item.value;
          break;
        case "date":
          if (options && options.useChartsSyntax){
            filterObject[item.field ? item.field : item.name] =
              {"$gt": new Date(item.value)};
          } else {
            filterObject[item.field ? item.field : item.name] =
              moment(item.value).format("YYYY-MM-DD");
          }
              //{"$date": item.value};
          break;
        //TODO: Use Other field types
        default:
          filterObject[item.field ? item.field : item.name] =
            item.value;
          //TODO: Use right regex method
          //  {"$regex": item.value, "$options": "ig"};
      }
    });
    return filterObject;
  }

  setSearch = (event) => {
    this.setState({searchQuery : event.target.value});
  }

  showFilter = () => {
    const {isFilterPanelShown} = this.state;
    this.setState({
      isFilterPanelShown: !isFilterPanelShown,
    });
  };

  hideFilter = () => {
    this.setState({
      isFilterPanelShown: false,
    });
  }

  handleFilterChanged = (name, value) => {
    const { filterParts } = this.state;
    const part = filterParts.find(item => item.name === name);
    if (part){
      part.value = value;
      this.setState({
        filterParts: filterParts
      });
      if (this.props.onFilterChanged){
        this.props.onFilterChanged(this.constructFilter(filterParts));
      }
    }
  }

  checkFilterPart = (part) => {
    const { filterParts } = this.state;
    const index = filterParts.findIndex((item) => item.name === part.name);
    if (index >= 0){
      this.removeFilterPart(index);
    } else {
      filterParts.push(part);
      this.setState({
        filterParts: filterParts,
        isFilterPanelShown: false
      });
      if (part.type === "value" || part.type === "risk"){
        if (this.props.onFilterChanged){
          this.props.onFilterChanged(this.constructFilter(filterParts));
        }
      }
    }
  }

  removeFilterPart = (index) => {
    const { filterParts } = this.state;
    filterParts.splice(index, 1);
    this.setState({
      filterParts: filterParts,
      isFilterPanelShown: false
    });
    if (this.props.onFilterChanged){
      this.props.onFilterChanged(this.constructFilter(filterParts));
    }
  }

  render() {
    const { isFilterPanelShown, filterParts } = this.state;
    const { options, configuration } = this.props;
    const filterPartNames = filterParts.map((item)=>item.name);
    return (
      <div className="filter-panel-area">
        <div className="filter-parts">
          {filterParts.map((item, ind)=>(

            <FilterPart
              key={"filterPart" + ind}
              partType={item.type}
              partName={item.name}
              value={item.value}
              title={item.partTitle ? item.partTitle : item.title}
              onRemove={()=>{this.removeFilterPart(ind)}}
              onFilterChange={this.handleFilterChanged}
              ></FilterPart>
          ))}
        </div>
        <div className="filter-btn-box">
          <button className="filter-btn blue-btn" onClick={this.showFilter}>
            {options && options.buttonTitle ? options.buttonTitle : "+ Filter"}
          </button>
          <div className={"filter-panel" + (isFilterPanelShown ? "": " invisible")}>
            {options && options.searchByFilter && (<div className="search">
              <div className="search-icon">
                <SearchIcon />
              </div>
              <input
                className="search-field"
                type="search"
                placeholder="Search"
                value={this.state.searchQuery}
                onChange={this.setSearch}
                ></input>
            </div>)}
            {Object.keys(configuration).map(key=>(
              <section key={key}>
                <h3>{key}</h3>
                  {configuration[key].map((filterPart, index)=>(
                    <FilterLine
                      key={index}
                      parts={filterPartNames}
                      partConfig={{name: ("" + Math.random()).replace("0.", ""), ...filterPart}}
                      onCheck={this.checkFilterPart}
                      ></FilterLine>
                  ))
                }
              </section>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

/*
<section>
  <h3>Boarding Information</h3>
  <FilterLine
    parts={filterPartNames}
    title="Date"
    name="date"
    onCheck={this.checkFilterPart}
    ></FilterLine>
  <FilterLine
    parts={filterPartNames}
    title="Time"
    name="time"
    onCheck={this.checkFilterPart}
    ></FilterLine>
  <FilterLine
    parts={filterPartNames}
    title="Location"
    name="location"
    onCheck={this.checkFilterPart}
    ></FilterLine>
</section>
<section>
  <h3>Vessel Information</h3>
  <FilterLine
    parts={filterPartNames}
    title="Vessel Name"
    name="vessel-name"
    onCheck={this.checkFilterPart}
    ></FilterLine>
  <FilterLine
    parts={filterPartNames}
    title="Permit Number"
    name="permitNumber"
    onCheck={this.checkFilterPart}
    ></FilterLine>
  <FilterLine
    parts={filterPartNames}
    title="Nationality"
    name="nationality"
    onCheck={this.checkFilterPart}
    ></FilterLine>
</section>
<section>
  <h3>Last Delivery</h3>
  <FilterLine
    parts={filterPartNames}
    title="Date"
    name="lastDelivery.date"
    onCheck={this.checkFilterPart}
    ></FilterLine>
  <FilterLine
    parts={filterPartNames}
    title="Business"
    name="lastDelivery.business"
    onCheck={this.checkFilterPart}
    ></FilterLine>
  <FilterLine
    parts={filterPartNames}
    title="Location"
    name="lastDelivery.location"
    onCheck={this.checkFilterPart}
    ></FilterLine>
</section>
<section>
  <h3>Catch</h3>
  <FilterLine
    parts={filterPartNames}
    title="Species"
    name="catch.species"
    onCheck={this.checkFilterPart}
    ></FilterLine>
  <FilterLine
    parts={filterPartNames}
    title="Weight"
    name="catch.weight"
    onCheck={this.checkFilterPart}
    ></FilterLine>
  <FilterLine
    parts={filterPartNames}
    title="Count"
    name="catch.count"
    onCheck={this.checkFilterPart}
    ></FilterLine>
</section>*/
