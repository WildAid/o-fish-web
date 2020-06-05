import React, { Component } from "react";
import moment from "moment";

import TextViewer from "../../../partials/text-viewer/text-viewer";

export default class VesselSection extends Component {
  setFieldValue = (name, value) => {
    //TODO
  };

  render() {
    const { vessel } = this.props.dataObject;
    const ems = vessel.ems && vessel.ems.length ? vessel.ems[0] : null;

    return (
      <div className="flex-column">
        <div className="item-name margin-left margin-top">Vessel</div>
        <section className="flex-row box-shadow padding white-bg margin-top">
          <div className="flex-column section-block">
            <h3>Vessel Information</h3>
            <TextViewer mainText={vessel.name} subText="Vessel Name" />
            <TextViewer
              mainText={vessel.permitNumber}
              subText="Permit Number"
            />
            <TextViewer mainText={vessel.nationality} subText="Nationality" />
            <TextViewer mainText={vessel.homePort} subText="Home Port" />
          </div>
         <div className="flex-column section-block padding-left">
            <h3>Last Date of delivery</h3>
            <TextViewer
              mainText={moment(vessel.lastDelivery.date).format("LLL")}
              subText="Date"
            />
            <TextViewer
              mainText={vessel.lastDelivery.location}
              subText="Location"
            />
            <TextViewer
              mainText={vessel.lastDelivery.business}
              subText="Business"
            />
          </div>
          {!!ems && (
            <div className="flex-column section-block padding-left">
              <h3>Electronic Monitoring System</h3>
              <TextViewer mainText={ems.emsType} subText="Type" />
              <TextViewer
                mainText={ems.RegistryNumber}
                subText="Registry Number"
              />
              <TextViewer mainText={ems.emsDescription} subText="Description" />
            </div>
          )}
        </section>
      </div>
    );
  }
}
