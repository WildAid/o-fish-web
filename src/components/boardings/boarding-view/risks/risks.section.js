import React, { Component } from "react";
import { Button } from "@material-ui/core";
import { withTranslation } from "react-i18next";

class RisksSection extends Component {
  render() {
    const { t } = this.props;

    return (
      <div className="basic-info-section section">
        <div className="row left-aligned">
          <h2>{t("FILTER.MAIN.RISKS.NAME")}</h2>
        </div>
        <section>
          <h3>{t("TABLE.RISK")}</h3>
          <div className="row">
            <Button
              className="green-button"
              variant="contained"
              color="green"
            >  //TODO: width may need to be 27% but don't use inline css
              {t("FILTER.MAIN.RISK.GREEN")}
            </Button>
            <Button variant="outlined" color="olive"> //TODO: width may need to be 27% but don't use inline css
              {t("FILTER.MAIN.RISK.AMBER")}
            </Button>
            <Button variant="outlined" color="red"> //TODO: width may need to be 27% but don't use inline css
              {t("FILTER.MAIN.RISK.RED")}
            </Button>
          </div>
        </section>
      </div>
    );
  }
}

export default withTranslation("translation")(RisksSection);
