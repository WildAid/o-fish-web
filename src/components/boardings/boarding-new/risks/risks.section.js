import React, { Component } from "react";
import { TextField } from "@material-ui/core";
import AttachFileIcon from "@material-ui/icons/AttachFile";

import { withTranslation } from "react-i18next";

class RisksSection extends Component {
  state = { level: "green", amberReason: '' };

  updateParentState = () => this.props.saveNewRisk({ ...this.state });

  saveRisk = (risk) => {
    this.setState({ level: risk, amberReason: '' }, this.updateParentState);
  };

  handleAmberReasonChange = (text) => {
    this.setState({ ...this.state, amberReason: text }, this.updateParentState);
  }

  render() {
    const { t } = this.props;
    const { level, amberReason } = this.state;

    return (
      <section className="flex-column box-shadow white-bg margin-top">
        <div className="table-name padding-25 border-bottom">
          {t("TABLE.RISK")}
        </div>
        <div className="padding-25">
          <div className="flex-row justify-between">
            <h3 className="item-name">{`${t("TABLE.RISK")} *`}</h3>
            <AttachFileIcon className="blue-color" />
          </div>
          <div className="flex-row justify-between margin-top margin-bottom">
            <button
              className={`third-row-view risk-btn risk-green pointer ${level === "green" ? "active-green" : ""
                }`}
              onClick={() => this.saveRisk("green")}
            >
              {t("FILTER.MAIN.RISK.GREEN")}
            </button>
            <button
              className={`third-row-view risk-btn risk-amber pointer ${level === "amber" ? "active-amber" : ""
                }`}
              onClick={() => this.saveRisk("amber")}
            >
              {t("FILTER.MAIN.RISK.AMBER")}
            </button>
            <button
              className={`third-row-view risk-btn risk-red pointer ${level === "red" ? "active-red" : ""
                }`}
              onClick={() => this.saveRisk("red")}
            >
              {t("FILTER.MAIN.RISK.RED")}
            </button>
          </div>
        </div>
        <div className="padding-25">
          <TextField
            required
            label={`Reason for ${this.state.level.charAt(0).toUpperCase() + this.state.level.slice(1)}`}
            className="full-view"
            name="reason"
            value={amberReason}
            onChange={e => this.handleAmberReasonChange(e.target.value)}
          />
        </div>
      </section>
    );
  }
}

export default withTranslation("translation")(RisksSection);
