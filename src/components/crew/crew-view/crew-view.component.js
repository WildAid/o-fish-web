import React, { Component } from "react";
import { withTranslation } from "react-i18next";

import SeeLink from "../../partials/see-all-link/see-all-link";
import TextViewer from "../../partials/text-viewer/text-viewer";

import BoardingsOverview from "./../../partials/overview-pages/boardings-overview/boardings-overview.component";
import ViolationsOverview from "./../../partials/overview-pages/violations-overview/violations-overview.component";
import PhotosOverview from "./../../partials/overview-pages/photo-overview/photo-overview.component";
import NotesOverview from "./../../partials/overview-pages/notes-overview/notes-overview.component";

import "./crew-view.css";

class CrewViewPage extends Component {
  render() {
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
              <SeeLink linkText={t('BUTTONS.SEE_ALL')}/>
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
          <BoardingsOverview />
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
