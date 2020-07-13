import React from "react";
import { Component } from "react";

import BasicInfoSection from "./basic-info/basic-info.section";
import VesselSection from "./vessel/vessel.section";
import CrewSection from "./crew/crew.section";
import ActivitySection from "./activity/activity.section";
import CatchSection from "./catch/catch.section";
import VersionControlPanel from "../version-control/version-control.panel";

//TODO: Fix the modules to correctly view
/*import ViolationsSection from './violations/violations.section';
import SeizuresSection from './seizures/seizures.section';
import RisksSection from './risks/risks.section';
import NotesSection from './notes/notes.section';*/

import RiskIcon from "../../partials/risk-icon/risk-icon.component";

import history from "../../../root/root.history";

import { EDIT_BOARDING_PAGE } from "../../../root/root.constants.js";

import BoardingService from "./../../../services/boarding.service";

import "./boardings-view.css";

const boardingService = BoardingService.getInstance();

class BoardingViewPage extends Component {
  state = { boarding: null, versionsVisible: false };

  componentDidMount() {
    const id = this.props.match.params.id;
    boardingService
      .getBoardingById(id)
      .then((data) => {
        this.setState({
          boarding: data,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  goEdit = () => {
    history.push(EDIT_BOARDING_PAGE.replace(":id", this.state.boarding._id));
  };

  showVersions = () => {
    this.setState({ versionsVisible: true });
  };

  render() {
    const { boarding, versionsVisible } = this.state;

    return (
      <div className="flex-column justify-start align-center padding-top boarding-view">
        <div className="flex-row justify-between standard-view title-row">
          <div className="flex-column margin-top margin-left">
            <div className="item-label">Boarding</div>
            <div className="flex-row align-center">
              <div className="item-name padding-right">
                {new Date(boarding ? boarding.date : null).toLocaleString()}
              </div>
              <RiskIcon
                safetyLevel={
                  boarding ? boarding.inspection.summary.safetyLevel.level : ""
                }
              />
            </div>
          </div>
          <div className="flex-column align-end edit-btn">
            <button className="blue-btn" onClick={this.goEdit}>
              Edit Boarding
            </button>
            <div
              className="item-label modified-info margin-bottom margin-right"
              onClick={this.showVersions}
            >{`Last Modified on
                ${new Date(boarding ? boarding.date : null).toLocaleString()}
                by Officer Krupke`}</div>
          </div>
          {versionsVisible && (
            <VersionControlPanel
              boardingId={boarding._id}
              onHide={() => this.setState({ versionsVisible: false })}
            />
          )}
        </div>
        {boarding ? (
          <div className="flex-column standard-view justify-stretch">
            <BasicInfoSection dataObject={boarding} />
            <VesselSection dataObject={boarding} />
            <CrewSection dataObject={boarding} />
            <ActivitySection dataObject={boarding} />
            <CatchSection dataObject={boarding} />
          </div>
        ) : (
          "No object found"
        )}
      </div>
    );
  }
}

//TODO: Use this sections when implemented
//<SeizuresSection dataObject={this.state.dataObject}></SeizuresSection>
//<ViolationsSection dataObject={this.state.dataObject}></ViolationsSection>
//<RisksSection dataObject={this.state.dataObject}></RisksSection>
//<NotesSection dataObject={this.state.dataObject}></NotesSection>
export default BoardingViewPage;
