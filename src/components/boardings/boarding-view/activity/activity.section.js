import React, { Component } from "react";
import { withTranslation } from "react-i18next";

import TextViewer from "../../../partials/text-viewer/text-viewer";

class ActivitySection extends Component {
  render() {
    const { inspection } = this.props.dataObject;
    const { t } = this.props;

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
        <div className="item-name margin-left margin-top">
          {t("BOARDING_PAGE.VIEW_BOARDING.ACTIVITY")}
        </div>
        <section className="flex-row box-shadow padding white-bg margin-top">
          <div className="flex-column section-block">
            <h3>{t("BOARDING_PAGE.VIEW_BOARDING.ACTIVITY")}</h3>
            <TextViewer
              mainText={activity}
              subText={t("BOARDING_PAGE.VIEW_BOARDING.ACTIVITY")}
            />
          </div>
          <div className="flex-column section-block padding-left">
            <h3>{t("BOARDING_PAGE.VIEW_BOARDING.FISHERY")}</h3>
            <TextViewer
              mainText={fishery}
              subText={t("BOARDING_PAGE.VIEW_BOARDING.FISHERY")}
            />
          </div>
          <div className="flex-column section-block padding-left">
            <h3>{`${t("BOARDING_PAGE.VIEW_BOARDING.GEAR")} ${t(
              "BOARDING_PAGE.EDIT_BOARDING.TYPE"
            )}`}</h3>
            <TextViewer
              mainText={gearType}
              subText={t("BOARDING_PAGE.VIEW_BOARDING.GEAR")}
            />
          </div>
        </section>
      </div>
    );
  }
}

export default withTranslation("translation")(ActivitySection);
