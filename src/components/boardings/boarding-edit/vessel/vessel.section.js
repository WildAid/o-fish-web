import React, { Component } from "react";
import { TextField } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import { withTranslation } from "react-i18next";

class VesselSection extends Component {
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
    const { t } = this.props;

    const lastDelivery =
      vessel && vessel.lastDelivery ? vessel.lastDelivery : null;
    const ems = vessel && vessel.ems && vessel.ems[0] ? vessel.ems[0] : {};

    return (
      <div className="flex-column">
        <div className="item-name margin-left margin-top">
          {t("TABLE.VESSEL")}
        </div>
        <section className="box-shadow padding white-bg margin-top">
          <div className="flex-row justify-between align-baseline">
            <h3>{t("FILTER.MAIN.VESSEL_INFO.NAME")}</h3>
            <div className="white-btn">
              <Icon>attachment</Icon>
            </div>
          </div>
          <div className="flex-row justify-between">
            <TextField
              label={t("BOARDING_PAGE.VIEW_BOARDING.VESSEL_NAME")}
              className="half-row-view"
              name="name"
              value={vessel.name || ""}
              onChange={(e) => this.setFieldValue("name", e.target.value)}
            />
            <TextField
              label={t("TABLE.HOME_PORT")}
              className="half-row-view"
              name="homePort"
              value={vessel.homePort || ""}
              onChange={(e) => this.setFieldValue("homePort", e.target.value)}
            />
          </div>
          <div className="flex-row justify-between margin-top">
            <TextField
              label={t("TABLE.PERMIT_NUMBER")}
              className="half-row-view"
              name="permitNumber"
              value={vessel.permitNumber || ""}
              onChange={(e) =>
                this.setFieldValue("permitNumber", e.target.value)
              }
            />
            <TextField
              label={t("FILTER.MAIN.VESSEL_INFO.NATIONALITY")}
              className="half-row-view"
              name="nationality"
              value={vessel.nationality || ""}
              onChange={(e) =>
                this.setFieldValue("nationality", e.target.value)
              }
              InputProps={{
                startAdornment: (
                  <div className="nationality-img">
                    <img
                      className="full-view"
                      src={require("../../../../assets/nationality.png").default}
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
            <h3>{t("BOARDING_PAGE.VIEW_BOARDING.DELIVERY_DATE")}</h3>
            <div className="white-btn">
              <Icon>attachment</Icon>
            </div>
          </div>
          <div className="flex-row justify-between">
            <TextField
              label={t("TABLE.DATE")}
              className="half-row-view"
              name="ldod_date"
              value={!!lastDelivery ? lastDelivery.date : ""}
              onChange={(e) => this.setLdodFieldValue("date", e.target.value)}
            />
            <TextField
              label={t("FILTER.MAIN.BOARDING_INFO.LOCATION")}
              className="half-row-view"
              name="ldod_location"
              value={!!lastDelivery ? lastDelivery.location : ""}
              onChange={(e) =>
                this.setLdodFieldValue("location", e.target.value)
              }
            />
          </div>
          <div className="margin-top">
            <TextField
              label={t("FILTER.MAIN.LAST_DELIVERY.BUSINESS")}
              className="half-row-view"
              name="ldod_business"
              value={!!lastDelivery ? lastDelivery.business : ""}
              onChange={(e) =>
                this.setLdodFieldValue("business", e.target.value)
              }
            />
          </div>
        </section>
        <section className="box-shadow padding white-bg margin-top">
          <div className="flex-row justify-between align-baseline">
            <h3>{t("BOARDING_PAGE.EDIT_BOARDING.ELECTRONIC_INFO")}</h3>
            <div className="white-btn">
              <Icon>attachment</Icon>
            </div>
          </div>
          <div className="flex-row justify-between">
            <TextField
              label={t("BOARDING_PAGE.EDIT_BOARDING.TYPE")}
              className="half-row-view"
              name="ems-type"
              value={ems.emsType || ""}
              onChange={(e) => this.setEmsFieldValue("emsType", e.target.value)}
            />
            <TextField
              label={t("BOARDING_PAGE.EDIT_BOARDING.REGISTRY_NUMBER")}
              className="half-row-view"
              name="ems-registry"
              value={ems.registryNumber || ""}
              onChange={(e) =>
                this.setEmsFieldValue("registryNumber", e.target.value)
              }
            />
          </div>
          <div className="margin-top">
            <TextField
              label={t("TABLE.DESCRIPTION")}
              className="half-row-view"
              name="ems-description"
              value={ems.emsDescription || ""}
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

export default withTranslation("translation")(VesselSection);
