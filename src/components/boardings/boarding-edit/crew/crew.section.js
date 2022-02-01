import React, { Component } from "react";
import { TextField } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import { withTranslation } from "react-i18next";

class CrewSection extends Component {
  state = { count: 0, crew: [], captain: { name: "", license: "" } };

  componentDidMount() {
    console.log(this.props);
    this.setState({
      count: this.props.count,
      crew: this.props.dataObject.crew || [],
      captain: this.props.dataObject.captain,
    });
  }

  setCaptain = (field, value) => {
    const { captain } = this.state;
    captain[field] = value;
    this.setState({
      captain: captain,
    });
    if (this.props.onChange) {
      const { dataObject } = this.props;
      dataObject.captain = captain;
      this.props.onChange(dataObject);
    }
  };

  setFieldValue = (index, name, value) => {
    const { crew } = this.state;
    crew[index][name] = value;
    this.setState({
      crew: crew,
    });
    if (this.props.onChange) {
      const { dataObject } = this.props;
      dataObject.crew = crew;
      this.props.onChange(dataObject);
    }
  };

  addNew = (name, value) => {
    const newCrew = [...this.state.crew];
    newCrew.push({});
    this.setState({ crew: newCrew });
    if (this.props.onChange) {
      const { dataObject } = this.props;
      dataObject.crew = newCrew;
      this.props.onChange(dataObject);
    }
  };

  deleteItem(itemNo) {
    const newCrew = [...this.state.crew];
    newCrew.splice(itemNo - 1);
    this.setState({ crew: newCrew });
    if (this.props.onChange) {
      const { dataObject } = this.props;
      dataObject.crew = newCrew;
      this.props.onChange(dataObject);
    }
  }

  render() {
    const { crew, captain } = this.state;
    const { t } = this.props;
    console.log(crew);

    return (
      <div className="flex-column">
        <div className="flex-row justify-between align-baseline">
          <div className="item-name margin-left margin-top">
            {t("NAVIGATION.CREW")}
          </div>
          <div className="font-16 pointer margin-right" onClick={this.addNew}>
            {`+ ${t("BUTTONS.ADD_CREW")}`}
          </div>
        </div>
        <section className="box-shadow padding white-bg margin-top">
          <div className="flex-row justify-between align-baseline">
            <h3>{t("TABLE.CAPTAIN")}</h3>
            <div className="white-btn">
              <Icon>attachment</Icon>
            </div>
          </div>
          <div className="flex-row justify-between">
            <TextField
              label={t("TABLE.NAME")}
              name="name"
              value={captain.name}
              className="half-row-view"
              onChange={(e) => this.setCaptain("name", e.target.value)}
            />
            <TextField
              label={t("TABLE.LICENSE_NUMBER")}
              name="license"
              className="half-row-view"
              value={captain.license}
              onChange={(e) => this.setCaptain("license", e.target.value)}
            />
          </div>
        </section>
        {crew.map((item, index) => (
          <section
            className="box-shadow padding white-bg margin-top"
            key={index}
          >
            <div className="flex-row justify-between align-baseline">
              <h3>{` ${t("SEARCH.CREW_MEMBERS")} ${index + 1}`}</h3>
              <div className="flex-row justify-between buttons-container">
                <button
                  className="white-btn"
                  onClick={() => this.deleteItem(index)}
                >
                  <Icon>delete_outlined</Icon>
                </button>
                <button className="white-btn">
                  <Icon>attachment</Icon>
                </button>
              </div>
            </div>
            <div className="flex-row justify-between">
              <TextField
                label={t("TABLE.NAME")}
                name="name"
                value={item.name}
                className="half-row-view"
                onChange={(e) =>
                  this.setFieldValue(index, "name", e.target.value)
                }
              />
              <TextField
                label={t("TABLE.LICENSE_NUMBER")}
                name="license"
                className="half-row-view"
                value={item.license}
                onChange={(e) =>
                  this.setFieldValue(index, "license", e.target.value)
                }
              />
            </div>
          </section>
        ))}
      </div>
    );
  }
}

export default withTranslation("translation")(CrewSection);
