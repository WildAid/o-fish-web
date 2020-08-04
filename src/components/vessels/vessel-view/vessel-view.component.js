import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import moment from "moment";

import SeeAll from "../../partials/see-all-link/see-all-link";
import TextViewer from "../../partials/text-viewer/text-viewer";
import RiskIcon from "../../partials/risk-icon/risk-icon.component";

import "./vessel-view.css";

class VesselViewPage extends Component {
  render() {
    const { t } = this.props;

    return (
      <div className="flex-column align-center padding-top crew-view-page">
        <div className="flex-row align-center standard-view">
          <div className="crew-member-icon">
            <img
              className="icon"
              src={require("../../../assets/vessel-icon.png")}
              alt="no logo"
            />
          </div>
          <div>
            <div className="item-label">Vessel</div>
            <div className="item-name">Predator</div>
          </div>
        </div>
        <div className="flex-row standard-view">
          <div className="flex-column vessel-view-item justify-between box-shadow padding white-bg margin-top">
            <div className="flex-row justify-between">
              <h3>Permit Numbers</h3>
              <div className="item-label">4</div>
            </div>
            <div className="padding-bottom padding-top">10284578</div>
            <div className="flex-row justify-center">
              <SeeAll />
            </div>
          </div>
          <div className="flex-column vessel-view-item justify-between box-shadow padding white-bg margin-top margin-left">
            <div className="flex-row justify-between">
              <h3>Nationalities</h3>
              <div className="item-label">1</div>
            </div>
            <div className="flex-row align-center padding-top">
              <div className="nationality-img">
                <img
                  className="full-view"
                  src={require("../../../assets/nationality.png")}
                  alt="no icon"
                />
              </div>
              Australia
            </div>
          </div>
          <div className="flex-column vessel-view-item justify-between box-shadow padding white-bg margin-top margin-left">
            <div className="flex-row justify-between">
              <h3>Home Ports</h3>
              <div className="item-label">1</div>
            </div>
            <div className="padding-top padding-bottom">Sydney Australia</div>
          </div>
          <div className="flex-column vessel-view-item justify-between box-shadow padding white-bg margin-top margin-left">
            <div className="flex-row justify-between">
              <h3>Captains</h3>
              <div className="item-label">3</div>
            </div>
            <div className="flex-row justify-between padding-top">
              <TextViewer
                mainText="Captain Hook"
                subText="License #12984567"
                mainTextFirst={true}
              />
              <div className="sm-photo-icon">
                <img
                  className="icon"
                  src={require("../../../assets/photo-icon.png")}
                  alt="no logo"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex-row standard-view">
          <div className="flex-column justify-between full-view box-shadow padding white-bg margin-top">
            <div className="flex-row justify-between">
              <h3>Boardings</h3>
              <div className="item-label">14</div>
            </div>
            <table className="custom-table boardings-table">
              <thead>
                <tr className="table-row row-head border-bottom">
                  <td>{t("TABLE.DATE")}</td>
                  <td>{t("TABLE.TIME")}</td>
                  <td>{t("TABLE.AGENCY")}</td>
                  <td>{t("TABLE.VIOLATIONS")}</td>
                  <td>{t("TABLE.CITATIONS")}</td>
                  <td>{t("TABLE.WARNINGS")}</td>
                  <td>{t("TABLE.RISK")}</td>
                </tr>
              </thead>
              <tbody>
                <tr className="table-row row-body">
                  <td>{moment("2020-04-18T16:16:37.000+00:00").format("L")}</td>
                  <td>
                    {moment("2020-04-18T16:16:37.000+00:00").format("LT")}
                  </td>
                  <td>Galapagos</td>
                  <td>13</td>
                  <td>4</td>
                  <td>7</td>
                  <td>
                    <RiskIcon safetyLevel="red" />
                  </td>
                </tr>
                <tr className="table-row row-body">
                  <td>{moment("2020-04-18T16:16:37.000+00:00").format("L")}</td>
                  <td>
                    {moment("2020-04-18T16:16:37.000+00:00").format("LT")}
                  </td>
                  <td>Galapagos</td>
                  <td>11</td>
                  <td>9</td>
                  <td>3</td>
                  <td>
                    <RiskIcon safetyLevel="amber" />
                  </td>
                </tr>
                <tr className="table-row row-body">
                  <td>{moment("2020-04-18T16:16:37.000+00:00").format("L")}</td>
                  <td>
                    {moment("2020-04-18T16:16:37.000+00:00").format("LT")}
                  </td>
                  <td>My Agency</td>
                  <td>1</td>
                  <td>6</td>
                  <td>15</td>
                  <td>
                    <RiskIcon safetyLevel="green" />
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="flex-row justify-center padding-top">
              <SeeAll />
            </div>
          </div>
        </div>
        <div className="flex-row standard-view">
          <div className="flex-column justify-between box-shadow padding white-bg margin-top delivery-section">
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
          <div className="flex-column box-shadow padding white-bg margin-top license-section">
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
          <div className="flex-column justify-between full-view box-shadow padding white-bg margin-top">
            <div className="flex-row justify-between">
              <h3>Violations</h3>
              <div className="item-label">135</div>
            </div>
            <table className="custom-table boardings-table">
              <thead>
                <tr className="table-row row-head border-bottom">
                  <td>{t("TABLE.VIOLATION")}</td>
                  <td>{t("TABLE.VESSEL")}</td>
                  <td>{t("TABLE.RESULT")}</td>
                  <td>{t("BOARDING_PAGE.VIEW_BOARDING.BOARDING")}</td>
                  <td></td>
                </tr>
              </thead>
              <tbody>
                <tr className="table-row row-body">
                  <td>
                    <div className="flex-column">
                      <div>Lingcode 2347</div>
                      <div>No Commercial License</div>
                    </div>
                  </td>
                  <td>The Black Perl</td>
                  <td>Warnings</td>
                  <td>{moment("2020-04-18T16:16:37.000+00:00").format("L")}</td>
                  <td>
                    <button className="white-btn">
                      {t("BOARDING_PAGE.VIEW_BOARDING.VIEW_BOARDING")}
                    </button>
                  </td>
                </tr>
                <tr className="table-row row-body">
                  <td>
                    <div className="flex-column">
                      <div>Lingcode 2347</div>
                      <div>No Commercial License</div>
                    </div>
                  </td>
                  <td>Predator</td>
                  <td>Warnings</td>
                  <td>{moment("2020-04-18T16:16:37.000+00:00").format("L")}</td>
                  <td>
                    <button className="white-btn">
                      {t("BOARDING_PAGE.VIEW_BOARDING.VIEW_BOARDING")}
                    </button>
                  </td>
                </tr>
                <tr className="table-row row-body">
                  <td>
                    <div className="flex-column">
                      <div>Lingcode 2347</div>
                      <div>Lingcode in Season</div>
                    </div>
                  </td>
                  <td>The Black Perl</td>
                  <td>Warnings</td>
                  <td>{moment("2020-04-18T16:16:37.000+00:00").format("L")}</td>
                  <td>
                    <button className="white-btn">
                      {t("BOARDING_PAGE.VIEW_BOARDING.VIEW_BOARDING")}
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="flex-row justify-center padding-top">
              <SeeAll />
            </div>
          </div>
        </div>
        <div className="flex-row justify-between standard-view margin-bottom">
          <div className="flex-column box-shadow padding white-bg margin-top half-row-view justify-between photos-section">
            <div className="flex-row justify-between">
              <h3>Photos</h3>
              <div className="item-label">27</div>
            </div>
            <div className="flex-row justify-between padding-top photos-list">
              <div className="flex-column align-center photo-container">
                <div className="big-photo-icon">
                  <img
                    className="icon"
                    src={require("../../../assets/photo-big-icon.png")}
                    alt="no logo"
                  />
                </div>
                <div className="item-label">
                  {moment("2020-04-18T16:16:37.000+00:00").format("L")}
                </div>
              </div>
              <div className="flex-column align-center photo-container">
                <div className="big-photo-icon">
                  <img
                    className="icon"
                    src={require("../../../assets/photo-big-icon.png")}
                    alt="no logo"
                  />
                </div>
                <div className="item-label">
                  {moment("2020-04-18T16:16:37.000+00:00").format("L")}
                </div>
              </div>
              <div className="flex-column align-center photo-container">
                <div className="big-photo-icon">
                  <img
                    className="icon"
                    src={require("../../../assets/photo-big-icon.png")}
                    alt="no logo"
                  />
                </div>
                <div className="item-label">
                  {moment("2020-04-18T16:16:37.000+00:00").format("L")}
                </div>
              </div>
              <div className="flex-column align-center photo-container">
                <div className="big-photo-icon">
                  <img
                    className="icon"
                    src={require("../../../assets/photo-big-icon.png")}
                    alt="no logo"
                  />
                </div>
                <div className="item-label">
                  {moment("2020-04-18T16:16:37.000+00:00").format("L")}
                </div>
              </div>
              <div className="flex-column align-center photo-container">
                <div className="big-photo-icon">
                  <img
                    className="icon"
                    src={require("../../../assets/photo-big-icon.png")}
                    alt="no logo"
                  />
                </div>
                <div className="item-label">
                  {moment("2020-04-18T16:16:37.000+00:00").format("L")}
                </div>
              </div>
            </div>
            <div className="flex-row justify-center padding-top">
              <SeeAll />
            </div>
          </div>
          <div className="flex-column box-shadow padding white-bg margin-top half-row-view justify-between">
            <div className="flex-row justify-between">
              <h3>Notes</h3>
              <div className="item-label">45</div>
            </div>
            <table className="custom-table boardings-table">
              <thead>
                <tr className="row-head">
                  <td>{t("TABLE.NOTE")}</td>
                  <td>{t("BOARDING_PAGE.VIEW_BOARDING.BOARDING")}</td>
                </tr>
              </thead>
              <tbody>
                <tr className="table-row row-body">
                  <td>
                    Something strange was coming from below deck. It was pretty
                    stinky.
                  </td>
                  <td>{moment("2020-04-18T16:16:37.000+00:00").format("L")}</td>
                </tr>
                <tr className="table-row row-body">
                  <td>
                    Something strange was coming from below deck. It was pretty
                    stinky.
                  </td>
                  <td>{moment("2020-04-18T16:16:37.000+00:00").format("L")}</td>
                </tr>
                <tr className="table-row row-body">
                  <td>
                    Something strange was coming from below deck. It was pretty
                    stinky.
                  </td>
                  <td>{moment("2020-04-18T16:16:37.000+00:00").format("L")}</td>
                </tr>
                <tr className="table-row row-body">
                  <td>
                    Something strange was coming from below deck. It was pretty
                    stinky.
                  </td>
                  <td>{moment("2020-04-18T16:16:37.000+00:00").format("L")}</td>
                </tr>
                <tr className="table-row row-body">
                  <td>
                    Something strange was coming from below deck. It was pretty
                    stinky.
                  </td>
                  <td>{moment("2020-04-18T16:16:37.000+00:00").format("L")}</td>
                </tr>
                <tr className="table-row row-body">
                  <td>
                    Something strange was coming from below deck. It was pretty
                    stinky.
                  </td>
                  <td>{moment("2020-04-18T16:16:37.000+00:00").format("L")}</td>
                </tr>
              </tbody>
            </table>
            <div className="flex-row justify-center padding-top">
              <SeeAll />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation("translation")(VesselViewPage);
