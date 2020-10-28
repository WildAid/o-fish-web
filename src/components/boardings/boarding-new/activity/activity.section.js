import React, { Component } from "react";
import { TextField } from "@material-ui/core";
import AttachFileIcon from "@material-ui/icons/AttachFile";

import { withTranslation } from "react-i18next";

class ActivitySection extends Component {
  handleChange = (field, value) => {
    const newActivities = {
      ...this.props.inspection,
      [field]: { name: value },
    }

    this.props.onChange("inspection", newActivities);
  };

  render() {
    const { t } = this.props;

    return (
      <>
        <section className="box-shadow white-bg margin-top padding-bottom">
          <div className="table-name border-bottom">
            {t("BOARDING_PAGE.VIEW_BOARDING.ACTIVITY")}
          </div>
          <div className="padding-25">
            <div>
              <div className="flex-row justify-between">
                <h3 className="item-name">
                  {t("BOARDING_PAGE.VIEW_BOARDING.ACTIVITY")}
                </h3>
                <AttachFileIcon className="blue-color" />
              </div>
              <div className="flex-row justify-between padding-bottom margin-bottom">
                <TextField
                  required
                  label={t("BOARDING_PAGE.VIEW_BOARDING.ACTIVITY")}
                  className="full-view required-field"
                  name="activity"
                  onChange={(e) =>
                    this.handleChange("activity", e.target.value)
                  }
                />
              </div>
            </div>
            <div className="flex-row justify-between">
              <h3 className="item-name">
                {t("BOARDING_PAGE.VIEW_BOARDING.FISHERY")}
              </h3>
              <AttachFileIcon className="blue-color" />
            </div>
            <div className="flex-row justify-between padding-bottom margin-bottom">
              <TextField
                label={t("BOARDING_PAGE.VIEW_BOARDING.FISHERY")}
                className="full-view"
                name="fishery"
                onChange={(e) => this.handleChange("fishery", e.target.value)}
              />
            </div>
            <div className="flex-row justify-between">
              <h3 className="item-name">
                {t("BOARDING_PAGE.VIEW_BOARDING.GEAR")}
              </h3>
              <AttachFileIcon className="blue-color" />
            </div>
            <div className="flex-row justify-between padding-bottom margin-bottom">
              <TextField
                label={t("BOARDING_PAGE.VIEW_BOARDING.GEAR")}
                className="full-view"
                name="gear"
                onChange={(e) => this.handleChange("gearType", e.target.value)}
              />
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default withTranslation("translation")(ActivitySection);
