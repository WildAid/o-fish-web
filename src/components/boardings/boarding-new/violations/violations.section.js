import React, { Component } from "react";
import { TextField } from "@material-ui/core";
import AttachFileIcon from '@material-ui/icons/AttachFile';

import { withTranslation } from "react-i18next";

import EmptySection from "../empty-section/empty.section";

class ViolationsSection extends Component {
  handleChange = (field, value) => {
    if (this.props.onChange) {
      const { dataObject } = this.props;
      dataObject[field] = value;
      this.props.onChange(dataObject);
    }
  };

  render() {
    const { t } = this.props;

    return (
      <>      
      <EmptySection
          title={t("TABLE.VIOLATION")}
          description={t("BOARDING_PAGE.NEW_BOARDING.NO_VIOLATIONS")}
          btnName={`+ ${t("BUTTONS.ADD_VIOLATION")}`}
      />
      <section className="box-shadow padding-25 white-bg">
        <div className="flex-row justify-between">
          <h3 className="item-name">{t("BOARDING_PAGE.EDIT_BOARDING.SEIZURES")}</h3>
          <AttachFileIcon className="blue-color"/>
        </div>
        <div className="flex-row justify-between relative margin-bottom">
          <TextField
            label={t("AGENCY_PAGE.EDIT_AGENCY.DESCRIPTION")}
            className="full-view"
            name="name"
            onChange={e => this.handleChange("seizures", e.target.value)}
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
      </section>
      </>
    );
  }
}

export default withTranslation("translation")(ViolationsSection);
