import React, { Component } from "react";
import { Button } from "@material-ui/core";
import { withTranslation } from "react-i18next";

class RisksSection extends Component {
  state = { level: "" };

  setData(data) {
    const { dataObject } = this.props;
    this.setState({
      level: data,
    });
    if (typeof dataObject.inspection.summary.safetyLevel !== "object") {
      dataObject.inspection.summary.safetyLevel = {
        level: "Green",
        amberReason: "",
      };
    }
    if (this.props.onChange) {
      dataObject.inspection.summary.safetyLevel.level = data;
      this.props.onChange(dataObject);
    }
  }

  componentDidMount() {
    const { dataObject } = this.props;
    if (typeof dataObject.inspection.summary.safetyLevel !== "object") {
      dataObject.inspection.summary.safetyLevel = {
        level: "Green",
        amberReason: "",
      };
      if (this.props.onChange) {
        this.props.onChange(dataObject);
      }
    }
    this.setState({
      level: dataObject.inspection.summary.safetyLevel.level,
    });
  }

  render() {
    const { level } = this.state;
    const { t } = this.props;

    return (
      <div className="risk-section section">
        <div className="flex-row left-aligned">
          <div className="item-name margin-left margin-top">
            {t("FILTER.MAIN.RISKS.NAME")}
          </div>
          <section className="flex-row justify-between box-shadow padding white-bg margin-top">
            <Button
              variant="outlined"
              style={level === "Green" ? { background: "green" } : {}}
              onClick={() => this.setData("Green")}
            >
              Green
            </Button>
            <Button
              variant="outlined"
              style={level === "Amber" ? { background: "olive" } : {}}
              onClick={() => this.setData("Amber")}
            >
              Amber
            </Button>
            <Button
              variant="outlined"
              style={level === "Red" ? { background: "red" } : {}}
              onClick={() => this.setData("Red")}
            >
              Red
            </Button>
          </section>
        </div>
        <section className="flex-row justify-between box-shadow padding white-bg margin-top">
          <Button
            variant="outlined"
            style={level === "Green" ? { background: "green" } : {}}
            onClick={() => this.setData("Green")}
          >
            {t("FILTER.MAIN.RISK.GREEN")}
          </Button>
          <Button
            variant="outlined"
            style={level === "Amber" ? { background: "olive" } : {}}
            onClick={() => this.setData("Amber")}
          >
            {t("FILTER.MAIN.RISK.AMBER")}
          </Button>
          <Button
            variant="outlined"
            style={level === "Red" ? { background: "red" } : {}}
            onClick={() => this.setData("Red")}
          >
            {t("FILTER.MAIN.RISK.RED")}
          </Button>
        </section>
      </div>
    );
  }
}

export default withTranslation("translation")(RisksSection);
