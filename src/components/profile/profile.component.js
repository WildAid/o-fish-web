import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import ChangePasswordDialog from "../partials/change-password-dialog/change-password-dialog.js";
import UserEditor from "../partials/user-editor/user-editor.component";
import AuthService from "./../../services/auth.service";
import UserService from "./../../services/user.service";

import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

const authService = AuthService.getInstance();
const userService = UserService.getInstance();

class Profile extends Component {
  state = {
    error: "",
    dialogDisplayed: false,
  };

  showDialog = () => {
    this.setState({
      dialogDisplayed: true,
    });
  };

  dialogClosed = (values) => {
    this.setState({
      dialogDisplayed: false,
    });
    if (values) {
      authService
        .authenticate(authService.user.email, values.oldPassword)
        .then(() => {
          userService.resetPasswordRequest(authService.user.email, values.newPassword)
        })
        .catch((error) => {
          this.setState({
            error: error.message
          })
        })
    }
  };

  resetError = () => {
    this.setState({
      error: "",
    })
  }

  render() {
    const { error, dialogDisplayed } = this.state;
    const { t } = this.props;
    return (
      <div className="flex-column align-center padding-top">
        <div className="flex-row justify-between standard-view">
          <div>
            <div className="item-label">
              {authService.user && authService.user.name
                ? authService.user.name.first + " " + authService.user.name.last
                : "Unauthenticated user"}
            </div>
            <div className="item-name">{t("NAVIGATION.ACCOUNT")}</div>
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
          <ChangePasswordDialog
            onApply={this.dialogClosed}
          />
        )}
        <Snackbar open={error.length > 0} onClose={this.resetError}>
          <Alert severity="error">
            {error}
          </Alert>
        </Snackbar>
      </div>
    );
  }
}

export default withTranslation("translation")(Profile);
