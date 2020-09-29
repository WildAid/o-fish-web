import React, { Component } from "react";
import { withTranslation } from "react-i18next";

import "./data-sharing.css";

class AgencyDataSharing extends Component {
  state = {
    dialogDisplayed: false,
  };

  showDialog = () => {
    this.setState({
      dialogDisplayed: true,
    });
  };

  saveData = () => {};

  dialogClosed = (items) => {};

  deleteItem = (tab, itemIndex) => {};

  changeCurrentTab = (tab) => {};

  componentDidMount() {}

  render() {
    const { item } = this.state;

    return (
      <div className="agency-form-data flex-row full-view">
        <div className="flex-start justify-between form-content-menu"></div>
        <div>{item && <div></div>}</div>
      </div>
    );
  }
}

export default withTranslation("translation")(AgencyDataSharing);
