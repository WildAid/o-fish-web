import React from "react";
import { Component } from "react";
import withRouter from "../../../helpers/withRouter";
import { BSON } from "mongodb-stitch-browser-sdk";
import { withTranslation } from "react-i18next";

import BasicInfoSection from "./basic-info/basic-info.section";
import VesselSection from "./vessel/vessel.section";
import CrewSection from "./crew/crew.section";
import ActivitySection from "./activity/activity.section";
import CatchSection from "./catch/catch.section";
import RisksSection from "./risks/risks.section";

//TODO: Add sections when refactored
/*
import ViolationsSection from './violations/violations.section';
import SeizuresSection from './seizures/seizures.section';
import NotesSection from './notes/notes.section';
*/

import RiskIcon from "../../partials/risk-icon/risk-icon.component";

import AuthService from "./../../../services/auth.service";
import BoardingService from "./../../../services/boarding.service";


import "./boardings-edit.css";
import { VIEW_BOARDING_PAGE } from "../../../root/root.constants";

const boardingService = BoardingService.getInstance();
const authService = AuthService.getInstance();

const initialState = BoardingService.sampleData;

class BoardingEditPage extends Component {
  state = { dataObject: null, isValid: true, validationErrors: [] };

  validateSchema = () => {
    const newEntry = { ...this.state.dataObject };
    if (!newEntry.inspection) {
      newEntry.inspection = {};
    }
    if (!newEntry.inspection.actualCatch) {
      newEntry.inspection.actualCatch = [];
    }
    newEntry.inspection.actualCatch.map((item) => {
      if (!item.fish) item.fish = "";
      if (!item.unit) item.unit = "";
      if (!item.weight) item.weight = 0;
      if (!item.number) item.number = 0;
      item.weight = new BSON.Double(item.weight);
      item.number = new BSON.Long(item.number);
      return item;
    });

    if (!newEntry.inspection.summary.seizures) {
      newEntry.inspection.summary.seizures = { text: "" };
    }

    return newEntry;
  };

  saveBoarding = () => {
    const validData = this.validateSchema();
    boardingService.updateBoarding(validData).then((result) => {
      if (this.state.isNew) {
        this.props.router.navigate(VIEW_BOARDING_PAGE.replace(":id", result.insertedId));
      } else {
        this.props.router.navigate(VIEW_BOARDING_PAGE.replace(":id", this.state.dataObject._id));
      }
    });
  };

  handleDataChange = (newObject) => {
    this.setState({
      dataObject: { ...newObject }
    });
  };

  componentDidMount() {
    const { id } = this.props.router.params;
    if (!id) {
      const obj = {
        ...initialState,
      }
      obj.reportingOfficer.email = authService.user.email;
      this.setState({
        isNew: true,
        dataObject: obj,
      });
    } else {
      boardingService.getBoardingById(id).then((data) => {
        this.setState({
          isNew: false,
          dataObject: data,
        });
      });
    }
  }

  render() {
    const { dataObject, isValid, validationErrors } = this.state;
    const { t } = this.props;

    return (
      <div className="flex-column justify-start align-center padding-top">
        <div className="flex-row justify-between standard-view">
          <div className="flex-column margin-top margin-left">
            <div className="item-label">
              {t("BOARDING_PAGE.VIEW_BOARDING.BOARDING")}
            </div>
            {dataObject && (
              <div className="flex-row align-center">
                <div className="item-name padding-right">
                  {new Date(
                    dataObject ? dataObject.date : null
                  ).toLocaleString()}
                </div>
                <RiskIcon
                  safetyLevel={
                    dataObject
                      ? dataObject.inspection.summary.safetyLevel.level
                      : ""
                  }
                />
              </div>
            )}
          </div>
          <div className="flex-column align-end edit-btn">
            <button className="blue-btn" onClick={this.saveBoarding}>
              {t("BUTTONS.SAVE_BOARDING")}
            </button>
            {dataObject && (
              <div className="item-label modified-info margin-bottom margin-right">{`${t(
                "BOARDING_PAGE.VIEW_BOARDING.LAST_MODIFIED"
              )}
                ${new Date(
                dataObject ? dataObject.date : null
              ).toLocaleString()}
                by Officer Krupke`}</div>
            )}
          </div>
        </div>
        {!isValid && (
          <section>
            {validationErrors.map((item) => (
              <div className="error-msg">{item}</div>
            ))}
          </section>
        )}
        {dataObject ? (
          <div className="flex-column standard-view justify-stretch">
            <BasicInfoSection
              dataObject={dataObject}
              onChange={this.handleDataChange}
            />
            <VesselSection
              dataObject={dataObject}
              onChange={this.handleDataChange}
            />
            <CrewSection
              dataObject={dataObject}
              onChange={this.handleDataChange}
            />
            <ActivitySection
              dataObject={dataObject}
              onChange={this.handleDataChange}
            />
            <CatchSection
              dataObject={dataObject}
              onChange={this.handleDataChange}
            />
            <RisksSection
              dataObject={dataObject}
              onChange={this.handleDataChange}
            />
          </div>
        ) : (
          <div className="items-amount">{t("LOADING.LOADING")}</div>
        )}
      </div>
    );
  }
}

//TODO: Add sections when refactored
//<SeizuresSection dataObject={this.state.dataObject}></SeizuresSection>
//<ViolationsSection dataObject={this.state.dataObject}></ViolationsSection>
//<NotesSection dataObject={this.state.dataObject}></NotesSection>
export default withRouter(withTranslation("translation")(BoardingEditPage));
