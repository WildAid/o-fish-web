import React, { Component } from "react";
import { FormControl, MenuItem, Select, TextField, InputLabel } from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/moment";

import { withTranslation } from "react-i18next";
import { AttachFile } from "../../../partials/attachment";
import { ImagePreview } from "../../../partials/image-preview";
import StitchService from "../../../../services/stitch.service";
import AuthService from "../../../../services/auth.service";
import { bufferToBase64 } from "../../../../helpers/get-data";
import countryList from 'react-select-country-list';

const stitchService = StitchService.getInstance();
const authService = AuthService.getInstance();

class VesselSection extends Component {
  state = {
    name: "",
    permitNumber: "",
    homePort: "",
    nationality: "",
    attachments: [],
    lastDelivery: {
      date: null,
      business: "",
      location: "",
    },
    vesselImage: '',
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
    }, this.updateParentState);
  };

  updateParentState = () => {
    const { vesselImage, ...formData } = this.state;
    this.props.onChange('vessel', formData);
  }

  handleUploadPhoto = (blob) => {
    stitchService.uploadImage(blob, authService.user.agency.name).then((data) => {
      this.setState({ attachments: [data.insertedId] }, () => {
        this.updateParentState();
        stitchService.getPhoto(data.insertedId).then((photoObject) => {
          this.setState({
            vesselImage: "data:image/jpeg;base64," + bufferToBase64(photoObject.picture.buffer),
          });
        })
      });
    });
  }

  handleRemovePhoto = () => {
    const image = this.state.attachments?.[0];
    if (image) {
      stitchService.deleteImage(image).then(() => this.setState({
        attachments: [],
        vesselImage: "",
      }, this.updateParentState));
    }
  }

  countryList = countryList().getData();

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
              <AttachFile onChange={this.handleUploadPhoto} />
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
              <FormControl className="half-row-view">
                <InputLabel id="nationality">{t("DATA_SHARING.MANAGE_SHARED_DATA.FLAG_STATE")}</InputLabel>
                <Select
                  onChange={(e) => this.handleChange("nationality", false, e.target.value)}
                  value={nationality}
                  labelId={"nationality"}
                >
                  {
                    this.countryList.map((country) => (
                      <MenuItem value={country.value} key={country.value}>
                        {country.label}
                      </MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
            </div>
            {
              this.state.vesselImage && (
                <ImagePreview src={this.state.vesselImage} onRemove={this.handleRemovePhoto} />
              )
            }
          </div>
        </section>
        <section className="box-shadow padding-25 white-bg">
          <div className="flex-row justify-between">
            <h3 className="item-name">
              {t("BOARDING_PAGE.VIEW_BOARDING.DELIVERY_DATE")}
            </h3>
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
          </div>
        </section>
      </div>
    );
  }
}

export default withTranslation("translation")(VesselSection);
