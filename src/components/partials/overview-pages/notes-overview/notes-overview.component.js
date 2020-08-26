import React, { memo, Fragment } from "react";
import moment from "moment";
import { withTranslation } from "react-i18next";

import SeeLink from "../../../partials/see-all-link/see-all-link";

import "./notes-overview.css";

const NotesOverview = ({ t, notes }) => (
  <div className="flex-column box-shadow padding-bottom white-bg margin-top notes-section">
    <div className="flex-row justify-between padding border-bottom gray-bg">
      <h3>{t("BOARDING_PAGE.VIEW_BOARDING.NOTES")}</h3>
      <div className="item-label">
        {!!notes && !!notes.length ? notes.length : ""}
      </div>
    </div>
    {!!notes.length ? (
      <Fragment>
        <table className="margin-left margin-right">
          <thead>
            <tr className="row-head border-bottom">
              <td>{t("TABLE.NOTE")}</td>
              <td>
                {`${t("BOARDING_PAGE.VIEW_BOARDING.BOARDING")} ${t(
                  "TABLE.DATE"
                )}`}
              </td>
            </tr>
          </thead>
          <tbody>
            {notes.slice(0, 10).map((note, ind) => (
              <tr key={ind} className="table-row row-body">
                <td>{note.note}</td>
                <td>{moment(note.date).format("L")}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex-row justify-center padding-top">
          <SeeLink linkText={t("BUTTONS.SEE_ALL")} />
        </div>
      </Fragment>
    ) : (
      <div className="padding">{t("WARNINGS.NO_NOTES")}</div>
    )}
  </div>
);

export default withTranslation("translation")(memo(NotesOverview));
