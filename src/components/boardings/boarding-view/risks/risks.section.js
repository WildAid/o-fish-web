import React, { Component } from "react";
import { Button } from "@material-ui/core";
import { withTranslation } from "react-i18next";

class RisksSection extends Component {
  render() {
    const { t } = this.props;

    return (
      <div className="basic-info-section section">
        <div
          className="row left-aligned"
          style={{ width: "60%", margin: 0, padding: "10px 2em" }}
        >
          <h2 style={{ marginTop: 0 }}>{t("FILTER.MAIN.RISKS.NAME")}</h2>
        </div>
        <section>
          <h3>{t("TABLE.RISK")}</h3>
          <div className="row">
            <Button
              className="green-button"
              variant="contained"
              style={{ width: "27%" }}
              color="green"
            >
              {t("FILTER.MAIN.RISK.GREEN")}
            </Button>
            <Button variant="outlined" style={{ width: "27%" }} color="olive">
              {t("FILTER.MAIN.RISK.AMBER")}
            </Button>
            <Button variant="outlined" style={{ width: "27%" }} color="red">
              {t("FILTER.MAIN.RISK.RED")}
            </Button>
          </div>
        </section>
      </div>
    );
  }
}

export default withTranslation("translation")(RisksSection);
