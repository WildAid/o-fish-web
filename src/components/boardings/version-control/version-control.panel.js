import React, { Component } from "react";
import { withTranslation } from "react-i18next";

import BoardingService from "./../../../services/boarding.service";

import "./version-control.css";

const boardingService = BoardingService.getInstance();

class VersionControlPanel extends Component {
  state = { expanded: null, changes: [] };

  showChanges = (event, item) => {
    this.setState({ expanded: item });
    event.preventDefault();
    event.cancelBubble = true;
  };

  componentDidMount() {
    boardingService.getChangeHistory(this.props.boardingId).then((data) => {
      this.setState({ changes: data });
    });
  }

  render() {
    const { changes } = this.state;
    const { t } = this.props;

    return (
      <div className="version-control-panel" onClick={this.props.onHide}>
        <h3>{t("BOARDING_PAGE.VERSION_CONTROL.REVISION_HISTORY")}</h3>
        {changes &&
          changes.length &&
          changes.map((item, ind) => (
            <div
              key={ind}
              className={
                "version-control-item " +
                (this.state.expanded === item ? " expanded" : "")
              }
              onClick={(event) => this.showChanges(event, item)}
            >
              <div className="version-info-row row">
                <div className="version-info half-row">
                  <div className="version-date">
                    <b>{new Date(item.dateCreated).toLocaleString()}</b>
                  </div>
                  <div className="version-author">{item.author}</div>
                </div>
                <div className="version-controls">
                  {item.changeEvents ? item.changeEvents.length : 0} Changes
                </div>
              </div>
              <div className="version-details">
                {item.changeEvents &&
                  item.changeEvents.length &&
                  item.changeEvents.map((event, eind) => (
                    <div className="changes-row" key={eind}>
                      <div className="flex-row justify-between row">
                        <div
                          className={
                            event.changeType
                              ? event.changeType.toLowerCase()
                              : "unknown"
                          }
                        >
                          {event.changeType
                            ? event.changeType.toUpperCase()
                            : "unknown"}
                        </div>
                        <div className="changes-time">
                          {event.date_created
                            ? new Date(event.date_created).toLocaleString()
                            : ""}
                        </div>
                      </div>
                      <div className="changed-fields row">
                        {event.updateDescription &&
                          event.updateDescription.updatedFields &&
                          Object.keys(
                            event.updateDescription.updatedFields
                          ).join(",")}
                      </div>
                      <div className="flex-row justify-between row">
                        <div>
                          <label>{t("FILTER.MAIN.CATCH.SPECIES")}</label>
                          <div>Tuna</div>
                        </div>
                        <div>
                          <label>{t("FILTER.MAIN.CATCH.WEIGHT")}</label>
                          <div>3 kg</div>
                        </div>
                        <div>
                          <label>{t("BOARDING_PAGE.VERSION_CONTROL.AMOUNT")}</label>
                          <div>4</div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
      </div>
    );
  }
}

export default withTranslation("translation")(VersionControlPanel);
