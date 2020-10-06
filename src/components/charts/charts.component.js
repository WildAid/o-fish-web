import React, { Component, Fragment } from "react";
import { withTranslation } from "react-i18next";
import moment from "moment";

import ComplianceRateSection from "../home/compliance-rate-section/compliance-rate.section";
import BoardingsSection from "../home/boardings-section/boardings.section";
import PatrolHoursSection from "../home/patrol-hours-section/patrol-hours.section";
import DatesRange from "./../partials/dates-range/dates-range.component";
import SearchPanel from "./../partials/search-panel/search-panel.component";
import LoadingPanel from "./../partials/loading-panel/loading-panel.component";

import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import { Link as RouterLink } from "react-router-dom";
import { GLOBAL_AGENCIES_PAGE } from "../../root/root.constants.js";
const LinkRouter = (props) => <Link {...props} component={RouterLink} />;

class ChartsPage extends Component {
  state = {
    vessels: [],
    boardings: [],
    crew: [],
    agencyName: '',
    searchQuery: "",
    loading: true,
    datesFilter: {
      date: { $gt: moment().subtract(1, "year").toDate() },
    },
  };

  changeFilter = (filter) => {
    let filterObject = {
      $and: [
        {
          date: { $gt: new Date(filter.start) },
        },
        {
          date: { $lte: new Date(filter.end) },
        },
      ],
    };
    this.setState({ datesFilter: filterObject });
  };

  loadData(newState) {
    const agencyName = this.props.match.params.id;
    const datesFilter = {
      ...this.state.datesFilter,
      agency: agencyName
    };
    const state = { loading: true, agencyName, datesFilter, ...newState }

    this.setState(state);
  }

  componentDidMount() {
    this.loadData();
  }

  render() {
    const { loading, t } = this.props;
    const {
      agencyName,
      datesFilter,
      vessels,
      crew,
      boardings,
      searchQuery,
      highlighted,
    } = this.state;

    return (
      <div className="flex-column full-view align-center charts-page">
        <SearchPanel
          handler={this.search}
          value={searchQuery}
          boardings={boardings}
          vessels={vessels}
          crew={crew}
          searchWords={highlighted}
          isAutofill={true}
        />
        <div className="standard-view page-header">
          <div className="flex-row full-view justify-between align-center margin-top margin-bottom">
            <div className="flex-column margin-bottom">
              {/* <div className="item-label">{t("HOME_PAGE.DASHBOARD")}</div> */}
              <Breadcrumbs aria-label="breadcrumb" style={{ color: '#0a4074' }}>
                <LinkRouter to={GLOBAL_AGENCIES_PAGE} underline="none" color="inherit">Dashboard</LinkRouter>
                <LinkRouter to={GLOBAL_AGENCIES_PAGE} underline="none" color="inherit">Agencies</LinkRouter>
              </Breadcrumbs>
              {!loading ? (
                <div className="font-35">{agencyName}</div>
              ) : (
                <LoadingPanel />
              )}
            </div>
            <DatesRange onFilterChange={this.changeFilter} />
          </div>
        </div>
        {!loading && (
          <Fragment>
            <ComplianceRateSection filter={datesFilter} />
            <BoardingsSection filter={datesFilter} />
            <PatrolHoursSection filter={datesFilter} />
          </Fragment>
        )}
      </div>
    );
  }
}

export default withTranslation("translation")(ChartsPage);
