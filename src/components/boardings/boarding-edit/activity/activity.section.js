import React, { Component } from "react";
import { TextField } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";

export default class ActivitySection extends Component {
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

    return (
      <div className="flex-column">
        <div className="item-name margin-left margin-top">Activity</div>
        <section className="box-shadow padding white-bg margin-top">
          <div className="flex-row justify-between align-baseline">
            <h3>Activity</h3>
            <div className="white-btn">
              <Icon>attachment</Icon>
            </div>
          </div>
          <div className="flex-row">
            <TextField
              label="Activity:"
              name="activity.name"
              value={activity.name}
              className="full-view"
              onChange={(e) => this.setFieldValue("activity", e.target.value)}
            />
          </div>
        </section>
        <section className="box-shadow padding white-bg margin-top">
          <div className="flex-row justify-between align-baseline">
            <h3>Fishery</h3>
            <div className="white-btn">
              <Icon>attachment</Icon>
            </div>
          </div>
          <div className="flex-row">
            <TextField
              label="Species:"
              name="fishery.name"
              value={fishery.name}
              className="full-view"
              onChange={(e) => this.setFieldValue("fishery", e.target.value)}
            />
          </div>
        </section>
        <section className="box-shadow padding white-bg margin-top">
          <div className="flex-row justify-between align-baseline">
            <h3>Gear</h3>
            <div className="white-btn">
              <Icon>attachment</Icon>
            </div>
          </div>
          <div className="flex-row">
            <TextField
              label="Gear Type:"
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
