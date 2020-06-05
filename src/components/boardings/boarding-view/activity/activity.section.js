import React, { Component } from "react";

import TextViewer from "../../../partials/text-viewer/text-viewer";

export default class ActivitySection extends Component {
  render() {
    const { inspection } = this.props.dataObject;
    const activity =
      inspection.activity && inspection.activity.name
        ? inspection.activity.name
        : inspection.activity;
    const fishery =
      inspection.fishery && inspection.fishery.name
        ? inspection.fishery.name
        : inspection.fishery;
    const gearType =
      inspection.gearType && inspection.gearType.name
        ? inspection.gearType.name
        : inspection.gearType;

    return (
      <div className="flex-column">
        <div className="item-name margin-left margin-top">Activity</div>
        <section className="flex-row box-shadow padding white-bg margin-top">
          <div className="flex-column section-block">
            <h3>Activity</h3>
            <TextViewer mainText={activity} subText="Activity" />
          </div>
          <div className="flex-column section-block padding-left">
            <h3>Fishery</h3>
            <TextViewer mainText={fishery} subText="Fishery" />
          </div>
          <div className="flex-column section-block padding-left">
            <h3>Gear</h3>
            <TextViewer mainText={gearType} subText="Gear" />
          </div>
        </section>
      </div>
    );
  }
}
