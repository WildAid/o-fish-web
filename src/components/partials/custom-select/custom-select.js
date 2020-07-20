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
    const {currentPath} = this.props;
    const newPath = option === "All" ? "home" : option.toLowerCase();

    if (`/${newPath}` !== currentPath) {
      history.push(`#/${newPath}`);
    }
    resetSearch();

    this.setState({ selected: option });
  };

  componentDidMount(){
    const {currentPath} = this.props;
    this.setState({
      selected: currentPath === "home" ? "All" : currentPath,
    });
  }

  render() {
    const { selected, showOptionsList } = this.state;
    const { t } = this.props;

    return (
      <div className="flex-row relative select-menu">
        <div
          className="flex-row align-center justify-between full-view selected-item"
          onClick={() => this.setState({ showOptionsList: !showOptionsList })}
        >
          <div className="capitalize">{selected}</div>
          <div>&#11206;</div>
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
