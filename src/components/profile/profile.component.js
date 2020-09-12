import React, { Component } from "react";
import history from "../../root/root.history";
import { withTranslation } from "react-i18next";
import ChangePasswordDialog from "../partials/change-password-dialog/change-password-dialog.js";
import UserEditor from "../partials/user-editor/user-editor.component";
import AuthService from "./../../services/auth.service";

const authService = AuthService.getInstance();

class Profile extends Component {
  state = {
    dialogDisplayed: false,
  };

  showDialog = () => {
    console.log("show dialog");
    this.setState({
      dialogDisplayed: true,
    });
  };

  dialogClosed = (items) => {
    const { menuItems, activeItem } = this.state;
    const item = menuItems[activeItem];
    if (items && item) {
      item.data = item.data.concat(items);
      this.setState({
        menuItems: menuItems,
        dialogDisplayed: false,
      });
      this.saveData();
    } else {
      this.setState({
        dialogDisplayed: false,
      });
    }
  };

  render() {
    const { dialogDisplayed } = this.state;
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
          onChangePassword={(user) => this.showDialog(user)}
        />
        {dialogDisplayed && (
          <ChangePasswordDialog
            onApply={this.dialogClosed}
            title={""}
            lineText={""}
          />
        )}
      </div>
    );
  }
}

export default withTranslation("translation")(Profile);
