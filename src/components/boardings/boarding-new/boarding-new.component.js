import React from "react";
import { Component } from "react";
import withRouter from "../../../helpers/withRouter";
import { withTranslation } from "react-i18next";


import ControlButtons from "./control-buttons/control-buttons";
import BasicInfoSection from "./basic-info/basic-info.section";
import VesselSection from "./vessel/vessel.section";
import CrewSection from "./crew/crew.section";
import ActivitySection from "./activity/activity.section";
import CatchSection from "./catch/catch.section";
import ViolationsSection from "./violations/violations.section";
import RisksSection from "./risks/risks.section";
import NotesSection from "./notes/notes.section";
import BoardingService from "./../../../services/boarding.service";

import { BOARDINGS_PAGE, VIEW_BOARDING_PAGE } from "./../../../root/root.constants";

import AuthService from "./../../../services/auth.service";

import "./boardings-new.css";

const authService = AuthService.getInstance();
const boardingService = BoardingService.getInstance();
class BoardingNewPage extends Component {
  state = {
    basicInfoSection: {
      date: null,
      time: null,
      latitudeDirection: "",
      longitudeDirection: "",
      latitudeDegrees: "",
      latitudeSeconds: "",
      latitudeMinutes: "",
      longitudeDegrees: "",
      longitudeSeconds: "",
      longitudeMinutes: "",
    },
    dataToSave: {
      timestamp: "",
      agency: authService.user.agency.name,
      vessel: {
        name: "",
        homePort: "",
        nationality: "",
        permitNumber: "",
        lastDelivery: {
          date: "",
          location: "",
          business: " ",
          attachments: {
            notes: [""],
          },
        },
      },
      captain: {},
      crew: [],
      inspection: {
        activity: {
          name: "",
        },
        fishery: {
          name: "",
        },
        actualCatch: [],
        summary: {
          safetyLevel: {
            level: "",
            amberReason: "",
          },
          violations: [],
          seizures: {
            text: "",
          },
        },
        gearType: {
          name: "",
        },
      },
      location: [],
      date: "",
      reportingOfficer: {
        name: {
          first: authService.user.name.first,
          last: authService.user.name.last,
        },
        email: authService.user.email,
      },
      notes: [],
    },
  };

  saveRisk = (risk) => {
    this.setState({
      dataToSave: {
        ...this.state.dataToSave,
        inspection: {
          ...this.state.dataToSave.inspection,
          summary: {
            ...this.state.dataToSave.inspection.summary,
            safetyLevel: risk,
          },
        },
      },
    });
  };

  handleDataChange = (field, newObject) => {
    this.setState({
      dataToSave: {
        ...this.state.dataToSave,
        [field]: newObject,
      },
    });
  };

  handleBasicInfoChange = (newObject) => {
    const { date, location } = newObject;
    this.setState({
      dataToSave: {
        ...this.state.dataToSave,
        date,
        location,
      }
    })
  }

  handleActualCatchChange = (catches) => {
    this.setState({
      dataToSave: {
        ...this.state.dataToSave,
        inspection: {
          ...this.state.dataToSave.inspection,
          actualCatch: catches,
        }
      }
    })
  }

  handleViolationsChange = (violations) => {
    this.setState({
      dataToSave: {
        ...this.state.dataToSave,
        inspection: {
          ...this.state.dataToSave.inspection,
          summary: {
            ...this.state.dataToSave.inspection.summary,
            violations,
          }
        }
      }
    });
  }

  handleSeizuresChange = (seizures) => {
    this.setState({
      dataToSave: {
        ...this.state.dataToSave,
        inspection: {
          ...this.state.dataToSave.inspection,
          summary: {
            ...this.state.dataToSave.inspection.summary,
            seizures,
          }
        }
      }
    });
  }

  cancelCreation = () => {
    this.props.router.navigate(BOARDINGS_PAGE.replace(":filter", null));
  };

  createBoarding = () => {
    const formData = {
      ...this.state.dataToSave,
      crew: this.state.dataToSave.crew.map(x => ({ name: x.name, license: x.license })),
      inspection: {
        ...this.state.dataToSave.inspection,
        actualCatch: this.state.dataToSave.inspection.actualCatch.map(x => {
          const { id, ...catchItem } = x;
          return catchItem;
        })
      }
    }
    boardingService.updateBoarding(formData).then((result) => {
      this.props.router.navigate(VIEW_BOARDING_PAGE.replace(":id", result.insertedId));
    });
  };

  render() {
    const { t } = this.props;

    const crewMembers = [...this.state.dataToSave.crew];

    if (this.state.dataToSave.captain?.name) {
      crewMembers.push({ ...this.state.dataToSave.captain, captain: true })
    }
    return (
      <div className="flex-column justify-start align-center padding-top new-boarding">
        <div className="flex-row justify-between standard-view">
          <div className="flex-column margin-top">
            <div className="item-label">
              {t("BOARDING_PAGE.VIEW_BOARDING.BOARDING")}
            </div>
            <div className="font-32">{t("BUTTONS.NEW_BOARDING")}</div>
          </div>
          <ControlButtons onCancel={this.cancelCreation} />
        </div>
        <div className="flex-column standard-view justify-stretch">
          <BasicInfoSection onChange={this.handleBasicInfoChange} />
          <VesselSection onChange={this.handleDataChange} />
          <CrewSection onChange={this.handleDataChange} crewList={this.state.dataToSave.crew} />
          <ActivitySection
            onChange={this.handleDataChange}
            inspection={this.state.dataToSave.inspection}
          />
          <CatchSection onChange={this.handleActualCatchChange} catches={this.state.dataToSave.inspection.actualCatch} />
          <ViolationsSection
            onChange={this.handleDataChange}
            violations={this.state.dataToSave.inspection.summary.violations}
            seizures={this.state.dataToSave.inspection.summary.seizures}
            onViolationsChange={this.handleViolationsChange}
            onSeizuresChange={this.handleSeizuresChange}
            crewMembers={crewMembers}
          />
          <RisksSection saveNewRisk={this.saveRisk} />
          <NotesSection
            notes={this.state.dataToSave.notes}
            onChange={(value) => this.handleDataChange('notes', value)}
          />
        </div>
        <div className="flex-row standard-view justify-flex-end padding-top">
          <ControlButtons onCancel={this.cancelCreation} onSave={this.createBoarding} />
        </div>
      </div>
    );
  }
}

export default withRouter(withTranslation("translation")(BoardingNewPage));
