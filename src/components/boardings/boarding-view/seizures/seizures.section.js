import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import UserPhoto from "../../../partials/user-photo/user-photo.component";

class SeizuresSection extends Component {
  render() {
    const { t, seizures } = this.props;

    return (
      <div className="flex-column">
        <div className="item-name margin-left margin-top margin-bottom">
          {t("BOARDING_PAGE.SEIZURES.TITLE")}
        </div>
        <div className="table-wrapper">
          <table className="custom-table">
            <thead>
              <tr className="table-row row-head border-bottom">
                <td>{t("BOARDING_PAGE.SEIZURES.DESCRIPTION")}</td>
                <td>{t("BOARDING_PAGE.SEIZURES.PHOTOS")}</td>
                <td>{t("BOARDING_PAGE.SEIZURES.NOTES")}</td>
              </tr>
            </thead>
            <tbody>
              {seizures ?
                (
                  <tr className="table-row row-body">
                    <td>{seizures.text || "N/A"}</td>
                    <td>{seizures?.attachments?.photoIDs?.length > 0
                      ? seizures.attachments.photoIDs.map((id) => <UserPhoto key={id} imageId={id} defaultIcon={false} />)
                      : 'N/A'}</td>

                    <td>{seizures.attachments?.notes?.length > 0
                      ? seizures.attachments.notes.map((note) => (
                        <p key={note} style={{
                          margin: "0 10px"
                        }}>{note}</p>
                      ))
                      : 'N/A'}</td>
                  </tr>
                )
                :
                <tr className="table-row row-body">
                  <td>N/A</td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default withTranslation("translation")(SeizuresSection);
