import React, { Component } from "react";
import { TextField } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";

export default class VesselSection extends Component {
  state = {
    vessel: {
      name: "",
      permitNumber: "",
      homePort: "",
      nationality: "",
      lastDelivery: {
        date: "",
        business: "",
        location: "",
      },
      ems: [
        {
          emsType: "",
          RegistryNumber: "",
          emsDescription: "",
        },
      ],
    },
  };

  componentDidMount() {
    if (this.props.dataObject && this.props.dataObject.vessel) {
      this.setState({
        vessel: this.props.dataObject.vessel,
      });
    }
  }

  setFieldValue = (name, value) => {
    const { vessel } = this.state;
    vessel[name] = value;
    this.setState({
      vessel: vessel,
    });
    if (this.props.onChange) {
      const { dataObject } = this.props;
      dataObject.vessel = vessel;
      this.props.onChange(dataObject);
    }
  };

  setEmsFieldValue = (name, value) => {
    const { vessel } = this.state;
    if (!vessel.ems || vessel.ems.length === 0)
      vessel.ems = [
        {
          type: "",
          registry: "",
          description: "",
        },
      ];
    vessel.ems[0][name] = value;
    this.setState({
      vessel: vessel,
    });
    if (this.props.onChange) {
      const { dataObject } = this.props;
      dataObject.vessel = vessel;
      this.props.onChange(dataObject);
    }
  };

  setLdodFieldValue = (name, value) => {
    const { vessel } = this.state;
    if (!vessel.lastDelivery)
      vessel.lastDelivery = {
        date: "",
        business: "",
        location: "",
      };
    if (name === "date") value = new Date(value);
    vessel.lastDelivery[name] = value;
    this.setState({
      vessel: vessel,
    });
    if (this.props.onChange) {
      const { dataObject } = this.props;
      dataObject.vessel = vessel;
      this.props.onChange(dataObject);
    }
  };

  render() {
    const { vessel } = this.state;
    const lastDelivery =
      vessel && vessel.lastDelivery ? vessel.lastDelivery : {};
    const ems = vessel && vessel.ems && vessel.ems[0] ? vessel.ems[0] : {};

    return (
      <div className="flex-column">
        <div className="item-name margin-left margin-top">Vessel</div>
        <section className="box-shadow padding white-bg margin-top">
          <div className="flex-row justify-between align-baseline">
            <h3>Vessel Information</h3>
            <div className="white-btn">
              <Icon>attachment</Icon>
            </div>
          </div>
          <div className="flex-row justify-between">
            <TextField
              label="Vessel Name:"
              className="half-row-view"
              name="name"
              value={vessel.name || ''}
              onChange={(e) => this.setFieldValue("name", e.target.value)}
            />
            <TextField
              label="Home Port:"
              className="half-row-view"
              name="homePort"
              value={vessel.homePort || ''}
              onChange={(e) => this.setFieldValue("homePort", e.target.value)}
            />
          </div>
          <div className="flex-row justify-between margin-top">
            <TextField
              label="Permit Number:"
              className="half-row-view"
              name="permitNumber"
              value={vessel.permitNumber || ''}
              onChange={(e) =>
                this.setFieldValue("permitNumber", e.target.value)
              }
            />
            <TextField
              label="Nationality:"
              className="half-row-view"
              name="nationality"
              value={vessel.nationality || ''}
              onChange={(e) =>
                this.setFieldValue("nationality", e.target.value)
              }
              InputProps={{
                startAdornment: (
                  <div className="nationality-img">
                    <img
                      className="full-view"
                      src={require("../../../../assets/nationality.png")}
                      alt="no icon"
                    />
                  </div>
                ),
              }}
            />
          </div>
        </section>
        <section className="box-shadow padding white-bg margin-top">
          <div className="flex-row justify-between align-baseline">
            <h3>Last Date of delivery</h3>
            <div className="white-btn">
              <Icon>attachment</Icon>
            </div>
          </div>
          <div className="flex-row justify-between">
            <TextField
              label="Date:"
              className="half-row-view"
              name="ldod_date"
              value={lastDelivery.date || ''}
              onChange={(e) => this.setLdodFieldValue("date", e.target.value)}
            />
            <TextField
              label="Location:"
              className="half-row-view"
              name="ldod_location"
              value={lastDelivery.location || ''}
              onChange={(e) =>
                this.setLdodFieldValue("location", e.target.value)
              }
            />
          </div>
          <div className="margin-top">
            <TextField
              label="Business:"
              className="half-row-view"
              name="ldod_business"
              value={lastDelivery.business || ''}
              onChange={(e) =>
                this.setLdodFieldValue("business", e.target.value)
              }
            />
          </div>
        </section>
        <section className="box-shadow padding white-bg margin-top">
          <div className="flex-row justify-between align-baseline">
            <h3>Electronic Monitoring Information</h3>
            <div className="white-btn">
              <Icon>attachment</Icon>
            </div>
          </div>
          <div className="flex-row justify-between">
            <TextField
              label="Type:"
              className="half-row-view"
              name="ems-type"
              value={ems.emsType || ''}
              onChange={(e) => this.setEmsFieldValue("emsType", e.target.value)}
            />
            <TextField
              label="Registry Number:"
              className="half-row-view"
              name="ems-registry"
              value={ems.registryNumber || ''}
              onChange={(e) =>
                this.setEmsFieldValue("registryNumber", e.target.value)
              }
            />
          </div>
          <div className="margin-top">
            <TextField
              label="Description:"
              className="half-row-view"
              name="ems-description"
              value={ems.emsDescription || ''}
              onChange={(e) =>
                this.setEmsFieldValue("emsDescription", e.target.value)
              }
            />
          </div>
        </section>
      </div>
    );
  }
}
