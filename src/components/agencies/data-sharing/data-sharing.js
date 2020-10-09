import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import moment from "moment";
import CloseIcon from "@material-ui/icons/Close";

import ShareDataDialog from "./share-data-dialog/share-data-dialog";
import ManageSharedDataByGlobalAdmin from "./manage-shared-data-dialog/manage-shared-data-by-global-admin";
import StopSharingDialog from "./stop-sharing-dialog/stop-sharing-dialog";

import AgencyService from "./../../../services/agency.service";

import "./data-sharing.css";

const agencyService = AgencyService.getInstance();

class AgencyDataSharing extends Component {
  state = {
    shareDataDialog: false,
    manageDialogDisplayed: false,
    stopSharingDialog: false,
    agencies: [],
    agencyToShareWith: "",
    limit: 100,
    offset: 0,
    inBoundSuccess: false,
    outBoundSuccess: false,
    isDataManaging: true,
  };

  showDialog = (dialogName) => {
    this.setState({
      [dialogName]: true,
    });
  };

  cancelDialog = (dialogName) => {
    this.setState({
      [dialogName]: false,
    });
  };

  stopSharing = () => {
    this.cancelDialog("stopSharingDialog");
  };

  showManagePopup = () => {
    const { isDataManaging } = this.state;

    this.setState({ isDataManaging: false });

    this.cancelDialog("shareDataDialog");
    this.showDialog("manageDialogDisplayed");
  };

  saveDialog = (startDate, endDate) => {
    const { agencyToShareWith } = this.state;
    const { agency } = this.props;

    //Agency that shares data
    const outboundPartnerAgencies = [
      {
        name: agencyToShareWith.name,
        fromDate: startDate ? moment(startDate).toDate() : null,
        toDate: endDate ? moment(endDate).toDate() : null,
      },
    ];

    const agencyThatSharingData = agency.outboundPartnerAgencies
      ? {
          ...agency,
          outboundPartnerAgencies: [
            ...agency.outboundPartnerAgencies,
            ...outboundPartnerAgencies,
          ],
        }
      : {
          ...agency,
          outboundPartnerAgencies,
        };

    //Agency that gets shared data
    const inboundPartnerAgencies = [
      { name: agency.name, triaged: false, agencyWideAccess: false },
    ];

    const agencyThatGetsData = agencyToShareWith.inboundPartnerAgencies
      ? {
          ...agencyToShareWith,
          inboundPartnerAgencies: [
            ...agencyToShareWith.inboundPartnerAgencies,
            ...inboundPartnerAgencies,
          ],
        }
      : {
          ...agencyToShareWith,
          inboundPartnerAgencies,
        };

    console.log(agencyThatGetsData, "получает");
    console.log(agencyThatSharingData, "шарит");

    // agencyService
    //   .updateAgency(agencyThatGetsData._id, agencyThatGetsData)
    //   .then(() => this.setState({ inBoundSuccess: true }))
    //   .catch((error) => {
    //     error.message
    //       ? this.setState({ error: `${error.name}: ${error.message}` })
    //       : this.setState({ error: "An unexpected error occurred!" });
    //   });

    // agencyService
    //   .updateAgency(agencyThatSharingData._id, agencyThatSharingData)
    //   .then(() => this.setState({ outBoundSuccess: true }))
    //   .catch((error) => {
    //     error.message
    //       ? this.setState({ error: `${error.name}: ${error.message}` })
    //       : this.setState({ error: "An unexpected error occurred!" });
    //   });
    this.setState({ isDataManaging: true });
    this.cancelDialog("manageDialogDisplayed");
  };

  onChangeAgency = (agency) => {
    this.setState({ agencyToShareWith: agency });
  };

  removeSuccessMsg = () => {
    this.setState({ inBoundSuccess: false, outBoundSuccess: false });
  };

  componentDidMount() {
    const { limit, offset } = this.state;

    agencyService
      .getAgencies(limit, offset, "", null)
      .then((data) => {
        this.setState({
          agencies: data.agencies,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    const {
      shareDataDialog,
      manageDialogDisplayed,
      stopSharingDialog,
      agencies,
      inBoundSuccess,
      outBoundSuccess,
      agencyToShareWith,
      isDataManaging,
    } = this.state;
    const { t, agency } = this.props;
    const succsessMessageShown = inBoundSuccess && outBoundSuccess;

    return (
      <div className="padding-bottom flex-column align-center form-data">
        {succsessMessageShown && (
          <div className="full-view flex-row margin-bottom justify-between">
            <div className="flex-row justify-between relative success-message-box">
              <div>
                {t("DATA_SHARING.AGENCY_SUCCESS_MESSAGE", {
                  agency: agencyToShareWith.name,
                })}
              </div>
              <CloseIcon
                className="close-icon"
                onClick={this.removeSuccessMsg}
              />
            </div>
          </div>
        )}
        <div className="full-view white-bg box-shadow">
          <div className="flex-row justify-between align-center">
            <div className="flex-column">
              <div className="header-name">{t("DATA_SHARING.SHARED_DATA")}</div>
              <div className="padding-left padding-bottom">
                {agency &&
                agency.outboundPartnerAgencies &&
                agency.outboundPartnerAgencies.length &&
                agency.outboundPartnerAgencies.length === 1
                  ? t("DATA_SHARING.SHARING_DATA_WITH", {
                      agency: agency.name,
                      sharingAgency: agency.outboundPartnerAgencies[0].name,
                    })
                  : t("DATA_SHARING.FOLLOWING_AGENCIES", {
                      agency: agency ? agency.name : "",
                    })}
              </div>
            </div>
            <button
              className="blue-btn"
              onClick={() => this.showDialog("shareDataDialog")}
            >
              {t("BUTTONS.SHARE_DATA")}
            </button>
          </div>
          <table className="data-sharing-table custom-table">
            <thead>
              <tr className="table-row row-head border-bottom">
                <td>{t("TABLE.AGENCY")}</td>
                <td>{t("DATA_SHARING.BOARDINGS_FROM")}</td>
                <td>{t("DATA_SHARING.BOARDINGS_TO")}</td>
                <td></td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {agency &&
              agency.outboundPartnerAgencies &&
              agency.outboundPartnerAgencies.length ? (
                agency.outboundPartnerAgencies.map((item, ind) => (
                  <tr className="row-body" key={ind}>
                    <td>
                      <div className="flex-row align-center">{item.name}</div>
                    </td>
                    <td>
                      {item.fromDate
                        ? `${moment(item.fromDate).format("L")} ${moment(
                            item.fromDate
                          ).format("LT")}`
                        : t("WARNINGS.NO_START_DATE")}
                    </td>
                    <td>
                      {item.toDate
                        ? `${moment(item.toDate).format("L")} ${moment(
                            item.toDate
                          ).format("LT")}`
                        : t("WARNINGS.NO_END_DATE")}
                    </td>
                    <td>
                      <div
                        className="pointer white-btn"
                        onClick={() => this.showDialog("manageDialogDisplayed")}
                      >
                        {t("BUTTONS.MANAGE_SHARED_DATA")}
                      </div>
                    </td>
                    <td>
                      <div
                        className="blue-color pointer"
                        onClick={() => this.showDialog("stopSharingDialog")}
                      >
                        {t("BUTTONS.STOP_SHARING")}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">
                    <div className="flex-row justify-center padding-top no-sharing-data">
                      {t("DATA_SHARING.SHARING_DATA_WITH_ZERO_AGENCIES")}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {agency &&
            (!agency.outboundPartnerAgencies ||
              (agency.outboundPartnerAgencies &&
                !agency.outboundPartnerAgencies.length)) && (
              <div className="flex-row justify-center">
                <button
                  className="blue-btn"
                  onClick={() => this.showDialog("shareDataDialog")}
                >
                  {t("BUTTONS.SHARE_DATA")}
                </button>
              </div>
            )}
          {shareDataDialog && (
            <ShareDataDialog
              agencies={agencies}
              onSubmit={this.showManagePopup}
              onChangeAgency={this.onChangeAgency}
              onCancel={this.cancelDialog}
            />
          )}
          {manageDialogDisplayed && (
            <ManageSharedDataByGlobalAdmin
              onCancel={() => this.cancelDialog("manageDialogDisplayed")}
              onSave={this.saveDialog}
              isDataManaging={isDataManaging}
              agencyName={agency.name}
            />
          )}
          {stopSharingDialog && (
            <StopSharingDialog
              agencyName={agency.name}
              onSubmit={this.stopSharing}
              onCancel={() => this.cancelDialog("stopSharingDialog")}
            />
          )}
        </div>
      </div>
    );
  }
}

export default withTranslation("translation")(AgencyDataSharing);
