import React, { Component } from 'react';
import NewDialog from "./new-dialog.js";

import SearchIcon from "@material-ui/icons/Search";
import { withTranslation } from "react-i18next";
import "./form-data.css";

import AgencyService from "./../../../services/agency.service";

class AgencyFormData extends Component {
  state = {
    menuItems : {},
    dialogDisplayed : false,
    activeItem: "activity",
    menuItems: {
      "activity": {title: "Activities", btn: "Add activity", data: []},
      "fishery": {title: "Species", btn: "Add species", data:  ["tuna", "not tuna"]},
      "gear": {title: "Gear Types", btn: "Add gear type", data:  []},
      "catch": {title: "Catches", btn: "Add catch", data:  []},
      "ems": {title: "EMS", btn: "Add EMS", data:  []},
      "flag-state": {title: "Vessel flags", btn: "Add vessel flag state", data:  []},
      "violations": {title: "Violations", btn: "Add violation", data:  []}
    }
  }

  showDialog = () => {
    this.setState({
      dialogDisplayed: true
    })
  }

  dialogClosed = (items) => {
    const { menuItems, activeItem } = this.state;
    const item = menuItems[activeItem];
    if (items && item){
      item.data = item.data.concat(items);
      this.setState({
        menuItems: menuItems,
        dialogDisplayed: false
      })
    } else {
      this.setState({
        dialogDisplayed: false
      })
    }
  }

  changeCurrentTab = (tab) => {
    this.setState({activeItem: tab});
  }

  render() {

    const { menuItems, dialogDisplayed, activeItem } = this.state;
    const { t, agencyInfo } = this.props;

    const item = menuItems[activeItem];

    return <div className="agency-form-data flex-row full-view">
      <div className="flex-column justify-between form-content-menu">
        <div onClick={()=>this.changeCurrentTab("activity")} className={"form-menu-item" + (activeItem == "activity" || activeItem ==  "gear" || activeItem ==  "fishery" ? " active-form-menu-item": "")}>
          Activity
        </div>
        <div onClick={()=>this.changeCurrentTab("activity")} className={"form-menu-item sub-item" + (activeItem == "activity" ? " active-form-menu-item": "")}>
          Activity
        </div>
        <div onClick={()=>this.changeCurrentTab("fishery")} className={"form-menu-item sub-item" + (activeItem == "fishery" ? " active-form-menu-item": "")}>
          Fishery
        </div>
        <div onClick={()=>this.changeCurrentTab("gear")} className={"form-menu-item sub-item" + (activeItem == "gear" ? " active-form-menu-item": "")}>
          Gear
        </div>
        <div onClick={()=>this.changeCurrentTab("catch")} className={"form-menu-item" + (activeItem == "catch" ? " active-form-menu-item": "")}>
          Catch
        </div>
        <div onClick={()=>this.changeCurrentTab("ems")} className={"form-menu-item" + (activeItem == "ems" ? " active-form-menu-item": "")}>
          EMS
        </div>
        <div onClick={()=>this.changeCurrentTab("flag-state")} className={"form-menu-item" + (activeItem == "flag-state" ? " active-form-menu-item": "")}>
          Vessel flag State
        </div>
        <div onClick={()=>this.changeCurrentTab("violations")} className={"form-menu-item" + (activeItem == "violations" ? " active-form-menu-item": "")}>
          Violations
        </div>
      </div>
      <div className="flex-column form-content form-search">
        <div className="flex-row justify-between align-center form-search-panel">
          <div>
            <h3>{item.data.length + ' ' + item.title} </h3>
          </div>
          <div className="form-search-field">
              <div className="search-icon">
                <SearchIcon />
              </div>
              <input
                className="search-field"
                type="search"
                placeholder="Search Species"
              ></input>
          </div>
          <button className="blue-btn" onClick={this.showDialog}>
            {item.btn}
          </button>
        </div>
        <div className="form-checkbox-list">
          {item
            ? item.data.map((item, ind) => (
                <div
                  className="flex-row align-center form-info-box"
                  key={ind}
                >
                  <input className="check-item" type="checkbox" />
                  {item}
                </div>
              ))
            : "NO " + item.title }
        </div>
      </div>
      {dialogDisplayed && <NewDialog onApply={this.dialogClosed} title={item.title} lineText={item.btn}></NewDialog>}
    </div>;
  }
}

export default withTranslation("translation")(AgencyFormData);
