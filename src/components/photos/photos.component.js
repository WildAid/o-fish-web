import React, { Component, Fragment } from "react";
import { withTranslation } from "react-i18next";
import moment from "moment";

import LoadingPanel from "./../partials/loading-panel/loading-panel.component";
import FilterPanel from "./../partials/filter-panel/filter-panel.component";
import SearchPanel from "./../partials/search-panel/search-panel.component";
import RiskIcon from "./../partials/risk-icon/risk-icon.component";

import BoardingDataHelper from "../partials/boarding-data.helper.js";
import OverviewService from "./../../services/overview.service";

// import UserPhoto from "../../components/partials/user-photo/user-photo.component";

import './photos.css';

const overviewService = OverviewService.getInstance();

const filterConfiguration = {
  Risk: [
    {
      name: "safetyLevel.red",
      field: "inspection.summary.safetyLevel",
      value: "Red",
      title: "Red",
      partTitle: "Risk: Red",
      type: "risk",
    },
    {
      name: "safetyLevel.amber",
      field: "inspection.summary.safetyLevel",
      value: "Amber",
      title: "Amber",
      partTitle: "Risk: Amber",
      type: "risk",
    },
    {
      name: "safetyLevel.green",
      field: "inspection.summary.safetyLevel",
      value: "Green",
      title: "Green",
      partTitle: "Risk: Green",
      type: "risk",
    },
  ],
  "Boarding Information": [
    {
      name: "date",
      title: "Date",
      type: "date",
    },
    {
      name: "date-from",
      title: "Date from",
      type: "date",
    },
    {
      name: "date-to",
      title: "Date To",
      type: "date",
    },
    {
      name: "time",
      field: "date",
      title: "Time",
      type: "time",
    },
    {
      name: "location",
      title: "Location",
      type: "location",
    },
  ],
  "Vessel Information": [
    {
      name: "vessel.permitNumber",
      title: "Permit Number",
      type: "string-equal",
    },
    {
      name: "vessel.nationality",
      title: "Nationality",
    },
  ],
};

class PhotosPage extends Component {
  state = {
    photos: [],
    loading: false,
  };

  componentDidMount() {
    const { id } = this.props.match.params;

    if (!id) return;

    if (id.indexOf("ln") === 0) {
      this.setState({ loading: true }, () => {
        const licenseNumber = id.substring(2);

        overviewService
          .getBoardingsByCrewLicense(licenseNumber)
          .then((data) => {
            const dataHelper = new BoardingDataHelper(licenseNumber, data);

            const newState = {
              loading: false,
              photos: dataHelper.getPhotos(licenseNumber),
            };
            this.setState(newState);
          })
          .catch((error) => {
            console.error(error);
          });
      });
    }
    if (id.indexOf("in") === 0) {
      const crewName = id.substring(2);

      overviewService
        .getBoardingsByCrewName(crewName)
        .then((data) => {
          const dataHelper = new BoardingDataHelper(crewName, data);

          const newState = {
            loading: false,
            photos: dataHelper.getPhotos(),
          };
          this.setState(newState);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  render() {
    const { photos, loading } = this.state;
    const { t } = this.props;

    return (
      <div className="flex-column justify-center align-center padding-bottom photos-overview">
        <SearchPanel handler={this.search} isAutofill={false} />
        {!loading ? (
          <Fragment>
            <div className="flex-row align-center standard-view">
              <div>
                <div className="item-label margin-top">
                  {t("BOARDING_PAGE.VIEW_BOARDING.PHOTOS")}
                </div>
                <div className="item-name">{`${photos.length} ${t(
                  "BOARDING_PAGE.VIEW_BOARDING.PHOTOS"
                )}`}</div>
              </div>
            </div>
            <div className="flex-row align-center standard-view">
              <div className="margin-right">
                {t("BOARDING_PAGE.ALL_DATES")} &#11206;
              </div>
              <FilterPanel
                options={{ searchByFilter: true }}
                configuration={filterConfiguration}
              />
            </div>
            <div className="table-wrapper">
              <table className="full-view">
                <thead>
                  <tr className="table-row row-head border-bottom">
                    <td>{t("TABLE.PHOTO")}</td>
                    <td>{t("BOARDING_PAGE.VIEW_BOARDING.BOARDING")}</td>
                    <td></td>
                    <td>{t("TABLE.VESSEL")}</td>
                    <td>{t("TABLE.BOARDED_BY")}</td>
                  </tr>
                </thead>
                <tbody>
                  {photos.map((photo, ind) => (
                    <tr key={ind} className="table-row row-body">
                      <td>
                        {/* <UserPhoto imageId={photo.url} defaultIcon={false} /> */}
                        <div className="photo-icon">
                          <img
                            className="icon"
                            src={require("../../assets/photo-big-icon.png")}
                            alt="no logo"
                          />
                        </div>
                      </td>
                      <td>{moment(photo.date).format("LLL")}</td>
                      <td>
                        <RiskIcon safetyLevel={photo.risk} />
                      </td>
                      <td>{photo.vessel}</td>
                      <td>{photo.boardedBy}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Fragment>
        ) : (
          <LoadingPanel />
        )}
      </div>
    );
  }
}

export default withTranslation("translation")(PhotosPage);
