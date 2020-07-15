import React from "react";
import { withTranslation } from "react-i18next";
import { withRouter } from "react-router";

import history from "../../../root/root.history";

import UserEditor from "../../partials/user-editor/user-editor.component"

import AuthService from "./../../../services/auth.service";

const authService = AuthService.getInstance();

export default withRouter(withTranslation("translation")(function EditUser(props){
    const { t } = props;
    const id = props.match.params.id;
    
    return (
      <div className="flex-column align-center padding-top">
        <div className="flex-row justify-between standard-view">
          <div>
            <div className="item-label">{t("CREATE_USER_PAGE.USER")}</div>
            <div className="item-name">{t("PROFILE_PAGE.EDIT_USER")}</div>
          </div>
        </div>
        <UserEditor
          userId={id}
          changePassword={authService.userRole === "global" || authService.userRole === "agency"}
          onRedirect={() => history.push("/users")}>
        </UserEditor>
      </div>
    );
}))
