import React, { Component } from "react";
import { TextField } from "@material-ui/core";
import AttachFileIcon from '@material-ui/icons/AttachFile';

import { withTranslation } from "react-i18next";
import { CrewItem } from "./CrewItem";
import { v4 as uuidv } from 'uuid';

class CrewSection extends Component {
  state = {
    captainName: "",
    license: ""
  };

  handleChange = (field, value) => {
    this.setState({
      [field]: value
    });
    this.props.onChange('captian', this.state);
  };

  render() {
    const {
      captainName,
      license
    } = this.state;
    const { t, crewList } = this.props;

    return (
      <section className="flex-column box-shadow white-bg margin-top">
        <div className="table-name padding-25 border-bottom">
          {t("NAVIGATION.CREW")}
        </div>
        <div className="padding-25">
          <div className="flex-row justify-between">
            <h3 className="item-name">{t("TABLE.CAPTAIN")}</h3>
            <AttachFileIcon className="blue-color" />
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
          {
            crewList.length === 0 && (
              <span onClick={() => this.props.onChange('crew', [...crewList, { name: '', license: '', id: uuidv() }])} className="blue-color font-16 pointer margin-top">
                {`+ ${t("BUTTONS.ADD_CREW")}`}
              </span>
            )
          }
        </div>
        {
          crewList.length > 0 && (
            crewList.map((crew, index) => (
              <CrewItem
                handleDelete={(id) => this.props.onChange('crew', crewList.filter((crew) => crew.id === id))}
                isLast={index === crewList.length - 1}
                crew={crew}
                handleAdd={() => this.props.onChange('crew', [...crewList, { name: '', license: '', id: uuidv() }])}
                onChange={(crew) => this.props.onChange('crew', crewList.map((x) => x.id === crew.id ? crew : x))}
              />
            ))
          )
        }
      </section>
    );
  }
}

export default withTranslation("translation")(CrewSection);
