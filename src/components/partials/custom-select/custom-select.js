import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { withRouter } from "react-router";
import history from "../../../root/root.history";

import { resetSearch } from "./../../../helpers/get-data";

import "./custom-select.css";

const SEARCH_OPTIONS = [
  { name: "All", translateKey: "SEARCH.ALL" },
  { name: "Boardings", translateKey: "NAVIGATION.BOARDINGS" },
  { name: "Vessels", translateKey: "NAVIGATION.VESSELS" },
  { name: "Crew", translateKey: "NAVIGATION.CREW" },
  { name: "Users", translateKey: "NAVIGATION.USERS" },
  { name: "Agencies", translateKey: "NAVIGATION.AGENCIES" },
  { name: "Reports", translateKey: "SEARCH.REPORTS" },
];

class CustomSelect extends Component {
  state = {
    selected: "",
    showOptionsList: false,
  };

  setSelected = (option) => {
    const newPath = option === "All" ? "home" : option.toLowerCase();
    history.push(`/${newPath}`);

    resetSearch();

    this.setState({ selected: option });
  };

  componentDidMount() {
    const currPath = this.props.match.path.match(/[a-zA-Z]+/g)[0];
    this.setState({
      selected: currPath === "home" ? "All" : currPath,
    });
  }

  render() {
    const { selected, showOptionsList } = this.state;
    const { t } = this.props;

    return (
      <div className="flex-row relative select-menu">
        <div
          className="flex-row align-center full-view selected-item"
          onClick={() => this.setState({ showOptionsList: !showOptionsList })}
        >
          <div className="capitalize">{selected}</div>
          <div className="arrow">
            <img
              className="icon"
              src={require("../../../assets/filled-arrow.svg")}
              alt="no logo"
            />
          </div>
        </div>
        {showOptionsList && (
          <div className="flex-column white-bg box-shadow absolute options-list">
            {SEARCH_OPTIONS.map((option, key) => (
              <div
                className="option"
                key={key}
                onClick={() => this.setSelected(option.name)}
              >
                {t(option.translateKey)}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default withTranslation("translation")(withRouter(CustomSelect));
