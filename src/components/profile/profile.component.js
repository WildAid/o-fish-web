import React, { Component } from "react";
import history from "../../root/root.history";
import { withTranslation } from "react-i18next";
import UserEditor from "../partials/user-editor/user-editor.component"
import AuthService from "./../../services/auth.service";

const authService = AuthService.getInstance();

export default withTranslation("translation")(function Profile(props){
    const { t } = props;
    return (
      <div className="flex-column align-center padding-top">
        <div className="flex-row justify-between standard-view">
          <div>
            <div className="item-label">
              {
                authService.user ?
                authService.user.name.first + " " + authService.user.name.last :
                "Unauthenticated user"
              }
            </div>
            <div className="item-name">{t("NAVIGATION.ACCOUNT")}</div>
          </div>
        </div>
        <UserEditor
          userId={authService.user._id}
          onRedirect={() => history.push("/home")}>
        </UserEditor>
      </div>
    );
})
