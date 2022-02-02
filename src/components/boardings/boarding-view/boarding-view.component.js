import React, { Component } from "react";
import { withTranslation } from "react-i18next";

import BasicInfoSection from "./basic-info/basic-info.section";
import VesselSection from "./vessel/vessel.section";
import CrewSection from "./crew/crew.section";
import ActivitySection from "./activity/activity.section";
import CatchSection from "./catch/catch.section";
import VersionControlPanel from "../version-control/version-control.panel";

//TODO: Fix the modules to correctly view
import ViolationsSection from './violations/violations.section';
import SeizuresSection from './seizures/seizures.section';
import NotesSection from './notes/notes.section';

import RiskIcon from "../../partials/risk-icon/risk-icon.component";

import { EDIT_BOARDING_PAGE } from "../../../root/root.constants.js";

import BoardingService from "./../../../services/boarding.service";

import "./boardings-view.css";
import withRouter from "../../../helpers/withRouter";

const boardingService = BoardingService.getInstance();

class BoardingViewPage extends Component {
  state = { boarding: null, versionsVisible: false };

  componentDidMount() {
    const id = this.props.router.params.id;

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
    this.props.router.navigate(EDIT_BOARDING_PAGE.replace(":id", this.state.boarding._id));
  };

  showVersions = () => {
    this.setState({ versionsVisible: true });
  };

  render() {
    const { boarding, versionsVisible } = this.state;
    const { t } = this.props;

    return (
      <div className="flex-column justify-start align-center padding-top boarding-view">
        <div className="flex-row justify-between standard-view title-row">
          <div className="flex-column margin-top margin-left">
            <div className="item-label">
              {t("BOARDING_PAGE.VIEW_BOARDING.BOARDING")}
            </div>
            {boarding && (
              <div className="flex-row align-center">
                <div className="item-name padding-right">
                  {new Date(boarding ? boarding.date : null).toLocaleString()}
                </div>
                <RiskIcon
                  safetyLevel={
                    boarding
                      ? boarding.inspection.summary.safetyLevel.level
                      : ""
                  }
                />
              </div>
            )}
          </div>
          <div className="flex-column align-end edit-btn">
            <button className="blue-btn" onClick={this.goEdit}>
              {t("BUTTONS.EDIT_BOARDING")}
            </button>
            {boarding && (
              <div
                className="item-label modified-info margin-bottom margin-right"
                onClick={this.showVersions}
              >{`${t("BOARDING_PAGE.VIEW_BOARDING.LAST_MODIFIED")}
                ${new Date(boarding ? boarding.date : null).toLocaleString()}
                by ${boarding.reportingOfficer.name.first} ${boarding.reportingOfficer.name.last}`}</div>
            )}
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
            <ViolationsSection dataObject={boarding}></ViolationsSection>
            <SeizuresSection seizures={boarding?.inspection?.summary?.seizures}></SeizuresSection>
            <NotesSection dataObject={boarding}></NotesSection>
          </div>
        ) : (
          <div className="items-amount">{t("LOADING.LOADING")}</div>
        )}
      </div>
    );
  }
}

//TODO: Use this sections when implemented
//<SeizuresSection dataObject={this.state.dataObject}></SeizuresSection>
export default withRouter(withTranslation("translation")(BoardingViewPage));
