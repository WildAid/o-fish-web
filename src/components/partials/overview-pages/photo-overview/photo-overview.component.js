import React, { memo, Fragment } from "react";
import moment from "moment";
import { withTranslation } from "react-i18next";

// import UserPhoto from "../../../partials/user-photo/user-photo.component";

import SeeLink from "../../../partials/see-all-link/see-all-link";

import { goToPage, goToPageWithFilter } from "./../../../../helpers/get-data";

import {
  PHOTOS_PAGE,
} from "../../../../root/root.constants.js";

import "./photo-overview.css";

const PhotosOverview = ({ t, photos, photosId, filter }) => (
  <div className="flex-column box-shadow padding-bottom white-bg margin-top margin-right photos-section">
    <div className="flex-row justify-between padding border-bottom gray-bg">
      <h3>{t("BOARDING_PAGE.VIEW_BOARDING.PHOTOS")}</h3>
      <div className="item-label">{!!photos.length ? photos.length : ""}</div>
    </div>
    {!!photos.length ? (
      <Fragment>
        <div className="flex-row justify-between padding-top photos-list margin-left margin-right">
          {photos.slice(0, 12).map((photo, ind) => (
            <div
              key={ind}
              className="flex-column align-center margin-bottom photo-container"
            >
              <div className="big-photo-icon">
                {/* <UserPhoto imageId={photo.url} defaultIcon={false} /> */}
                <img
                  className="icon"
                  src={require("../../../../assets/photo-big-icon.png")}
                  alt="no logo"
                />
              </div>
              <div className="item-label margin-top date-text">
                {moment(photo.date).format("L")}
              </div>
            </div>
          ))}
        </div>
        <div
          className="flex-row justify-center padding-top"
          onClick={() => goToPageWithFilter(PHOTOS_PAGE, filter)}
        >
          <SeeLink linkText={t("BUTTONS.SEE_ALL")} />
        </div>
      </Fragment>
    ) : (
      <div className="padding">{t("WARNINGS.NO_PHOTOS")}</div>
    )}
  </div>
);

export default withTranslation("translation")(memo(PhotosOverview));
