import React, { Component } from "react";
import { withTranslation } from "react-i18next";

import EmptySection from "../empty-section/empty.section";

class CatchSection extends Component {
  render() {
    const { t } = this.props;

    return (
      <EmptySection
          title={t("FILTER.MAIN.CATCH.NAME")}
          description={t("BOARDING_PAGE.NEW_BOARDING.NO_CATCH")}
          btnName={`+ ${t("BUTTONS.ADD_CATCH")}`}
      />
    );
  }
}

export default withTranslation("translation")(CatchSection);
