import React, { Component } from "react";
import { withTranslation } from "react-i18next";

class NotesSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: props.count,
      data:
        Array.isArray(props.dataObject.notes)
          ? props.dataObject.notes
          : [],
    };
  }


  render() {
    const { t } = this.props;
    const { data } = this.state;
    return (
      <div className="flex-column">
        <div className="item-name margin-left margin-top margin-bottom">
          {t("BOARDING_PAGE.VIEW_BOARDING.NOTES")}
        </div>
        <div className="table-wrapper">
          <table className="custom-table">
            <thead>
              <tr className="table-row row-head border-bottom">
                <td>{t("TABLE.NOTE")}</td>
                <td>{t("BOARDING_PAGE.VIEW_BOARDING.PHOTOS")}</td>
              </tr>
            </thead>
            <tbody>
              {data.map((item, ind) => (
                <tr className="table-row row-body" key={ind}>
                  <td>{item.note}</td>
                  <td>{item.photoIDs}</td>
                </tr>
              ))} 
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default withTranslation("translation")(NotesSection);
