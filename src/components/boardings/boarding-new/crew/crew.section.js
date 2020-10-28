import React, { Component } from "react";
import { TextField } from "@material-ui/core";
import AttachFileIcon from '@material-ui/icons/AttachFile';

import { withTranslation } from "react-i18next";

class CrewSection extends Component {
  state = {
    captainName: "",
    license: ""
  };

  handleChange = (field, value) => {
    this.setState({
      [field]: value      
    });
    this.props.onChange('crew', this.state);
  };

  render() {
    const { 
      captainName,
      license
    } = this.state;
    const { t } = this.props;

    return (
      <section className="flex-column box-shadow white-bg margin-top">
        <div className="table-name padding-25 border-bottom">
          {t("NAVIGATION.CREW")}
        </div>
        <div className="padding-25">
          <div className="flex-row justify-between">
            <h3 className="item-name">{t("TABLE.CAPTAIN")}</h3>
            <AttachFileIcon className="blue-color"/>
          </div>
          <div className="flex-row justify-between relative padding-bottom margin-bottom">
            <TextField
              required
              label={t("TABLE.NAME")}
              className="half-row-view"
              name="name"
              value={captainName}
              onChange={e => this.handleChange("captainName", e.target.value)}
            />
            <TextField
              required
              label={t("TABLE.LICENSE_NUMBER")}
              className="half-row-view"
              name="license"
              value={license}
              onChange={e => this.handleChange("license", e.target.value)}
            />
            <div className="checkbox-wrapper flex-row align-center">
              <input
                className="checkbox"
                type="checkbox"
              />
              <span>
                {t("BOARDING_PAGE.NEW_BOARDING.NONE")}
              </span>
            </div>
          </div>
          <span className="blue-color font-16 pointer margin-top">
            {`+ ${t("BUTTONS.ADD_CREW")}`}
          </span>
        </div>
      </section>
    );
  }
}

export default withTranslation("translation")(CrewSection);
