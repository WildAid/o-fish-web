import React, { Component, Fragment } from "react";
import { withTranslation } from "react-i18next";

import BoardingsOverview from "./../../partials/overview-pages/boardings-overview/boardings-overview.component";
import ViolationsOverview from "./../../partials/overview-pages/violations-overview/violations-overview.component";
import PhotosOverview from "./../../partials/overview-pages/photo-overview/photo-overview.component";
import NotesOverview from "./../../partials/overview-pages/notes-overview/notes-overview.component";
import LoadingPanel from "./../../partials/loading-panel/loading-panel.component";

import BoardingDataHelper from "../../partials/boarding-data.helper.js";
import OverviewService from "./../../../services/overview.service";

import SeeLink from "../../partials/see-all-link/see-all-link";

import { goToPageWithFilter, goVesselViewPage } from "./../../../helpers/get-data";

import {
  VESSELS_PAGE
} from "../../../root/root.constants.js";

import "./crew-view.css";
import withRouter from "../../../helpers/withRouter";

const overviewService = OverviewService.getInstance();

class CrewViewPage extends Component {
  state = {
    loading: false,
    licenseNumbers: [],
    vessels: [],
    notes: [],
    photos: [],
    vessel: null,
    boardings: [],
    violations: [],
    crewName: "N/A",
    captainName: "",
  };

  componentDidMount() {
    const filter = JSON.parse(this.props.router.params.filter);
    const isCaptain = filter["captain.license"] !== undefined || filter["captain.name"] !== undefined;
    let licenseNumber, captainName, crewName;
    if (isCaptain) {
      licenseNumber = filter["captain.license"]
      captainName = filter["captain.name"]
    } else {
      licenseNumber = filter["crew.license"];
      crewName = filter["crew.name"]
    }
    this.setState({ loading: true }, () => {
      overviewService
        .getBoardingsByFilter(filter)
        .then((data) => {
          const dataHelper = new BoardingDataHelper(data);
          const newState = {
            loading: false,
            filter: filter,
            boardings: dataHelper.getBoardings(),
            violations: dataHelper.getViolations(licenseNumber),
            licenseNumbers: [licenseNumber],
            vessels: dataHelper.getVessels(),
            notes: dataHelper.getNotes(licenseNumber),
            captainName: dataHelper.getCaptainName(licenseNumber),
            crewName: isCaptain ?
              dataHelper.getCaptainName(licenseNumber || captainName) :
              dataHelper.getCrewName(licenseNumber || crewName),
            photos: dataHelper.getPhotos(licenseNumber),
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
      vessels,
      violations,
      boardings,
      licenseNumbers,
      photos,
      notes,
      crewName,
      captainName,
    } = this.state;
    const { id } = this.props.router.params;
    const { t } = this.props;
    const { filter } = this.state;

    return (
      <div className="flex-column align-center padding-top crew-view-page">
        {!loading ? (
          <Fragment>
            <div className="flex-row align-center standard-view">
              <div>
                <div className="item-label">{t("TABLE.CREW_MEMBER")}</div>
                <div className="item-name">{crewName || "N/A"}</div>
              </div>
            </div>
            <div className="flex-row justify-between standard-view">
              <div className="flex-column box-shadow white-bg margin-top margin-right vessels-section">
                <div className="flex-row justify-between padding border-bottom gray-bg">
                  <h3>{t("NAVIGATION.VESSELS")}</h3>
                  <div className="item-label">{vessels.length || ""}</div>
                </div>
                {!!vessels.length ? (
                  <Fragment>
                    <table className="margin-left margin-right">
                      <thead className="border-bottom">
                        <tr className="table-row row-head">
                          <td>{t("TABLE.NAME")}</td>
                          <td>{t("TABLE.PERMIT_NUMBER")}</td>
                          <td>{t("BOARDING_PAGE.VIEW_BOARDING.PHOTOS")}</td>
                          <td>{t("BOARDING_PAGE.VIEW_BOARDING.NOTES")}</td>
                        </tr>
                      </thead>
                      <tbody>
                        {vessels.slice(0, 4).map((vessel, ind) => (
                          <tr
                            key={ind}
                            className="table-row row-body"
                            onClick={() => goVesselViewPage(vessel)}
                          >
                            <td>{vessel.name}</td>
                            <td>{vessel.permitNumber}</td>
                            <td>
                              {vessel.attachements &&
                                vessel.attachements.photoIDs ? (
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
                                      item: vessel.attachements.photoIDs.length,
                                    })}
                                  </div>
                                </div>
                              ) : (
                                "N/A"
                              )}
                            </td>
                            <td>
                              {vessel.attachements &&
                                !vessel.attachements.notes ? (
                                <div className="flex-column">
                                  <div className="flex-row">
                                    <div className="note">
                                      {vessel.attachements.notes[0]}
                                    </div>
                                    <div className="see-link">
                                      {t("BUTTONS.SEE_FULL_NOTE")}
                                    </div>
                                  </div>
                                  <div className="see-link">
                                    {t("BUTTONS.SEE_MORE", {
                                      item: vessel.attachements.photoIDs.length,
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
                      className="flex-row justify-center padding-bottom padding-top"
                      onClick={() =>
                        goToPageWithFilter(VESSELS_PAGE, filter)
                      }
                    >
                      <SeeLink linkText={t("BUTTONS.SEE_ALL")} />
                    </div>
                  </Fragment>
                ) : (
                  <div className="padding">{t("WARNINGS.NO_CREW")}</div>
                )}
              </div>
              <div className="flex-column box-shadow white-bg margin-top license-section">
                <div className="flex-row justify-between padding border-bottom gray-bg">
                  <h3>{t("BOARDING_PAGE.VIEW_BOARDING.LICENSE_NUMBER")}</h3>
                  <div className="item-label">
                    {licenseNumbers.length || ""}
                  </div>
                </div>
                {!!licenseNumbers.length ? (
                  licenseNumbers.map((license, ind) => (
                    <div
                      key={ind}
                      className="border-bottom padding-bottom padding-top margin-left margin-right"
                    >
                      {license}
                    </div>
                  ))
                ) : (
                  <div className="padding">{t("WARNINGS.NO_LICENSE")}</div>
                )}
              </div>
            </div>
            <div className="flex-row justify-between standard-view">
              <BoardingsOverview filter={filter} boardings={boardings} />
            </div>
            <div className="flex-row justify-between standard-view">
              <ViolationsOverview violations={violations} filter={filter} />
            </div>
            <div className="flex-row justify-between standard-view margin-bottom">
              <PhotosOverview
                photos={photos}
                photosId={id}
                filter={filter}
                captainName={captainName}
                crewName={crewName}
                licenseNumber={licenseNumbers[0]}
              />
              <NotesOverview
                notes={notes}
                notesId={id}
                filter={filter}
                captainName={captainName}
                crewName={crewName}
                licenseNumber={licenseNumbers[0] || ""}
              />
            </div>
          </Fragment>
        ) : (
          <LoadingPanel />
        )}
      </div>
    );
  }
}

export default withRouter(withTranslation("translation")(CrewViewPage));
