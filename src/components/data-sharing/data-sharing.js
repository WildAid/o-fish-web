import React, { Component, Fragment } from "react";
import { withTranslation } from "react-i18next";

import LoadingPanel from "./../partials/loading-panel/loading-panel.component";
import ManageSharedDataDialog from "./manage-shared-data-dialog/manage-shared-data-dialog";

import AuthService from "../../services/auth.service";
import AgencyService from "../../services/agency.service";

import "./data-sharing.css";

const authService = AuthService.getInstance();
const agencyService = AgencyService.getInstance();

class DataSharing extends Component {
  state = {
    agency: {},
    limit: 50,
    offset: 0,
    loading: false,
    dialogDisplayed: false,
  };

  showDialog = () => {
    this.setState({
      dialogDisplayed: true,
    });
  };

  cancelDialog = () => {
    this.setState({
      dialogDisplayed: false,
    });
  };

  saveDialog = () => {
    this.cancelDialog();
  };

  getCurrentAgency = (agencies) => {
    const userAgency = authService.user.agency;

    return agencies.find((item) => item.name === userAgency.name);
  };

  readNewlySharedAgencies = () => {
    let {
      agency: { _id: agencyId },
    } = this.state;

    agencyService
      .getAgency(agencyId)
      .then((agency) => {
        let inboundPartnerAgencies = agency.inboundPartnerAgencies;

        if (inboundPartnerAgencies) {
          inboundPartnerAgencies = inboundPartnerAgencies.map((data) => {
            return {
              ...data,
              triaged: true,
            };
          });
          agencyService
            .updateAgency(agencyId, {
              ...agency,
              inboundPartnerAgencies,
            })
            .catch((error) => console.error(error));
        }
      })
      .catch((error) => console.error(error));
  };

  componentDidMount() {
    this.setState({ loading: true }, () => {
      const { limit, offset } = this.state;

      agencyService
        .getAgencies(limit, offset, "", null)
        .then((data) => {
          this.setState(
            {
              loading: false,
              agency: this.getCurrentAgency(data.agencies),
              total: data.amount && data.amount[0] ? data.amount[0].total : 0,
            },
            (agencyService) => this.readNewlySharedAgencies(agencyService)
          );
        })
        .catch((error) => {
          console.error(error);
        });
    });
  }

  render() {
    const { t } = this.props;
    const { agency, loading, dialogDisplayed } = this.state;

    return (
      <div className="padding-bottom flex-column align-center form-data">
        <div className="flex-row standard-view">
          <div className="items-amount">{t("AGENCY_PAGE.DATA_SHARING")}</div>
        </div>
        {!loading ? (
          <Fragment>
            <div className="box-shadow white-bg standard-view">
              <div className="header-name">{t("DATA_SHARING.SHARED_DATA")}</div>
              <div className="padding-left padding-bottom">
                {agency &&
                  t("DATA_SHARING.SHARING_DATA_WITH", { agency: agency.name })}
              </div>
              <table className="data-sharing-table custom-table">
                <thead>
                  <tr className="table-row row-head border-bottom">
                    <td>{t("TABLE.AGENCY")}</td>
                    <td>{t("DATA_SHARING.WHO_CAN_ACCESS_DATA")}</td>
                    <td></td>
                  </tr>
                </thead>
                <tbody>
                  {agency &&
                  agency.inboundPartnerAgencies &&
                  agency.inboundPartnerAgencies.length ? (
                    agency.inboundPartnerAgencies.map((item, ind) => (
                      <tr className="row-body" key={ind}>
                        <td>
                          <div
                            className={`flex-row align-center relative ${
                              item.triaged ? "" : "new-agency"
                            }`}
                          >
                            {item.name}
                          </div>
                        </td>
                        <td>
                          {item.agencyWideAccess
                            ? t("NAVIGATION.ALL_USERS")
                            : t("DATA_SHARING.AGENCY_ADMINS")}
                        </td>
                        <td>
                          <div
                            className="pointer white-btn"
                            onClick={this.showDialog}
                          >
                            {t("BUTTONS.MANAGE_SHARED_DATA")}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5">
                        <div className="flex-row justify-center padding-top padding-bottom no-sharing-data">
                          {t("DATA_SHARING.SHARING_DATA_WITH_ZERO_AGENCIES")}
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {dialogDisplayed && (
              <ManageSharedDataDialog
                agencyName={agency.name}
                onCancel={this.cancelDialog}
                onSave={this.saveDialog}
              />
            )}
          </Fragment>
        ) : (
          <LoadingPanel />
        )}
      </div>
    );
  }
}

export default withTranslation("translation")(DataSharing);
