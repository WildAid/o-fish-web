import React, { Component } from "react";
import moment from "moment";
import { withTranslation } from "react-i18next";

import TextViewer from "../../../partials/text-viewer/text-viewer";


import { VIEW_VESSEL_PAGE } from "../../../../root/root.constants.js";
import withRouter from "../../../../helpers/withRouter";

class VesselSection extends Component {
  setFieldValue = (name, value) => {
    //TODO
  };

  render() {
    const { vessel } = this.props.dataObject;
    const { t, router } = this.props;

    const ems = vessel.ems && vessel.ems.length ? vessel.ems[0] : null;

    return (
      <div className="flex-column">
        <div className="item-name margin-left margin-top">
          {t("TABLE.VESSEL")}
        </div>
        <section className="flex-row box-shadow padding white-bg margin-top">
          <div className="flex-column section-block">
            <h3>{t("FILTER.MAIN.VESSEL_INFO.NAME")}</h3>
            <div
              className="pointer"
              onClick={() =>
                router.navigate(VIEW_VESSEL_PAGE.replace(":filter", JSON.stringify({
                  "vessel.permitNumber": vessel.permitNumber,
                  "vessel.name": vessel.name,
                })))
              }
            >
              <TextViewer
                mainText={vessel.name}
                subText={t("BOARDING_PAGE.VIEW_BOARDING.STATUS")}
              />
            </div>
            <TextViewer
              mainText={vessel.permitNumber}
              subText={t("TABLE.PERMIT_NUMBER")}
            />
            <TextViewer
              mainText={vessel.nationality}
              subText={t("FILTER.MAIN.VESSEL_INFO.NATIONALITY")}
            />
            <TextViewer
              mainText={vessel.homePort}
              subText={t("TABLE.HOME_PORT")}
            />
          </div>
          <div className="flex-column section-block padding-left">
            <h3>{t("BOARDING_PAGE.VIEW_BOARDING.DELIVERY_DATE")}</h3>
            <TextViewer
              mainText={moment(
                vessel && vessel.lastDelivery ? vessel.lastDelivery.date : ""
              ).format("LLL")}
              subText={t("TABLE.DATE")}
            />
            <TextViewer
              mainText={
                vessel && vessel.lastDelivery
                  ? vessel.lastDelivery.location
                  : ""
              }
              subText={t("FILTER.MAIN.BOARDING_INFO.LOCATION")}
            />
            <TextViewer
              mainText={
                vessel && vessel.lastDelivery
                  ? vessel.lastDelivery.business
                  : ""
              }
              subText={t("FILTER.MAIN.LAST_DELIVERY.BUSINESS")}
            />
          </div>
          {!!ems && (
            <div className="flex-column section-block padding-left">
              <h3>{t("BOARDING_PAGE.EDIT_BOARDING.ELECTRONIC_INFO")}</h3>
              <TextViewer
                mainText={ems.emsType}
                subText={t("BOARDING_PAGE.EDIT_BOARDING.TYPE")}
              />
              <TextViewer
                mainText={ems.RegistryNumber}
                subText={t("BOARDING_PAGE.EDIT_BOARDING.REGISTRY_NUMBER")}
              />
              <TextViewer
                mainText={ems.emsDescription}
                subText={t("TABLE.DESCRIPTION")}
              />
            </div>
          )}
        </section>
      </div>
    );
  }
}

export default withRouter(withTranslation("translation")(VesselSection));
