import React, { memo } from "react";
import moment from "moment";
import { withTranslation } from "react-i18next";

import SeeAll from "../../../partials/see-all-link/see-all-link";

import "./notes-overview.css";

const notes = [
  {
    date: "2020-04-18T16:16:37.000+00:00",
    boarding:
      "Something strange was coming from below deck. It was pretty stinky.",
  },
  {
    date: "2020-04-18T16:16:37.000+00:00",
    boarding:
      "Something strange was coming from below deck. It was pretty stinky.",
  },
  {
    date: "2020-04-18T16:16:37.000+00:00",
    boarding:
      "Something strange was coming from below deck. It was pretty stinky.",
  },
  {
    date: "2020-04-18T16:16:37.000+00:00",
    boarding:
      "Something strange was coming from below deck. It was pretty stinky.",
  },
  {
    date: "2020-04-18T16:16:37.000+00:00",
    boarding:
      "Something strange was coming from below deck. It was pretty stinky.",
  },
  {
    date: "2020-04-18T16:16:37.000+00:00",
    boarding:
      "Something strange was coming from below deck. It was pretty stinky.",
  },
];

const NotesOverview = ({ t }) => (
  <div className="flex-column box-shadow padding white-bg margin-top half-row-view justify-between">
    <div className="flex-row justify-between">
      <h3>Notes</h3>
      <div className="item-label">{notes.length}</div>
    </div>
    <table className="custom-table boardings-table">
      <thead>
        <tr className="row-head">
          <td>{t("TABLE.NOTE")}</td>
          <td>{t("BOARDING_PAGE.VIEW_BOARDING.BOARDING")}</td>
        </tr>
      </thead>
      <tbody>
        {notes.map((note, ind) => (
          <tr key={ind} className="table-row row-body">
            <td>{note.boarding}</td>
            <td>{moment(note.date).format("L")}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <div className="flex-row justify-center padding-top">
      <SeeAll />
    </div>
  </div>
);

export default withTranslation("translation")(memo(NotesOverview));
