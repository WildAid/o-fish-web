import React, { Component, Fragment } from "react";
import { withTranslation } from "react-i18next";
import moment from "moment";

import DatesRange from "./../partials/dates-range/dates-range.component";
import BoardingsTable from "./../boardings/boardings-table/boardings-table.component";
import UserPhoto from "./../partials/user-photo/user-photo.component";
import LoadingPanel from "./../partials/loading-panel/loading-panel.component";

import { getHighlightedText } from "./../../helpers/get-data";

import BoardingService from "./../../services/boarding.service";
import AuthService from "./../../services/auth.service";
import AgencyService from "./../../services/agency.service";

const authService = AuthService.getInstance();
const boardingService = BoardingService.getInstance();
const agencyService = AgencyService.getInstance();

class FieldDashboard extends Component {
  state = {
    boardings: [],
    stats: {warnings: 0, citations: 0},
    total: 0,
    limit: 50,
    offset: 0,
    isMapShown: true,
    highlighted: [],
    loading: true,
    page: 1,
    currentFilter: {
      date: { $gt: moment().subtract(1, "year").toDate() },
    },
  };

  handlePageChange = (e, page) => {
    const { limit } = this.state;
    const newOffset = (page - 1) * limit;
    this.loadData({ offset: newOffset, page: page });
  };

  showMap = () => {
    const { isMapShown } = this.state;

    this.setState({
      isMapShown: !isMapShown,
    });
  };

  loadData(newState) {
    newState = newState || {};
    newState.loading = true;

    this.setState(newState, () => {
      const { limit, offset, currentFilter, searchQuery } = this.state;
      boardingService
        .getBoardingsWithFacet(limit, offset, searchQuery, {
          ...currentFilter,
          "reportingOfficer.email": authService.user.email,
        })
        .then((data) => {
          agencyService.getStats(searchQuery, {
            ...currentFilter,
            "reportingOfficer.email": authService.user.email,
          }).then((stats)=>{
            this.setState({
              loading: false,
              boardings: data.boardings,
              stats: stats,
              total: data.amount && data.amount[0] ? data.amount[0].total : 0,
              highlighted: getHighlightedText(
                data.highlighted ? data.highlighted : []
              ),
            });
          })
        })
        .catch((error) => {
          console.error(error);
        });
    });
  }

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
    this.loadData({ currentFilter: filterObject })
  };

  componentDidMount() {
    this.loadData();
  }

  render() {
    const { t } = this.props;
    const {
      boardings,
      total,
      limit,
      isMapShown,
      highlighted,
      page,
      loading,
      stats
    } = this.state;
    const { user } = authService;

    return (
      <Fragment>
        <div className="standard-view page-header">
          <div className="item-label">{t("HOME_PAGE.DASHBOARD")}</div>
          <div className="flex-row full-view justify-between align-center">
            <div className="flex-row align-center officer-info">
              <UserPhoto imageId={user.profilePic || ""} defaultIcon={false} />
              <div className="flex-column margin-bottom">
                <div className="font-35">
                  {!loading && user
                    ? `${user.name.first} ${user.name.last}`
                    : t("LOADING.LOADING")}
                </div>
                <div>
                  {!loading && user ? user.agency.name : t("LOADING.LOADING")}
                </div>
              </div>
            </div>
            <DatesRange onFilterChange={this.changeFilter} />
          </div>
        </div>
        <div className="white-bg box-shadow standard-view margin-bottom">
          <div className="flex-row justify-between align-end full-view padding-top padding-bottom border-bottom">
            <div className="main-info">
              <div className="item-name">{t("HOME_PAGE.MY_ACTIVITY")}</div>
            </div>
          </div>
          <div className="flex-row justify-around">
            <div className="flex-column align-center field-item">
              <div className="field-number">5</div>
              <div className="item-label">
                {t("HOME_PAGE.DAYS").toUpperCase()}
              </div>
            </div>
            <div className="flex-column align-center field-item">
              <div className="field-number">105</div>
              <div className="item-label">
                {t("HOME_PAGE.HOURS").toUpperCase()}
              </div>
            </div>
            <div className="flex-column align-center field-item">
              {loading ? (
                <LoadingPanel />
              ) : (
                <div className="field-number">{total}</div>
              )}

              <div className="item-label">
                {t("NAVIGATION.BOARDINGS").toUpperCase()}
              </div>
            </div>
            <div className="flex-column align-center field-item">
              <div className="field-number">{stats.citations}</div>
              <div className="item-label">
                {t("TABLE.CITATIONS").toUpperCase()}
              </div>
            </div>
            <div className="flex-column align-center field-item">
              <div className="field-number">{stats.warnings}</div>
              <div className="item-label">
                {t("TABLE.WARNINGS").toUpperCase()}
              </div>
            </div>
          </div>
        </div>
        {!loading ? (
          <div className="flex-column align-center white-bg box-shadow standard-view margin-top margin-bottom padding-bottom">
            {!!boardings.length ? (
              <Fragment>
                <div className="flex-row justify-between align-end full-view padding-top padding-bottom border-bottom">
                  <div className="main-info">
                    <div className="item-name">
                      {t("HOME_PAGE.MY_BOARDINGS")}
                    </div>
                  </div>
                </div>
                <div className="flex-row align-center full-view show-map-handler">
                  <input
                    className="map-handler"
                    type="checkbox"
                    defaultChecked
                    onChange={this.showMap}
                  />
                  <p>{t("BOARDING_PAGE.MAP")}</p>
                </div>
                <BoardingsTable
                  isMapShown={isMapShown}
                  boardings={boardings}
                  highlighted={highlighted}
                  total={total}
                  limit={limit}
                  page={page}
                  handlePageChange={this.handlePageChange}
                />
              </Fragment>
            ) : (
              <div className="padding-top">
                {t("WARNINGS.NO_BOARDINGS")}
              </div>
            )}
          </div>
        ) : (
          t("LOADING.LOADING")
        )}
      </Fragment>
    );
  }
}

export default withTranslation("translation")(FieldDashboard);
