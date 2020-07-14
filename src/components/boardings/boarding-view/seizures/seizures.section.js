import React, { Component } from "react";
import { withTranslation } from "react-i18next";

class SeizuresSection extends Component {
  render() {
    const { t } = this.props;

    return (
      <div class="crew-section">
        <div
          className="row left-aligned"
          style={{ width: "60%", margin: 0, padding: "10px 2em" }}
        >
          <h2 style={{ marginTop: 0 }}>
            {t("BOARDING_PAGE.EDIT_BOARDING.SEIZURES")}
          </h2>
        </div>
      </div>
    );
  }
}

export default withTranslation("translation")(SeizuresSection);
