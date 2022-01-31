import React, { Component } from "react";
import withRouter from "../../../helpers/withRouter";
import moment from "moment";
import SearchIcon from "@material-ui/icons/Search";
import { withTranslation } from "react-i18next";

import history from "../../../root/root.history";
import FilterPart from "./filter-part.component";
import FilterLine from "./filter-line.component";

import "./filter-panel.css";

class FilterPanel extends Component {
  state = { isFilterPanelShown: false, filterParts: [], searchQuery: "" };

  convertFilter(filterObj) {
    const filter = [];
    for (var key in filterObj) {
      filter.push({ name: key, value: filterObj[key] });
    }
    return filter;
  }

  componentDidMount() {
    let filter = [];
    if (this.props.router.params.filter) {
      filter = this.convertFilter(JSON.parse(this.props.router.params.filter));
    }
    const { configuration } = this.props;
    if (configuration && filter && filter.length) {
      const flatConfig = {};
      for (const section in configuration) {
        configuration[section].forEach((item, i) => {
          flatConfig[item.field ? item.field : item.name] = item;
        });
      }
      const defaultFilter = [];
      filter.forEach((filterPart) => {
        const config = flatConfig[filterPart.name];
        if (config) {
          defaultFilter.push({
            ...config,
            value: filterPart.value,
          });
        }
      });
      this.setState({ filterParts: defaultFilter });
    }
  }

  constructFilter(filterParts) {
    let filterObject = {};
    const { options } = this.props;

    filterParts.forEach((item) => {
      switch (item.type) {
        case "value":
        case "risk":
          filterObject[item.field ? item.field : item.name] = item.value;
          break;
        case "date":
          if (options && options.useChartsSyntax) {
            filterObject[item.field ? item.field : item.name] = {
              $gt: new Date(item.value),
            };
          } else {
            filterObject[item.field ? item.field : item.name] = moment(
              item.value
            ).format("YYYY-MM-DD");
          }
          //{"$date": item.value};
          break;
        case "violation":
          filterObject = {
            $or: [
              { "inspection.summary.violations.offence.code": { $regex: item.value, $options: "i" } },
              { "inspection.summary.violations.offence.explanation": { $regex: item.value, $options: "i" } },
            ]
          };
          break;
        //TODO: Use Other field types
        default:
          filterObject[item.field ? item.field : item.name] = item.value;
        //TODO: Use right regex method
        //  {"$regex": item.value, "$options": "ig"};
      }
    });
    return filterObject;
  }

  setSearch = (event) => {
    this.setState({ searchQuery: event.target.value });
  };

  showFilter = () => {
    const { isFilterPanelShown } = this.state;
    this.setState({
      isFilterPanelShown: !isFilterPanelShown,
    });
  };

  hideFilter = () => {
    this.setState({
      isFilterPanelShown: false,
    });
  };

  handleFilterChanged = (name, value) => {
    const { filterParts } = this.state;
    const part = filterParts.find((item) => item.name === name);
    if (part) {
      part.value = value;
      this.setState({
        filterParts: filterParts,
      });
      this.applyFilterChanges();
    }
  };

  applyFilterChanges() {
    const { filterParts } = this.state;
    const path = this.props.router.location.pathname;
    const filter = JSON.stringify(this.constructFilter(filterParts));
    history.push(path.replace(":filter", filter));
    if (this.props.onFilterChanged) {
      this.props.onFilterChanged(this.constructFilter(filterParts));
    }
  }

  checkFilterPart = (part) => {
    const { filterParts } = this.state;
    const index = filterParts.findIndex((item) => item.name === part.name);
    if (index >= 0) {
      this.removeFilterPart(index);
    } else {
      filterParts.push(part);
      this.setState({
        filterParts: filterParts,
        isFilterPanelShown: false,
      });
      if (part.type === "value" || part.type === "risk") {
        this.applyFilterChanges();
      }
    }
  };

  removeFilterPart = (index) => {
    const { filterParts } = this.state;
    filterParts.splice(index, 1);
    this.setState({
      filterParts: filterParts,
      isFilterPanelShown: false,
    });
    this.applyFilterChanges();
  };

  render() {
    const { isFilterPanelShown, filterParts } = this.state;
    const { options, configuration } = this.props;
    const filterPartNames = filterParts.map((item) => item.name);

    return (
      <div className="flex-row align-center">
        <div className="flex-row">
          {filterParts.map((item, ind) => (
            <FilterPart
              key={"filterPart" + ind}
              partType={item.type}
              partName={item.name}
              value={item.value}
              title={item.partTitle ? item.partTitle : item.title}
              onRemove={() => {
                this.removeFilterPart(ind);
              }}
              onFilterChange={this.handleFilterChanged}
            />
          ))}
        </div>
        <div className="relative">
          <div className="filter-btn blue-btn icon-radius d-flex flex-row align-end" onClick={this.showFilter}>
            <span className="material-icons icon-font">filter_alt</span> {filterParts.length ? `(${filterParts.length})` : ""}
          </div>
          <div
            className={
              "flex-column justify-start align-stretch absolute white-bg margin-bottom box-shadow filter-panel" +
              (isFilterPanelShown ? "" : " invisible")
            }
          >
            {options && options.searchByFilter && (
              <div className="search">
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
              </div>
            )}
            {Object.keys(configuration).map((key) => (
              <section key={key}>
                <h3>{key}</h3>
                {configuration[key].map((filterPart, index) => (
                  <FilterLine
                    key={index}
                    parts={filterPartNames}
                    partConfig={{
                      name: ("" + Math.random()).replace("0.", ""),
                      ...filterPart,
                    }}
                    onCheck={this.checkFilterPart}
                  />
                ))}
              </section>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(withTranslation("translation")(FilterPanel));
