import React, { Component } from "react";
import { withTranslation } from "react-i18next";

import EmptySection from "../empty-section/empty.section";

class NotesSection extends Component {
  render() {
    const { t } = this.props;
    
    return (      
      <EmptySection
          title={t("BOARDING_PAGE.VIEW_BOARDING.NOTES")}
          description={t("BOARDING_PAGE.NEW_BOARDING.NO_NOTES")}
          btnName={`+ ${t("BUTTONS.ADD_NOTES")}`}
      />
    )
  }
}

export default withTranslation("translation")(NotesSection);
