import React, { Component, Fragment } from "react";
import { withTranslation } from "react-i18next";
import moment from "moment";

import { goToPageWithFilter } from "./../../../helpers/get-data";
import SeeLink from "../../partials/see-all-link/see-all-link";

import VesselHeaderInfo from "./../../partials/overview-pages/vessel-header-info/vessel-header-info.component";
import BoardingsOverview from "./../../partials/overview-pages/boardings-overview/boardings-overview.component";
import ViolationsOverview from "./../../partials/overview-pages/violations-overview/violations-overview.component";
import PhotosOverview from "./../../partials/overview-pages/photo-overview/photo-overview.component";
import NotesOverview from "./../../partials/overview-pages/notes-overview/notes-overview.component";
import LoadingPanel from "./../../partials/loading-panel/loading-panel.component";

import BoardingDataHelper from "../../partials/boarding-data.helper.js";
import OverviewService from "./../../../services/overview.service";

import { goCrewViewPage } from "./../../../helpers/get-data";

import {
  CREW_FILTERED_PAGE,
  DELIVERIES_PAGE,
} from "../../../root/root.constants.js";

import "./vessel-view.css";

const overviewService = OverviewService.getInstance();

class VesselViewPage extends Component {
  state = {
    loading: false,
    permitNumbers: ["N/A"],
    vesselNames: ["N/A"],
    notes: [],
    photos: [],
    vessel: null,
    boardings: [],
    violations: [],
    crew: [],
    deliveries: [],
    homePorts: [],
    captains: [],
    nationalities: [],
    filter: null,
  };

  componentDidMount() {
    const filter = JSON.parse(this.props.match.params.filter);
    if (!filter) return;
    this.setState({ loading: true, filter }, () => {
      const permitNumber = filter["vessel.permitNumber"];
      overviewService
        .getBoardingsByFilter(filter)
        .then((data) => {
          const dataHelper = new BoardingDataHelper(data);
          const newState = {
            permitNumbers: dataHelper.getPermitNumbers(permitNumber),
            vesselNames: dataHelper.getVesselNames(),
            boardings: dataHelper.getBoardings(),
            nationalities: dataHelper.getNationalities(),
            homePorts: dataHelper.getHomePorts(),
            captains: dataHelper.getCaptains(),
            crew: dataHelper.getCrew(),
            deliveries: dataHelper.getDeliveries(),
            photos: dataHelper.getPhotos(),
            notes: dataHelper.getNotes(),
            violations: dataHelper.getViolations(),
            loading: false,
          };
          this.setState(newState);
        })
        .catch((error) => {
          console.error(error);
        });
    });
  }

  render() {
    const {
      loading,
      nationalities,
      vesselNames,
      homePorts,
      captains,
      boardings,
      deliveries,
      permitNumbers,
      crew,
      violations,
      photos,
      notes,
      filter,
    } = this.state;
    const { t } = this.props;

    return (
      <div className="flex-column align-center padding-top vessel-view-page">
        {!loading ? (
          <Fragment>
            <div className="flex-row align-center standard-view">
              <div>
                <div className="item-label">{t("TABLE.VESSEL")}</div>
                <div className="item-name">{vesselNames[0]}</div>
              </div>
            </div>
            <div className="flex-row justify-between standard-view">
              <VesselHeaderInfo
                headerText="Permit Number"
                data={permitNumbers[0] || ""}
              />
              <VesselHeaderInfo
                headerText="Flag States"
                data={nationalities[0] || ""}
                itemsAmount={nationalities.length}
              />
              <VesselHeaderInfo
                headerText="Home Ports"
                data={homePorts[0] || ""}
                itemsAmount={homePorts.length}
              />
              <VesselHeaderInfo
                headerText="Captains"
                data={captains[0] ? captains[0].name : ""}
                itemsAmount={captains.length}
              />
            </div>
            <div className="flex-row standard-view sub-section">
              <BoardingsOverview filter={filter} boardings={boardings} />
            </div>
            <div className="flex-row standard-view sub-section">
              <div className="flex-column box-shadow white-bg margin-top margin-right crew-section">
                <div className="flex-row justify-between padding border-bottom gray-bg">
                  <h3>{t("SEARCH.CREW_MEMBERS")}</h3>
                  <div className="item-label">{crew.length || ""}</div>
                </div>
                {!!crew.length ? (
                  <Fragment>
                    <table className="margin-left margin-right">
                      <thead className="border-bottom">
                        <tr className="table-row row-head">
                          <td>{t("TABLE.NAME")}</td>
                          <td>
                            {t("BOARDING_PAGE.VIEW_BOARDING.LICENSE_NUMBER")}
                          </td>
                          <td>{t("BOARDING_PAGE.VIEW_BOARDING.PHOTOS")}</td>
                          <td>{t("BOARDING_PAGE.VIEW_BOARDING.NOTES")}</td>
                        </tr>
                      </thead>
                      <tbody>
                        {crew.slice(0, 4).map((crewMember, ind) => (
                          <tr
                            key={ind}
                            className="table-row row-body"
                            onClick={() => goCrewViewPage(crewMember)}
                          >
                            <td>{crewMember.name}</td>
                            <td>{crewMember.license}</td>
                            <td>
                              {crewMember.attachements &&
                              crewMember.attachements.photoIDs ? (
                                <div className="flex-column">
                                  <div className="sm-photo-icon">
                                    <img
                                      className="icon"
                                      src={require("../../../assets/photo-icon.png")}
                                      alt="no logo"
                                    />
                                  </div>
                                  <div className="see-link">
                                    {t("BUTTONS.SEE_ALL", {
                                      item:
                                        crewMember.attachements.photoIDs.length,
                                    })}
                                  </div>
                                </div>
                              ) : (
                                "N/A"
                              )}
                            </td>
                            <td>
                              {crewMember.attachements &&
                              !crewMember.attachements.notes ? (
                                <div className="flex-column">
                                  <div className="flex-row">
                                    <div className="note">
                                      {crewMember.attachements.notes[0]}
                                    </div>
                                    <div className="see-link">
                                      {t("BUTTONS.SEE_FULL_NOTE")}
                                    </div>
                                  </div>
                                  <div className="see-link">
                                    {t("BUTTONS.SEE_MORE", {
                                      item:
                                        crewMember.attachements.photoIDs.length,
                                    })}
                                  </div>
                                </div>
                              ) : (
                                "N/A"
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div
                      className="flex-row justify-center padding-top"
                      onClick={() =>
                        goToPageWithFilter(CREW_FILTERED_PAGE, filter)
                      }
                    >
                      <SeeLink linkText={t("BUTTONS.SEE_ALL")} />
                    </div>
                  </Fragment>
                ) : (
                  <div className="padding">{t("WARNINGS.NO_CREW")}</div>
                )}
              </div>
              <div className="flex-column box-shadow white-bg margin-top license-section padding-bottom delivery-section">
                <div className="flex-row justify-between padding border-bottom gray-bg">
                  <h3>{t("TABLE.DELIVERIES")}</h3>
                  <div className="item-label">{deliveries.length || ""}</div>
                </div>
                {!!deliveries.length ? (
                  <Fragment>
                    <table className="boardings-table margin-left margin-right">
                      <thead>
                        <tr className="row-head border-bottom">
                          <td>{t("TABLE.BUSINESS")}</td>
                          <td>{t("TABLE.DATE")}</td>
                        </tr>
                      </thead>
                      <tbody>
                        {deliveries.slice(0, 4).map((delivery, ind) => (
                          <tr key={ind} className="table-row row-body">
                            <td>
                              {!!delivery.business && !!delivery.location ? (
                                <div>
                                  <div className="delivery-name">
                                    {delivery.business}
                                  </div>
                                  <div className="delivery-address">
                                    {delivery.location}
                                  </div>
                                </div>
                              ) : (
                                "N/A"
                              )}
                            </td>
                            <td>{moment(delivery.date).format("L")}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div
                      className="flex-row justify-center padding-top"
                      onClick={() =>
                        goToPageWithFilter(DELIVERIES_PAGE, filter)
                      }
                    >
                      <SeeLink linkText={t("BUTTONS.SEE_ALL")} />
                    </div>
                  </Fragment>
                ) : (
                  <div className="padding">{t("WARNINGS.NO_DELIVERIES")}</div>
                )}
              </div>
            </div>
            <div className="flex-row standard-view sub-section">
              <ViolationsOverview filter={filter} violations={violations} />
            </div>
            <div className="flex-row justify-between standard-view margin-bottom sub-section">
              <PhotosOverview filter={filter} photos={photos} />
              <NotesOverview filter={filter} notes={notes} />
            </div>
          </Fragment>
        ) : (
          <LoadingPanel />
        )}
      </div>
    );
  }
}

export default withTranslation("translation")(VesselViewPage);
