import React, { Component } from "react";
import { withTranslation } from "react-i18next";

import SeeAll from "../../partials/see-all-link/see-all-link";
import TextViewer from "../../partials/text-viewer/text-viewer";

import BoardingsOverview from "./../../partials/overview-pages/boardings-overview/boardings-overview.component";
import ViolationsOverview from "./../../partials/overview-pages/violations-overview/violations-overview.component";
import PhotosOverview from "./../../partials/overview-pages/photo-overview/photo-overview.component";
import NotesOverview from "./../../partials/overview-pages/notes-overview/notes-overview.component";

import CrewDataHelper from "../crew-data.helper.js";
import OverviewService from "./../../../services/overview.service";
import "./crew-view.css";


const overviewService = OverviewService.getInstance();


class CrewViewPage extends Component {
  state = {
    licenseNumbers: ["N/A"],
    vessels: [],
    notes: [],
    photos: [],
    vessel: null,
    boardings: [],
    violations: [],
    crewName: "N/A"
  };

  componentDidMount(){
    const id = this.props.match.params.id;
    if (!id || id === "no_license_number") return;
    if (id.indexOf("ln") === 0) {
      const licenseNumber = id.substring(2);
      overviewService
        .getBoardingsByCrewLicense(licenseNumber)
        .then((data) => {
          const dataHelper = new CrewDataHelper(licenseNumber, data);
          const newState = {
            licenseNumbers: [licenseNumber],
            vessels: dataHelper.getVessels(),
            crewName: dataHelper.getCrewName(licenseNumber),
            boardings: dataHelper.getBoardings(),
            violations: dataHelper.getViolations(),
            notes: dataHelper.getNotes(),
            photos: dataHelper.getPhotos()
          };
          console.log(data, newState);
          this.setState(newState);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    if (id.indexOf("in") === 0) {
      const itemName = id.substring(2);
      overviewService
        .getBoardingsByCrewName(itemName)
        .then((data) => {
          const dataHelper = new CrewDataHelper(itemName, data);
          const newState = {
            licenseNumbers: dataHelper.getLicenseNumbersByCrewName(itemName),
            crewName: itemName,
            vessels: dataHelper.getVessels(),
            boardings: dataHelper.getBoardings(),
            violations: dataHelper.getViolations(),
            notes: dataHelper.getNotes(),
            photos: dataHelper.getPhotos()
          };
          console.log(data, newState);
          this.setState(newState);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  render() {
    const {
      nationalities,
      vesselNames,
      homePorts,
      captains,
      boardings,
      deliveries,
      permitNumbers,
      crew,
    } = this.state;
    const { t } = this.props;

    return (
      <div className="flex-column align-center padding-top crew-view-page">
        <div className="flex-row align-center standard-view">
          <div>
            <div className="item-label">Crew Member</div>
            <div className="item-name">Marlin Nemo</div>
          </div>
        </div>
        <div className="flex-row justify-between standard-view">
          <div className="flex-column box-shadow padding white-bg margin-top vessels-section">
            <div className="flex-row justify-between">
              <h3>Vessels</h3>
              <div className="item-label">4</div>
            </div>
            <div className="flex-row border-bottom padding-bottom padding-top">
              <div className="flex-row half-row-view">
                <TextViewer
                  mainText="Predator"
                  subText="Permit #12984567"
                  mainTextFirst={true}
                />
                <div className="captain-icon">
                  {t("TABLE.CAPTAIN").toUpperCase()}
                </div>
              </div>
              <div className="flex-row align-center half-row-view">
                <div className="sm-photo-icon">
                  <img
                    className="icon"
                    src={require("../../../assets/photo-icon.png")}
                    alt="no logo"
                  />
                </div>
                <div className="item-label">+6</div>
              </div>
            </div>
            <div className="flex-row border-bottom padding-bottom padding-top">
              <div className="half-row-view">
                <TextViewer
                  mainText="Predator"
                  subText="Permit #12984567"
                  mainTextFirst={true}
                />
              </div>
              <div className="flex-row align-center half-row-view">
                <div className="sm-photo-icon">
                  <img
                    className="icon"
                    src={require("../../../assets/photo-icon.png")}
                    alt="no logo"
                  />
                </div>
              </div>
            </div>
            <div className="flex-row justify-center padding-top">
              <SeeAll />
            </div>
          </div>
          <div className="flex-column box-shadow padding white-bg margin-top license-section">
            <div className="flex-row justify-between">
              <h3>License Numbers</h3>
              <div className="item-label">2</div>
            </div>
            <div className="border-bottom padding-bottom padding-top">
              10284578
            </div>
            <div className="border-bottom padding-bottom padding-top">
              10284578
            </div>
          </div>
        </div>
        <div className="flex-row justify-between standard-view">
          <BoardingsOverview boardings={boardings}/>
        </div>
        <div className="flex-row justify-between standard-view">
          <ViolationsOverview />
        </div>
        <div className="flex-row justify-between standard-view margin-bottom">
          <PhotosOverview />
          <NotesOverview />
        </div>
      </div>
    );
  }
}

export default withTranslation("translation")(CrewViewPage);
