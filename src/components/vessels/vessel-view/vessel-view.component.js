import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import moment from "moment";

import SeeAll from "../../partials/see-all-link/see-all-link";
import TextViewer from "../../partials/text-viewer/text-viewer";

import HeaderOverview from "./../../partials/overview-pages/header-overview-page/header-overview-page.component";
import VesselHeaderInfo from "./../../partials/overview-pages/vessel-header-info/vessel-header-info.component";
import BoardingsOverview from "./../../partials/overview-pages/boardings-overview/boardings-overview.component";
import ViolationsOverview from "./../../partials/overview-pages/violations-overview/violations-overview.component";
import PhotosOverview from "./../../partials/overview-pages/photo-overview/photo-overview.component";
import NotesOverview from "./../../partials/overview-pages/notes-overview/notes-overview.component";

import VesselOverviewService from "./../../../services/vessel-overview.service";

import "./vessel-view.css";

const vesselService = VesselOverviewService.getInstance();

class VesselViewPage extends Component {
  state = {
    notes: [],
    photos: [],
    vessel: null,
    boardings: [],
    violations: [],
    crew: [],
    deliveries: [],
  };

  // componentDidMount() {
    //to test Stitch Functions
  //   vesselService
  //     .getBoardings()
  //     .then((data) => {
  //       console.log(data);
        
  //       this.setState({
  //         boardings: data.boardings,
  //       });
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }

  render() {
    return (
      <div className="flex-column align-center padding-top vessel-view-page">
        <HeaderOverview
          mainText="Predator"
          subText="Vessel"
          img="vessel-icon"
        />
        {/* Block for vessel main info */}
        <div className="flex-row standard-view">
          <VesselHeaderInfo
            headerText="Permit Numbers"
            mainText="10284578"
            itemsAmount="4"
          />
          <VesselHeaderInfo
            headerText="Nationalities"
            mainText="Australia"
            itemsAmount="1"
          />
          <VesselHeaderInfo
            headerText="Home Ports"
            mainText="Sydney Australia"
            itemsAmount="1"
          />
          <VesselHeaderInfo
            headerText="Captains"
            mainText="Captain Hook"
            subText="License #12984567"
            itemsAmount="3"
          />
        </div>
        <div className="flex-row standard-view">
          <BoardingsOverview />
        </div>
        <div className="flex-row standard-view">
          <div className="flex-column justify-between box-shadow padding white-bg margin-top margin-right crew-section">
            <div className="flex-row justify-between">
              <h3>Crew Members</h3>
              <div className="item-label">16</div>
            </div>
            <div className="flex-row border-bottom padding-bottom padding-top justify-between crew-list">
              <div className="flex-row align-center padding-bottom margin-bottom border-bottom half-row-view">
                <div className="flex-row half-row-view">
                  <TextViewer
                    mainText="Marlin Nemo"
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
                  <div className="item-label">+6</div>
                </div>
              </div>
              <div className="flex-row align-center padding-bottom margin-bottom border-bottom half-row-view">
                <div className="flex-row half-row-view">
                  <TextViewer
                    mainText="Marlin Nemo"
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
              <div className="flex-row align-center padding-bottom margin-bottom border-bottom half-row-view">
                <div className="flex-row half-row-view">
                  <TextViewer
                    mainText="Marlin Nemo"
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
              <div className="flex-row align-center padding-bottom margin-bottom border-bottom half-row-view">
                <div className="flex-row half-row-view">
                  <TextViewer
                    mainText="Marlin Nemo"
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
              <div className="flex-row align-center half-row-view">
                <div className="flex-row half-row-view">
                  <TextViewer
                    mainText="Marlin Nemo"
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
                  <div className="item-label">+4</div>
                </div>
              </div>
            </div>
            <div className="flex-row justify-center padding-top">
              <SeeAll />
            </div>
          </div>
          <div className="flex-column box-shadow padding white-bg margin-top license-section delivery-section">
            <div className="flex-row justify-between">
              <h3>Deliveries</h3>
              <div className="item-label">55</div>
            </div>
            <div className="flex-row align-center justify-between border-bottom padding-bottom padding-top">
              <div>
                <div className="delivery-name">P. Sherman dentistry</div>
                <div className="delivery-address">42, wallaby way, Sydney</div>
              </div>
              <div className="item-label">
                {moment("2020-04-18T16:16:37.000+00:00").format("L")}
              </div>
            </div>
            <div className="flex-row align-center justify-between border-bottom padding-bottom padding-top">
              <div>
                <div className="delivery-name">P. Sherman dentistry</div>
                <div className="delivery-address">42, wallaby way, Sydney</div>
              </div>
              <div className="item-label">
                {moment("2020-04-18T16:16:37.000+00:00").format("L")}
              </div>
            </div>
            <div className="flex-row align-center justify-between border-bottom padding-bottom padding-top">
              <div>
                <div className="delivery-name">P. Sherman dentistry</div>
                <div className="delivery-address">42, wallaby way, Sydney</div>
              </div>
              <div className="item-label">
                {moment("2020-04-18T16:16:37.000+00:00").format("L")}
              </div>
            </div>
            <div className="flex-row justify-center padding-top">
              <SeeAll />
            </div>
          </div>
        </div>
        <div className="flex-row standard-view">
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

export default withTranslation("translation")(VesselViewPage);
