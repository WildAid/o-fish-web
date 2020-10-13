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
    stopSharingWith: "",
    currenctAgency: "",
  };

  showDialog = (dialogName, agencyName = "") => {
    this.setState({
      [dialogName]: true,
      stopSharingWith: agencyName,
    });
  };

  cancelDialog = (dialogName, isDataManaging = true) => {
    this.setState({
      [dialogName]: false,
      isDataManaging,
    });
  };

  stopSharing = (agency) => {
    let { _id, outboundPartnerAgencies } = agency;
    const { stopSharingWith } = this.state;

    outboundPartnerAgencies = outboundPartnerAgencies.map((agency) => {
      if (agency.name === stopSharingWith) {
        agency.toDate = moment().toDate();
      }
      return agency;
    });
    agencyService
      .updateAgency(_id, {
        ...agency,
        outboundPartnerAgencies,
      })
      .catch((error) => console.error(error));

    this.cancelDialog("stopSharingDialog");
  };

  showManagePopup = () => {
    this.cancelDialog("shareDataDialog", false);
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

    agencyService
      .updateAgency(agencyThatSharingData._id, agencyThatSharingData)
      .then(() => {
        this.setState({ outBoundSuccess: true }, () => {
          agencyService
            .getAgency(agencyThatSharingData._id)
            .then((data) => {
              this.setState({ currenctAgency: data });
            })
            .catch((error) => {
              error.message
                ? this.setState({ error: `${error.name}: ${error.message}` })
                : this.setState({ error: "An unexpected error occurred!" });
            });
        });
      })
      .catch((error) => {
        error.message
          ? this.setState({ error: `${error.name}: ${error.message}` })
          : this.setState({ error: "An unexpected error occurred!" });
      });

    agencyService
      .updateAgency(agencyThatGetsData._id, agencyThatGetsData)
      .then(() => this.setState({ inBoundSuccess: true }))
      .catch((error) => {
        error.message
          ? this.setState({ error: `${error.name}: ${error.message}` })
          : this.setState({ error: "An unexpected error occurred!" });
      });

    this.cancelDialog("manageDialogDisplayed", true);
  };

  onChangeAgency = (agency) => {
    this.setState({ agencyToShareWith: agency });
  };

  removeSuccessMsg = () => {
    this.setState({ inBoundSuccess: false, outBoundSuccess: false });
  };

  componentDidMount() {
    const { limit, offset } = this.state;
    const { agency } = this.props;

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

    this.setState({
      currenctAgency: agency,
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
      stopSharingWith,
      currenctAgency,
    } = this.state;
    const { t } = this.props;
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
              {currenctAgency &&
                currenctAgency.outboundPartnerAgencies &&
                currenctAgency.outboundPartnerAgencies.length && (
                  <div className="padding-left padding-bottom">
                    {t("DATA_SHARING.FOLLOWING_AGENCIES", {
                      agency: currenctAgency ? currenctAgency.name : "",
                    })}
                  </div>
                )}
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
              {currenctAgency &&
              currenctAgency.outboundPartnerAgencies &&
              currenctAgency.outboundPartnerAgencies.length ? (
                currenctAgency.outboundPartnerAgencies.map((item, ind) => (
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
                        onClick={() =>
                          this.showDialog("stopSharingDialog", item.name)
                        }
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
          {currenctAgency &&
            (!currenctAgency.outboundPartnerAgencies ||
              (currenctAgency.outboundPartnerAgencies &&
                !currenctAgency.outboundPartnerAgencies.length)) && (
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
              onCancel={() => this.cancelDialog("shareDataDialog", true)}
            />
          )}
          {manageDialogDisplayed && (
            <ManageSharedDataByGlobalAdmin
              onCancel={() => this.cancelDialog("manageDialogDisplayed")}
              onSave={this.saveDialog}
              isDataManaging={isDataManaging}
              agencyName={currenctAgency.name}
            />
          )}
          {stopSharingDialog && (
            <StopSharingDialog
              agencyName={stopSharingWith}
              onSubmit={() => this.stopSharing(currenctAgency)}
              onCancel={() => this.cancelDialog("stopSharingDialog")}
            />
          )}
        </div>
      </div>
    );
  }
}

export default withTranslation("translation")(AgencyDataSharing);
