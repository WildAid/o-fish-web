import React, { Component } from "react";
import { TextField } from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/moment";

import { withTranslation } from "react-i18next";
import { AttachFile } from "../../../partials/attachment";
import { ImagePreview } from "../../../partials/image-preview";

class VesselSection extends Component {
  state = {
    name: "",
    permitNumber: "",
    homePort: "",
    nationality: "",
    lastDelivery: {
      date: null,
      business: "",
      location: "",
    },
    vesselImage: '',
    deliveryImage: '',
  };

  handleChange = (type, subType = false, value) => {
    let obj = {};

    subType
      ? (obj[type] = {
        [subType]: value,
      })
      : (obj[type] = value);

    this.setState((prevState) => {
      if (subType) {
        return {
          [type]: {
            ...prevState[type],
            ...obj[type],
          },
        };
      } else {
        return {
          [type]: value,
        };
      }
    });
    this.props.onChange('vessel', this.state);
  };

  render() {
    const {
      name,
      permitNumber,
      homePort,
      nationality,
      lastDelivery: { date, business, location },
    } = this.state;
    const { t } = this.props;

    return (
      <div className="flex-column">
        <section className="box-shadow white-bg margin-top">
          <div className="table-name padding-25 border-bottom">
            {t("TABLE.VESSEL")}
          </div>
          <div className="padding-25">
            <div className="flex-row justify-between">
              <h3 className="item-name">{t("FILTER.MAIN.VESSEL_INFO.NAME")}</h3>
              <AttachFile onChange={(image) => this.setState({ vesselImage: image })} />
            </div>
            <div className="flex-row justify-between relative">
              <TextField
                required
                label={t("BOARDING_PAGE.VIEW_BOARDING.STATUS")}
                className="half-row-view"
                name="name"
                value={name}
                onChange={(e) =>
                  this.handleChange("name", false, e.target.value)
                }
              />
              <TextField
                required
                label={t("TABLE.PERMIT_NUMBER")}
                className="half-row-view"
                name="permitNumber"
                value={permitNumber}
                onChange={(e) =>
                  this.handleChange("permitNumber", false, e.target.value)
                }
              />
              <div className="checkbox-wrapper flex-row align-center">
                <input className="checkbox" type="checkbox" />
                <span>{t("BOARDING_PAGE.NEW_BOARDING.NONE")}</span>
              </div>
            </div>
            <div className="flex-row justify-between margin-top margin-bottom">
              <TextField
                label={t("TABLE.HOME_PORT")}
                className="half-row-view"
                name="homePort"
                value={homePort}
                onChange={(e) =>
                  this.handleChange("homePort", false, e.target.value)
                }
              />
              <TextField
                label={t("DATA_SHARING.MANAGE_SHARED_DATA.FLAG_STATE")}
                className="half-row-view"
                name="flag-state"
                value={nationality}
                onChange={(e) =>
                  this.handleChange("nationality", false, e.target.value)
                }
              />
            </div>
            {
              this.state.vesselImage && (
                <ImagePreview src={this.state.vesselImage} onRemove={() => this.setState({ vesselImage: '' })} />
              )
            }
          </div>
        </section>
        <section className="box-shadow padding-25 white-bg">
          <div className="flex-row justify-between">
            <h3 className="item-name">
              {t("BOARDING_PAGE.VIEW_BOARDING.DELIVERY_DATE")}
            </h3>
            <AttachFile onChange={(image) => this.setState({ deliveryImage: image })} />
          </div>
          <div className="flex-row justify-between margin-bottom">
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                required
                disableToolbar
                variant="inline"
                format="yyyy/MM/DD"
                margin="normal"
                id="ldd-date-picker"
                className="third-row-view last-date-delivery"
                label={t("TABLE.DATE")}
                value={date}
                onChange={(date) =>
                  this.handleChange("lastDelivery", "date", date)
                }
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>
            <TextField
              label={t("FILTER.MAIN.LAST_DELIVERY.BUSINESS")}
              className="third-row-view"
              name="ldod_business"
              value={business}
              onChange={(e) =>
                this.handleChange("lastDelivery", "business", e.target.value)
              }
            />
            <TextField
              label={t("FILTER.MAIN.BOARDING_INFO.LOCATION")}
              className="third-row-view"
              name="ldod_location"
              value={location}
              onChange={(e) =>
                this.handleChange("lastDelivery", "location", e.target.value)
              }
            />
            {this.state.deliveryImage
              && (
                <ImagePreview src={this.state.deliveryImage} onRemove={() => this.setState({ deliveryImage: '' })} />
              )
            }
          </div>
        </section>
      </div>
    );
  }
}

export default withTranslation("translation")(VesselSection);
