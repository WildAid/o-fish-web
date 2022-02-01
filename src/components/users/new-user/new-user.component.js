import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import UserEditor from "../../partials/user-editor/user-editor.component";
import AuthService from "./../../../services/auth.service";

import { USERS_PAGE } from "../../../root/root.constants.js";
import withRouter from "../../../helpers/withRouter";

const authService = AuthService.getInstance();

class NewUser extends Component {
  render() {
    const { t, router } = this.props;
    const currentUser = authService.user;

    return currentUser.global.admin || currentUser.agency.admin ? (
      <div className="flex-column align-center padding-top">
        <div className="flex-row justify-between standard-view">
          <div>
            <div className="item-label">{t("CREATE_USER_PAGE.USER")}</div>
            <div className="item-name">{t("CREATE_USER_PAGE.NEW_USER")}</div>
          </div>
        </div>
        <UserEditor
          showingOptions={{
            saveText: t("BUTTONS.CREATE_USER"),
            role: true,
            newPassword:
              authService.userRole === "global" ||
              authService.userRole === "agency",
          }}
          onRedirect={() => router.navigate(USERS_PAGE)}
        />
      </div>
    ) : (
      <div className="flex-row padding-top justify-center">
        {t("WARNINGS.NOT_AUTHORIZED")}
      </div>
    );
  }
}

export default withRouter(withTranslation("translation")(NewUser));
