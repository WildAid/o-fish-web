import React, { Component } from "react";
import { withTranslation } from "react-i18next";

import CloseIcon from "@material-ui/icons/Close";

import "./manage-shared-data-dialog.css";

class ManageSharedDataDialog extends Component {
  state = {
    customWideAccess: false,
  };

  componentDidMount() {
    this.setState({
      customWideAccess: this.props.receivedWideAccess,
    });
  }

  handleWideAccess = () => {
    this.setState((prevState) => ({
      customWideAccess: !prevState.customWideAccess,
    }));
  };

  render() {
    const { customWideAccess } = this.state;

    const { t, agencyName, onCancel, onSave } = this.props;

    return (
      <div className="new-menu-dialog full-screen">
        <div className="shared-data-dialog internal flex-column">
          <div className="dialog-header">
            <h1 className="title dialog-title">{agencyName}</h1>
            <CloseIcon className="close-icon" onClick={onCancel} />
            <h2 className="dialog-subtitle">
              {`${t("DATA_SHARING.MANAGE_SHARED_DATA.DATA_ACCESS")}`}
            </h2>
          </div>
          <div className="content justify-center full-view">
            <table className="full-view">
              <thead className="line">
                <tr className="table-header-row">
                  <th align="left" className="table-header-cell padding-left">
                    {t("NAVIGATION.USERS")}
                  </th>
                  <th align="right" className="table-header-cell padding-right">
                    {t("DATA_SHARING.MANAGE_SHARED_DATA.READ_ACCESS")}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="dialog-table-row line">
                  <td align="left" className="padding-left">
                    {t("DATA_SHARING.AGENCY_ADMINS")}
                  </td>
                  <td className="padding-right" align="right">
                    <input
                      className="dialog-checkbox"
                      type="checkbox"
                      checked
                      disabled
                    />
                  </td>
                </tr>
                <tr className="dialog-table-row line">
                  <td align="left" className="padding-left">
                    {t("NAVIGATION.ALL_USERS")}
                  </td>
                  <td className="padding-right" align="right">
                    <input
                      className="dialog-checkbox"
                      type="checkbox"
                      checked={customWideAccess}
                      onChange={this.handleWideAccess}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="buttons-row flex-row full-view">
            <button className="blue-btn save-btn" onClick={() => onSave(customWideAccess)}>
              {t("BUTTONS.SAVE")}
            </button>
            <button className="simple-btn" onClick={onCancel}>
              {t("BUTTONS.CANCEL")}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation("translation")(ManageSharedDataDialog);
