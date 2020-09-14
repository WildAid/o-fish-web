import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import ChangePasswordDialog from "../partials/change-password-dialog/change-password-dialog.js";
import UserEditor from "../partials/user-editor/user-editor.component";
import AuthService from "./../../services/auth.service";
import UserService from "./../../services/user.service";

import Alert from "@material-ui/lab/Alert";

import "./profile.css";

const authService = AuthService.getInstance();
const userService = UserService.getInstance();

class Profile extends Component {
  state = {
    successMsg: "",
    errorMsg: "",
    dialogDisplayed: false,
  };

  showDialog = () => {
    this.setState({
      dialogDisplayed: true,
    });
    this.dismissSuccess();
    this.dismissError();
  };

  dialogClosed = (values) => {
    this.setState({ dialogDisplayed: false });
    if (values) {
      authService
        .authenticate(authService.user.email, values.oldPassword)
        .then(() => {
          userService.resetPasswordRequest(
            authService.user.email,
            values.newPassword
          );
        })
        .then(() => {
          this.setState({
            successMsg: this.props.t("CHANGE_PASSWORD.SUCCESS"),
          });
        })
        .catch((error) => {
          this.setState({ errorMsg: error.message });
        });
    }
  };

  dismissSuccess = () => {
    this.setState({
      successMsg: "",
    });
  };

  dismissError = () => {
    this.setState({
      errorMsg: "",
    });
  };

  render() {
    const { errorMsg, successMsg, dialogDisplayed } = this.state;
    const { t } = this.props;

    return (
      <div className="flex-column align-center padding-top">
        <div className="flex-row justify-between standard-view ">
          <div className="banner-row">
            <div className="item-label">
              {authService.user && authService.user.name
                ? authService.user.name.first + " " + authService.user.name.last
                : "Unauthenticated user"}
            </div>
            <div className="item-name">{t("NAVIGATION.ACCOUNT")}</div>
            <div className="alert-banner">
              {successMsg && (
                <Alert icon={false} onClose={this.dismissSuccess}>
                  {successMsg}
                </Alert>
              )}
              {errorMsg && (
                <Alert
                  icon={false}
                  severity="error"
                  onClose={this.dismissError}
                >
                  {errorMsg}
                </Alert>
              )}
            </div>
          </div>
        </div>
        <UserEditor
          userId={authService.user._id}
          showingOptions={{
            saveText: t("BUTTONS.SAVE"),
            role: false,
            changePassword: true,
          }}
          onChangePassword={this.showDialog}
        />
        {dialogDisplayed && (
          <ChangePasswordDialog onApply={this.dialogClosed} />
        )}
      </div>
    );
  }
}

export default withTranslation("translation")(Profile);
