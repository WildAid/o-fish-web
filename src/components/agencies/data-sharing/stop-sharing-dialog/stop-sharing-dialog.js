import React from "react";
import { withTranslation } from "react-i18next";

import CloseIcon from "@material-ui/icons/Close";

import "./stop-sharing-dialog.css";

const StopSharingDialog = ({ t, agencyName, onCancel, onSubmit }) => {
  return (
    <div className="new-menu-dialog full-screen">
      <div className="shared-data-dialog internal flex-column">
        <div className="dialog-header">
          <h2 className="title dialog-title">
            {`${t("AGENCY_PAGE.STOP_SHARING_DATA_WITH_AGENCY")}`}
          </h2>
          <CloseIcon className="close-icon" onClick={onCancel} />
          <h1 className="dialog-agency-name">{agencyName}</h1>
        </div>
        <div className="dialog-text">
          {`${t("AGENCY_PAGE.NO_NEW_DATA_WILL_BE_SHARED_WITH_THIS_AGENCY")}`}
        </div>
        <div className="buttons-row flex-row full-view">
          <button className="blue-btn dialog-submit-btn" onClick={onSubmit}>
            {`${t("BUTTONS.STOP_SHARING")}`}
          </button>
          <button className="simple-btn" onClick={onCancel}>
            {`${t("BUTTONS.CANCEL")}`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default withTranslation("translation")(StopSharingDialog);
