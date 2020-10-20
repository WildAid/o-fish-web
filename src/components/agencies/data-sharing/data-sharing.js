import React, { Component, Fragment } from "react";
import { withTranslation } from "react-i18next";
import moment from "moment";
import CloseIcon from "@material-ui/icons/Close";

import ShareDataDialog from "./share-data-dialog/share-data-dialog";
import ManageSharedDataByGlobalAdmin from "./manage-shared-data-dialog/manage-shared-data-by-global-admin";
import StopSharingDialog from "./stop-sharing-dialog/stop-sharing-dialog";
import ArchiveData from "./archive-data/archive-data";
import LoadingPanel from "../../partials/loading-panel/loading-panel.component";

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
    currentAgency: "",
    manageSharingTo: "",
    notArchivePartnerAgencies: "",
    archivePartnerAgencies: "",
    partnerAgenciesLoading: true,
  };

  showDialog = (dialogName, manageSharingTo = "", isDataManaging = false) => {
    this.setState({
      [dialogName]: true,
      manageSharingTo,
      isDataManaging,
    });
  };

  cancelDialog = (dialogName, isDataManaging = true) => {
    if (isDataManaging) {
      this.setState({ agencyToShareWith: "" });
    }
    this.setState({
      [dialogName]: false,
      isDataManaging,
    });
  };

  stopSharing = (agency) => {
    let { _id, outboundPartnerAgencies } = agency;
    const { manageSharingTo } = this.state;

    outboundPartnerAgencies = outboundPartnerAgencies.map((agency) => {
      if (agency.name === manageSharingTo.name) {
        agency.toDate = moment().subtract("seconds", 1).toDate();
      }

      return agency;
    });

    const [
      notArchivePartnerAgencies,
      archivePartnerAgencies,
    ] = this.filterArchiveAgencies(outboundPartnerAgencies);

    agencyService
      .updateAgency(_id, {
        ...agency,
        outboundPartnerAgencies,
      })
      .then(() => {
        this.setState({
          currentAgency: {
            ...agency,
            outboundPartnerAgencies,
          },
          notArchivePartnerAgencies,
          archivePartnerAgencies,
        });
      })
      .catch((error) => console.error(error));

    this.cancelDialog("stopSharingDialog");
  };

  showManagePopup = () => {
    this.cancelDialog("shareDataDialog", false);
    this.showDialog("manageDialogDisplayed");
  };

  saveDialog = (startDate, endDate) => {
    let {
      currentAgency,
      agencyToShareWith,
      isDataManaging,
      manageSharingTo,
    } = this.state;
    let outboundPartnerAgencies = [];
    const selectedAgency = manageSharingTo || agencyToShareWith;

    const outboundPartnerAgency = {
      name: selectedAgency.name,
      fromDate: startDate ? moment(startDate).toDate() : null,
      toDate: endDate ? moment(endDate).toDate() : null,
    };

    if (currentAgency.outboundPartnerAgencies) {
      const selectedAgencyExist = currentAgency.outboundPartnerAgencies.find(
        (agency) => agency.name === selectedAgency.name
      );

      if (selectedAgencyExist) {
        outboundPartnerAgencies = currentAgency.outboundPartnerAgencies.map(
          (sharedWithAgency) => {
            if (sharedWithAgency.name === selectedAgency.name) {
              return outboundPartnerAgency;
            }
            return sharedWithAgency;
          }
        );
      } else {
        outboundPartnerAgencies = [
          ...currentAgency.outboundPartnerAgencies,
          outboundPartnerAgency,
        ];
      }
    } else {
      outboundPartnerAgencies = [outboundPartnerAgency];
    }
    const agencyThatSharingData = {
      ...currentAgency,
      outboundPartnerAgencies,
    };

    const [
      notArchivePartnerAgencies,
      archivePartnerAgencies,
    ] = this.filterArchiveAgencies(outboundPartnerAgencies);

    agencyService
      .updateAgency(agencyThatSharingData._id, agencyThatSharingData)
      .then(() =>
        this.setState({
          outBoundSuccess: true,
          currentAgency: agencyThatSharingData,
          notArchivePartnerAgencies,
          archivePartnerAgencies,
        })
      )
      .catch((error) => {
        error.message
          ? this.setState({ error: `${error.name}: ${error.message}` })
          : this.setState({ error: "An unexpected error occurred!" });
      });

    if (agencyToShareWith && !isDataManaging) {
      const inboundPartnerAgencies = [
        { name: currentAgency.name, triaged: false, agencyWideAccess: false },
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
        .updateAgency(agencyThatGetsData._id, agencyThatGetsData)
        .then(() => this.setState({ inBoundSuccess: true }))
        .catch((error) => {
          error.message
            ? this.setState({ error: `${error.name}: ${error.message}` })
            : this.setState({ error: "An unexpected error occurred!" });
        });
    }
    this.cancelDialog("manageDialogDisplayed", false);
  };

  onChangeAgency = (agency) => {
    this.setState({ agencyToShareWith: agency });
  };

  removeSuccessMsg = () => {
    this.setState({ inBoundSuccess: false, outBoundSuccess: false });
  };

  filterArchiveAgencies = (outboundPartnerAgencies) => {
    if (outboundPartnerAgencies) {
      const dateComparisonFn = (agency) =>
        moment(agency.toDate).isBefore(moment());

      let notArchivePartnerAgencies = outboundPartnerAgencies.filter(
        (agency) => !dateComparisonFn(agency)
      );
      let archivePartnerAgencies = outboundPartnerAgencies.filter((agency) =>
        dateComparisonFn(agency)
      );

      return [notArchivePartnerAgencies, archivePartnerAgencies];
    }
  };

  filterSharedAgencies = (agencies, currentAgency) => {
    const { outboundPartnerAgencies } = currentAgency;

    if (currentAgency) {
      let availableAgencies = agencies.filter((agency) => {
        const shared = outboundPartnerAgencies
          ? outboundPartnerAgencies.find(
              (partnerAgency) => partnerAgency.name === agency.name
            )
          : null;
        return (
          !shared && agency.name !== currentAgency.name && agency.name !== ""
        );
      });

      return availableAgencies;
    }
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

    agencyService
      .getAgencyByName(agency.name)
      .then((data) => {
        let notArchivePartnerAgencies, archivePartnerAgencies;

        if (data.outboundPartnerAgencies) {
          [
            notArchivePartnerAgencies,
            archivePartnerAgencies,
          ] = this.filterArchiveAgencies(data.outboundPartnerAgencies);
        }
        this.setState({
          partnerAgenciesLoading: false,
          currentAgency: data,
          notArchivePartnerAgencies,
          archivePartnerAgencies,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    let {
      shareDataDialog,
      manageDialogDisplayed,
      stopSharingDialog,
      agencies,
      inBoundSuccess,
      outBoundSuccess,
      agencyToShareWith,
      isDataManaging,
      currentAgency,
      manageSharingTo,
      notArchivePartnerAgencies,
      archivePartnerAgencies,
      partnerAgenciesLoading,
    } = this.state;
    const { t } = this.props;
    const successMessageShown = inBoundSuccess && outBoundSuccess;
    const updateMessageShown = !inBoundSuccess && outBoundSuccess;

    return (
      <Fragment>
        <div className="padding-bottom flex-column align-center form-data">
          {successMessageShown && (
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
          {updateMessageShown && (
            <div className="full-view flex-row margin-bottom justify-between">
              <div className="flex-row justify-between relative success-message-box">
                <div>{t("DATA_SHARING.AGENCY_SUCCESS_UPDATE_MESSAGE")}</div>
                <CloseIcon
                  className="close-icon"
                  onClick={this.removeSuccessMsg}
                />
              </div>
            </div>
          )}

          {partnerAgenciesLoading ? (
            <LoadingPanel />
          ) : (
            <div className="full-view white-bg box-shadow">
              <div className="flex-row justify-between align-center">
                <div className="flex-column">
                  <div className="header-name">
                    {t("DATA_SHARING.SHARED_DATA")}
                  </div>
                  {currentAgency &&
                    currentAgency.outboundPartnerAgencies &&
                    currentAgency.outboundPartnerAgencies.length && (
                      <div className="padding-left padding-bottom">
                        {t("DATA_SHARING.FOLLOWING_AGENCIES", {
                          agency: currentAgency ? currentAgency.name : "",
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

              <div className="flex-row align-center margin-bottom full-view">
                <table className="data-sharing-table custom-table">
                  <thead>
                    <tr className="row-head border-bottom">
                      <td>{t("TABLE.AGENCY")}</td>
                      <td>{t("DATA_SHARING.BOARDINGS_FROM")}</td>
                      <td>{t("DATA_SHARING.BOARDINGS_TO")}</td>
                      <td></td>
                      <td></td>
                    </tr>
                  </thead>
                  <tbody>
                    {currentAgency &&
                    notArchivePartnerAgencies &&
                    notArchivePartnerAgencies.length ? (
                      notArchivePartnerAgencies.map((item, ind) => (
                        <tr className="table-row row-body" key={ind}>
                          <td>
                            <div className="flex-row align-center">
                              {item.name}
                            </div>
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
                              onClick={() =>
                                this.showDialog(
                                  "manageDialogDisplayed",
                                  item,
                                  true
                                )
                              }
                            >
                              {t("BUTTONS.MANAGE_SHARED_DATA")}
                            </div>
                          </td>
                          <td>
                            <div
                              className="blue-color pointer"
                              onClick={() =>
                                this.showDialog("stopSharingDialog", item)
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
              </div>
              {currentAgency &&
                (!notArchivePartnerAgencies ||
                  (notArchivePartnerAgencies &&
                    !notArchivePartnerAgencies.length)) && (
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
                  agencies={this.filterSharedAgencies(agencies, currentAgency)}
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
                  agency={manageSharingTo}
                />
              )}
              {stopSharingDialog && (
                <StopSharingDialog
                  agencyName={manageSharingTo.name}
                  onSubmit={() => this.stopSharing(currentAgency)}
                  onCancel={() => this.cancelDialog("stopSharingDialog")}
                />
              )}
            </div>
          )}
        </div>
        {archivePartnerAgencies && !!archivePartnerAgencies.length && (
          <ArchiveData archiveAgencies={archivePartnerAgencies} />
        )}
      </Fragment>
    );
  }
}

export default withTranslation("translation")(AgencyDataSharing);
