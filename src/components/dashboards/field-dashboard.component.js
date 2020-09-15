import React, { Component, Fragment } from "react";
import { withTranslation } from "react-i18next";

import DatesRange from "./../partials/dates-range/dates-range.component";
import BoardingsTable from "./../boardings/boardings-table/boardings-table.component";
import UserPhoto from "./../partials/user-photo/user-photo.component";

import { getHighlightedText } from "./../../helpers/get-data";

import BoardingService from "./../../services/boarding.service";

const boardingService = BoardingService.getInstance();

class FieldDashboard extends Component {
  state = {
    boardings: [],
    total: 0,
    limit: 50,
    offset: 0,
    isMapShown: true,
    highlighted: [],
    loading: true,
    page: 1,
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
    const { user } = this.props;

    this.setState(newState, () => {
      const { limit, offset, currentFilter } = this.state;
      const agenciesSearch = true;
      const searchQuery = user.agency.name;

      boardingService
        .getBoardingsWithFacet(limit, offset, searchQuery, currentFilter, agenciesSearch)
        .then((data) => {
          this.setState({
            loading: false,
            boardings: data.boardings,
            total: data.amount && data.amount[0] ? data.amount[0].total : 0,
            highlighted: getHighlightedText(
              data.highlighted ? data.highlighted : []
            ),
          });
        })
        .catch((error) => {
          console.error(error);
        });
    });
  }

  componentDidMount() {
    this.loadData();
  }

  render() {
    const { user, isLoaded, changeFilter, datesFilter, t } = this.props;
    const {
      boardings,
      total,
      limit,
      offset,
      isMapShown,
      highlighted,
      loading,
      page,
    } = this.state;

    return (
      <Fragment>
        <div className="standard-view page-header">
          <div className="item-label">{t("HOME_PAGE.DASHBOARD")}</div>
          <div className="flex-row full-view justify-between align-center">
            <div className="flex-row align-center officer-info">
              <UserPhoto imageId={user.profilePic || ""} defaultIcon={false} />
              <div className="flex-column margin-bottom">
                <div className="officer-name">
                  {isLoaded && user
                    ? `${user.name.first} ${user.name.last}`
                    : t("LOADING.LOADING")}
                </div>
                <div>
                  {isLoaded && user ? user.agency.name : t("LOADING.LOADING")}
                </div>
              </div>
            </div>
            <DatesRange onFilterChange={changeFilter} />
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
              <div className="field-number">5</div>
              <div className="item-label">
                {t("NAVIGATION.BOARDINGS").toUpperCase()}
              </div>
            </div>
            <div className="flex-column align-center field-item">
              <div className="field-number">16</div>
              <div className="item-label">
                {t("TABLE.CITATIONS").toUpperCase()}
              </div>
            </div>
            <div className="flex-column align-center field-item">
              <div className="field-number">1</div>
              <div className="item-label">
                {t("TABLE.WARNINGS").toUpperCase()}
              </div>
            </div>
          </div>
        </div>
        {isLoaded && (
          <div className="flex-column align-center white-bg box-shadow standard-view margin-top margin-bottom padding-bottom">
            <div className="flex-row justify-between align-end full-view padding-top padding-bottom border-bottom">
              <div className="main-info">
                <div className="item-name">{t("HOME_PAGE.MY_BOARDINGS")}</div>
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
          </div>
        )}
      </Fragment>
    );
  }
}

export default withTranslation("translation")(FieldDashboard);
