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

import "./notes.css";
import withRouter from "../../helpers/withRouter";

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
    {
      name: "vessel.name",
      title: "Name",
    },
  ],
  "Crews": [
    {
      name: "crewLicense",
      field: "crew.license",
      title: "Crew License Number",
      type: "string-equal",
    },
    {
      name: "crewName",
      field: "crew.name",
      title: "Crew name",
    },
    {
      name: "captainLicense",
      field: "captain.license",
      title: "Captain license Number",
      type: "string-equal",
    },
    {
      name: "captainName",
      field: "captain.lastName",
      title: "Captain name",
    },
  ],
};

class NotesPage extends Component {
  state = {
    notes: [],
    loading: false,
    mounted: false
  };

  componentDidMount() {
    const filter = JSON.parse(this.props.router.params.filter);
    this.setState({ loading: true, mounted: true }, () => {
      const licenseNumber = filter["crew.license"];

      overviewService
        .getBoardingsByFilter(filter)
        .then((data) => {
          const dataHelper = new BoardingDataHelper(data);

          const newState = {
            loading: false,
            notes: dataHelper.getNotes(licenseNumber),
          };
          this.setState(newState);
        })
        .catch((error) => {
          console.error(error);
        });
    });
  }

  render() {
    const { notes, loading, mounted } = this.state;
    const { t } = this.props;

    return mounted && (
      <div className="flex-column justify-center align-center padding-bottom notes-overview">
        <SearchPanel handler={this.search} isAutofill={false} />
        {!loading ? (
          <Fragment>
            <div className="flex-row align-center standard-view">
              <div>
                <div className="item-label margin-top">
                  {t("BOARDING_PAGE.VIEW_BOARDING.NOTES")}
                </div>
                <div className="item-name">{`${notes.length} ${t(
                  "BOARDING_PAGE.VIEW_BOARDING.NOTES"
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
                    <td>{t("TABLE.NOTE")}</td>
                    <td>{t("BOARDING_PAGE.VIEW_BOARDING.BOARDING")}</td>
                    <td></td>
                    <td>{t("TABLE.VESSEL")}</td>
                    <td>{t("TABLE.BOARDED_BY")}</td>
                  </tr>
                </thead>
                <tbody>
                  {notes.map((note, ind) => (
                    <tr key={ind} className="table-row row-body">
                      <td>{note.note}</td>
                      <td>{moment(note.date).format("L")}</td>
                      <td>
                        <RiskIcon safetyLevel={note.risk} />
                      </td>
                      <td>{note.vessel}</td>
                      <td>{note.boardedBy}</td>
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

export default withRouter(withTranslation("translation")(NotesPage));
