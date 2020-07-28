import React, { Component, Fragment } from "react";
import { withTranslation } from "react-i18next";
import moment from "moment";
import ComplianceRateSection from "./compliance-rate-section/compliance-rate.section";
import BoardingsSection from "./boardings-section/boardings.section";
import PatrolHoursSection from "./patrol-hours-section/patrol-hours.section";
import SearchPanel from "./../partials/search-panel/search-panel.component";
import DatesRange from "./../partials/dates-range/dates-range.component";

import SearchService from "./../../services/search.service";
import AuthService from "./../../services/auth.service";

import "./home.css";

const authService = AuthService.getInstance();
const searchService = SearchService.getInstance();

class Home extends Component {
  state = {
    vessels: [],
    boardings: [],
    crew: [],
    searchQuery: "",
    highlighted: [],
    isLoaded: true,
    datesFilter:{
          date: { $gt: moment().subtract(1, "week").toDate() }
      }
  };

  search = (value) => {
    searchService
      .search(value)
      .then((data) => {
        this.setState(data);
      })
      .catch((error) => {
        console.error(error);
      });
    this.setState({ searchQuery: value });
  };

  changeFilter = (filter) => {
    let filterObject =
    {
          date: { $gt: new Date(filter.start) }
      }/*{ $and : [{
        date: { $gt: filter.start}
      }, {
        date: { $lte: filter.end}
      }]
    };*/
    let filterObject2 = {          date: { $lte:  new Date(filter.end)}};
    let filterObject3 =
    { $and : [{
        date: { $gt: new Date(filter.start)}
      }, {
        date: { $lte: new Date(filter.end)}
      }]
    };
    this.setState({datesFilter: filterObject3});
  }

  render() {
    const { vessels, boardings, crew, searchQuery, highlighted, isLoaded, datesFilter } = this.state;
    const { t } = this.props;
    const user = authService.user;

    return (
      <div className="flex-column full-view align-center home">
        <SearchPanel
          handler={this.search}
          value={searchQuery}
          vessels={vessels}
          boardings={boardings}
          crew={crew}
          searchWords={highlighted}
          isAutofill={true}
        />
      <div className="standard-view page-header">
            <div className="item-label">{t("HOME_PAGE.DASHBOARD")}</div>
            <div className="flex-row full-view justify-between align-center">
              <div className="item-name">{isLoaded && user ? user.agency.name : t("LOADING.LOADING")}</div>
              <DatesRange onFilterChange={this.changeFilter}></DatesRange>
            </div>
        </div>
        {isLoaded && <Fragment>
          <ComplianceRateSection filter={datesFilter}/>
          <BoardingsSection filter={datesFilter} />
          <PatrolHoursSection filter={datesFilter} />
        </Fragment>}
      </div>
    );
  }
}

export default withTranslation("translation")(Home);
