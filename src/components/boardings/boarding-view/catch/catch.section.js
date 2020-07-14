import React, { Component } from "react";
import { withTranslation } from "react-i18next";

class CatchSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: props.count,
      data:
        props.dataObject.inspection &&
        props.dataObject.inspection.actualCatch &&
        Array.isArray(props.dataObject.inspection.actualCatch)
          ? props.dataObject.inspection.actualCatch
          : [],
    };
  }

  render() {
    const { t } = this.props;
    const { data } = this.state;

    return (
      <div className="flex-column">
        <div className="item-name margin-left margin-top margin-bottom">
          {t("SEARCH.CATCHES")}
        </div>
        <div className="table-wrapper">
          <table className="custom-table">
            <thead>
              <tr className="table-row row-head border-bottom">
                <td>{t("FILTER.MAIN.CATCH.SPECIES")}</td>
                <td>{t("FILTER.MAIN.CATCH.COUNT")}</td>
                <td>{t("FILTER.MAIN.CATCH.WEIGHT")}</td>
              </tr>
            </thead>
            <tbody>
              {data.map((item, ind) => (
                <tr className="table-row row-body" key={ind}>
                  <td>{item.fish}</td>
                  <td>{item.number}</td>
                  <td>{`${item.weight} ${item.unit}`}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default withTranslation("translation")(CatchSection);
