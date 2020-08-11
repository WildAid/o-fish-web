import React, { memo } from "react";
import moment from "moment";

import SeeAll from "../../../partials/see-all-link/see-all-link";

import "./photo-overview.css";

const photos = [
  {
    date: "2020-04-18T16:16:37.000+00:00",
  },
  {
    date: "2020-04-18T16:16:37.000+00:00",
  },
  {
    date: "2020-04-18T16:16:37.000+00:00",
  },
  {
    date: "2020-04-18T16:16:37.000+00:00",
  },
  {
    date: "2020-04-18T16:16:37.000+00:00",
  },
];

const PhotosOverview = ({ mainText, subText, img }) => (
  <div className="flex-column box-shadow padding white-bg margin-top half-row-view justify-between margin-right">
    <div className="flex-row justify-between">
      <h3>Photos</h3>
      <div className="item-label margin-top">{photos.length}</div>
    </div>
    <div className="flex-row justify-between padding-top photos-list">
      {photos.map((photo, ind) => (
        <div key={ind} className="flex-column align-center margin-bottom photo-container">
          <div className="big-photo-icon">
            <img className="icon" src={require('../../../../assets/photo-big-icon.png')} alt="no logo" />
          </div>
          <div className="item-label margin-top">
            {moment(photo.date).format("L")}
          </div>
        </div>
      ))}
    </div>
    <div className="flex-row justify-center padding-top">
      <SeeAll />
    </div>
  </div>
);

export default memo(PhotosOverview);
