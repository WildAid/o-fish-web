import React, { Component } from "react";
import { TextField } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import { withTranslation } from "react-i18next";

class ActivitySection extends Component {
  state = {
    activity: { name: "" },
    fishery: { name: "" },
    gearType: { name: "" },
  };

  setFieldValue = (name, value) => {
    const state = { ...this.state };
    state[name].name = value;
    this.setState(state);
    if (this.props.onChange) {
      const { dataObject } = this.props;

      if (!dataObject.inspection) dataObject.inspection = {};

      if (!dataObject.inspection[name])
        dataObject.inspection[name] = { name: "" };
      dataObject.inspection[name] = state[name];
      this.props.onChange(dataObject);
    }
  };

  componentDidMount() {
    const inspection =
      this.props.dataObject && this.props.dataObject.inspection
        ? this.props.dataObject.inspection
        : this.state;
    this.setState({
      activity:
        inspection && inspection.activity
          ? inspection.activity.name != null
            ? inspection.activity
            : { name: inspection.activity }
          : { name: "" },
      fishery:
        inspection && inspection.fishery
          ? inspection.fishery.name != null
            ? inspection.fishery
            : { name: inspection.fishery }
          : { name: "" },
      gearType:
        inspection && inspection.gearType
          ? inspection.gearType.name != null
            ? inspection.gearType
            : { name: inspection.gearType }
          : { name: "" },
    });
  }

  render() {
    const { activity, fishery, gearType } = this.state;
    const { t } = this.props;

    return (
      <div className="flex-column">
        <div className="item-name margin-left margin-top">Activity</div>
        <section className="box-shadow padding white-bg margin-top">
          <div className="flex-row justify-between align-baseline">
            <h3>{t("BOARDING_PAGE.VIEW_BOARDING.ACTIVITY")}</h3>
            <div className="white-btn">
              <Icon>attachment</Icon>
            </div>
          </div>
          <div className="flex-row">
            <TextField
              label={t("BOARDING_PAGE.VIEW_BOARDING.ACTIVITY")}
              name="activity.name"
              value={activity.name}
              className="full-view"
              onChange={(e) => this.setFieldValue("activity", e.target.value)}
            />
          </div>
        </section>
        <section className="box-shadow padding white-bg margin-top">
          <div className="flex-row justify-between align-baseline">
            <h3>{t("BOARDING_PAGE.VIEW_BOARDING.FISHERY")}</h3>
            <div className="white-btn">
              <Icon>attachment</Icon>
            </div>
          </div>
          <div className="flex-row">
            <TextField
              label={t("FILTER.MAIN.CATCH.SPECIES")}
              name="fishery.name"
              value={fishery.name}
              className="full-view"
              onChange={(e) => this.setFieldValue("fishery", e.target.value)}
            />
          </div>
        </section>
        <section className="box-shadow padding white-bg margin-top">
          <div className="flex-row justify-between align-baseline">
            <h3>{t("BOARDING_PAGE.VIEW_BOARDING.GEAR")}</h3>
            <div className="white-btn">
              <Icon>attachment</Icon>
            </div>
          </div>
          <div className="flex-row">
            <TextField
              label={`${t("BOARDING_PAGE.VIEW_BOARDING.GEAR")} ${t(
                "BOARDING_PAGE.EDIT_BOARDING.TYPE"
              )}`}
              name="gear.name"
              value={gearType.name}
              className="full-view"
              onChange={(e) => this.setFieldValue("gearType", e.target.value)}
            />
          </div>
        </section>
      </div>
    );
  }
}

export default withTranslation("translation")(ActivitySection);
