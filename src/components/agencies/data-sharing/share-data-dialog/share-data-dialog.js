import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import CloseIcon from "@material-ui/icons/Close";

import AuthService from "./../../../../services/auth.service";

import "./share-data-dialog.css";

const authService = AuthService.getInstance();

class ShareDataDialog extends Component {
  state = {
    chosenAgency: "",
  };

  chooseAgency = (agency) => {
    const { onChangeAgency } = this.props;
    delete agency.boardings;
    delete agency.violations;

    this.setState({ chosenAgency: agency });
    onChangeAgency(agency);
  };

  render() {
    const { t, onCancel, onSubmit, agencies, chosenAgency } = this.props;

    return (
      <div className="new-menu-dialog full-screen">
        <div className="shared-data-dialog internal flex-column">
          <div className="dialog-header">
            <h2 className="title dialog-title">
              {t("DATA_SHARING.MANAGE_SHARED_DATA.SHARE_BOARDING_DATA")}
            </h2>
            <CloseIcon
              className="close-icon"
              onClick={() => onCancel("shareDataDialog")}
            />
            <h3>{t("DATA_SHARING.MANAGE_SHARED_DATA.SELECT_AGENCY")}</h3>
          </div>
          <div className="standard-view padding-top padding-bottom">
            <FormControl className="form-input">
              <InputLabel id="agency-label">{t("TABLE.AGENCY")}</InputLabel>
              <Select
                readOnly={false}
                labelId="agency-label"
                onChange={(e) => this.chooseAgency(e.target.value)}
                value={chosenAgency}
              >
                {authService.userRole === "global" ? (
                  agencies.map((agency, ind) => (
                    <MenuItem value={agency} key={ind}>
                      <em>{agency.name}</em>
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem value={authService.user.agency.name} key={0}>
                    <em>{authService.user.agency.name}</em>
                  </MenuItem>
                )}
              </Select>
            </FormControl>
          </div>
          <div className="buttons-row flex-row full-view padding-top">
            <div className="blue-btn flex-row" onClick={onSubmit}>
              <div>{t("BUTTONS.CHOOSE_DATA")}</div>
              <div className="arrow-right">
                <img
                  className="icon"
                  src={require("../../../../assets/right-arrow.svg")}
                  alt="no arrow img"
                />
              </div>
            </div>
            <button className="simple-btn" onClick={onCancel}>
              {t("BUTTONS.CANCEL")}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation("translation")(ShareDataDialog);
