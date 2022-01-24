import React, { Component } from "react";
import NewDialog from "./new-dialog.js";
import SearchIcon from "@material-ui/icons/Search";
import { withTranslation } from "react-i18next";
import CountryRegionData from "country-region-data";

import "../form-data/form-data.css";

import CustomMenuService from "./../../../services/custom-menu.service";

const menuService = CustomMenuService.getInstance();

class AgencyFormData extends Component {
  state = {
    dialogDisplayed: false,
    menuId: null,
    activeItem: "activities",
    menuItems: {
      activities: { title: "Activities", btn: "Add activity", data: [] },
      species: { title: "Species", btn: "Add species", data: [] },
      gear: { title: "Gear Types", btn: "Add gear type", data: [] },
      fisheries: { title: "Fisheries", btn: "Add fisheries", data: [] },
      emsTypes: { title: "EMS", btn: "Add EMS", data: [] },
      countryPickerPriorityList: {
        title: "Vessel flags",
        btn: "Add preferred vessel flag state",
        data: [],
      },
      violationCodes: { title: "Violation Codes", btn: "Add code", data: [] },
      violationDescriptions: {
        title: "Violation Descriptions",
        btn: "Add description",
        data: [],
      },
    },
  };

  showDialog = () => {
    this.setState({
      dialogDisplayed: true,
    });
  };

  saveData = () => {
    const { menuItems, activeItem, menuId } = this.state;
    const item = menuItems[activeItem];
    const data = {};
    data[activeItem] = item.data;
    menuService
      .updateMenus(menuId, { $set: data })
      .then((result) => {})
      .catch((err) => {});
  };

  dialogClosed = (items) => {
    const { menuItems, activeItem } = this.state;
    const item = menuItems[activeItem];
    if (items && item) {
      item.data = item.data.concat(items);
      this.setState({
        menuItems: menuItems,
        dialogDisplayed: false,
      });
      this.saveData();
    } else {
      this.setState({
        dialogDisplayed: false,
      });
    }
  };

  deleteItem = (tab, itemIndex) => {
    const { menuItems } = this.state;
    const item = menuItems[tab];
    if (item && item.data && itemIndex < item.data.length) {
      item.data.splice(itemIndex, 1);
      this.setState({
        menuItems: menuItems,
        dialogDisplayed: false,
      });
      this.saveData();
    }
  };

  changeCurrentTab = (tab) => {
    this.setState({ activeItem: tab });
  };

  componentDidMount() {
    const { menuItems } = this.state;
    this.countries = {};
    CountryRegionData.forEach((item) => {
      this.countries[item.countryShortCode] = item.countryName;
    });

    if (this.props.agency && this.props.agency.name) {
      menuService.getMenus(this.props.agency.name).then((menuData) => {
        if (menuData) {
          for (const key in menuData) {
            if (menuItems[key]) {
              menuItems[key].data = menuData[key];
            }
          }
          this.setState({
            menuItems: menuItems,
            menuId: menuData._id,
          });
        } else {
          const data = { agency: this.props.agency.name };
          for (var itemName in menuItems) {
            data[itemName] = menuItems[itemName].data;
          }
          menuService.createMenus(data).then((result) => {
            this.setState({
              menuId: result.insertedId,
            });
          });
        }
      });
    }
  }

  render() {
    const { menuItems, dialogDisplayed, activeItem } = this.state;
    const { t } = this.props;
    const item = menuItems[activeItem];

    return (
      <div className="agency-form-data white-bg box-shadow flex-row full-view">
        <div className="flex-start justify-between form-content-menu">
          <div
            onClick={() => this.changeCurrentTab("activities")}
            className={
              "form-menu-item" +
              (activeItem === "activities" ||
              activeItem === "gear" ||
              activeItem === "fishery"
                ? " active-form-menu-item"
                : "")
            }
          >
            Activity
          </div>
          <div
            onClick={() => this.changeCurrentTab("activities")}
            className={
              "form-menu-item sub-item" +
              (activeItem === "activities" ? " active-form-menu-item" : "")
            }
          >
            Activity
          </div>
          <div
            onClick={() => this.changeCurrentTab("fisheries")}
            className={
              "form-menu-item sub-item" +
              (activeItem === "fisheries" ? " active-form-menu-item" : "")
            }
          >
            Fishery
          </div>
          <div
            onClick={() => this.changeCurrentTab("gear")}
            className={
              "form-menu-item sub-item" +
              (activeItem === "gear" ? " active-form-menu-item" : "")
            }
          >
            Gear
          </div>
          <div
            onClick={() => this.changeCurrentTab("species")}
            className={
              "form-menu-item" +
              (activeItem === "species" ? " active-form-menu-item" : "")
            }
          >
            Catch
          </div>
          <div
            onClick={() => this.changeCurrentTab("emsTypes")}
            className={
              "form-menu-item" +
              (activeItem === "emsTypes" ? " active-form-menu-item" : "")
            }
          >
            EMS
          </div>
          <div
            onClick={() => this.changeCurrentTab("countryPickerPriorityList")}
            className={
              "form-menu-item" +
              (activeItem === "countryPickerPriorityList"
                ? " active-form-menu-item"
                : "")
            }
          >
            Vessel flag State
          </div>
          <div
            onClick={() => this.changeCurrentTab("violationCodes")}
            className={
              "form-menu-item" +
              (activeItem === "violationCodes" ? " active-form-menu-item" : "")
            }
          >
            Violation Codes
          </div>
          <div
            onClick={() => this.changeCurrentTab("violationDescriptions")}
            className={
              "form-menu-item" +
              (activeItem === "violationDescriptions"
                ? " active-form-menu-item"
                : "")
            }
          >
            Violations Descriptions
          </div>
        </div>
        {item && item.data && item.data.length ? (
          <div className="flex-column form-content form-search">
            <div className="flex-row justify-between align-center form-search-panel">
              <div>
                <h3>{item.data.length + " " + item.title} </h3>
              </div>
              <div className="form-search-field">
                <div className="search-icon">
                  <SearchIcon />
                </div>
                <input
                  className="search-field"
                  type="search"
                  placeholder={t("BUTTONS.SEARCH") + " " + item.title}
                ></input>
              </div>
              <button className="blue-btn" onClick={this.showDialog}>
                {item.btn}
              </button>
            </div>
            <div className="form-checkbox-list">
              {item.data.map((item, ind) => (
                <div className="flex-row align-center form-info-box" key={ind}>
                  <input className="check-item" type="checkbox" />
                  <span className="name">
                    {activeItem === "countryPickerPriorityList"
                      ? this.countries[item]
                      : item}
                  </span>
                  <span
                    className="inline-btn"
                    onClick={() => this.deleteItem(activeItem, ind)}
                  >
                    {t("BUTTONS.DELETE")}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex-column full-view align-center form-content form-empty">
            <div className="title flex-row align-center justify-center">
              No {item.title}
            </div>
            <button className="blue-btn" onClick={this.showDialog}>
              {item.btn}
            </button>
          </div>
        )}
        {dialogDisplayed && (
          <NewDialog
            onApply={this.dialogClosed}
            title={item.title}
            lineText={item.btn}
            showCountry={activeItem === "countryPickerPriorityList"}
          />
        )}
      </div>
    );
  }
}

export default withTranslation("translation")(AgencyFormData);
