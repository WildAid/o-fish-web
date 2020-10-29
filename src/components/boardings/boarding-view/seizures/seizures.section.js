import React, { Component } from "react";
import { withTranslation } from "react-i18next";

class SeizuresSection extends Component {
  render() {
    const { t } = this.props;

    return (
      <div class="crew-section">
        <div
          className="row left-aligned"
        >
          <h2>
            {t("BOARDING_PAGE.EDIT_BOARDING.SEIZURES")}
          </h2>
        </div>
      </div>
    );
  }
}

export default withTranslation("translation")(SeizuresSection);
