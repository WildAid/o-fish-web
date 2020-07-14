import React, { Component, Fragment } from "react";
import { withTranslation } from "react-i18next";
import history from "../../../root/root.history";
import UserEditor from "../../partials/user-editor/user-editor.component"
import AuthService from "./../../../services/auth.service";

const authService = AuthService.getInstance();

class NewUser extends Component {

  render() {
    const { t } = this.props;

    return (
      <div className="flex-column align-center padding-top">
        <div className="flex-row justify-between standard-view">
          <div>
            <div className="item-label">{t("CREATE_USER_PAGE.USER")}</div>
            <div className="item-name">{t("CREATE_USER_PAGE.NEW_USER")}</div>
          </div>
        </div>
        <UserEditor
          newPassword={authService.userRole == "global" || authService.userRole == "agency"}
          onRedirect={() => history.push("/users")}>
        </UserEditor>
      </div>
    );
  }
}

export default withTranslation("translation")(NewUser);
