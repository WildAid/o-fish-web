import React, { Component } from "react";
import { withTranslation } from "react-i18next";

class EmptySection extends Component {
  render() {
    const {
      title,
      description,
      btnName
    } = this.props;

    return (
      <section className="box-shadow white-bg margin-top padding-bottom">
        <div className="table-name padding-25 border-bottom">
          {title}
        </div>
        <div className="flex-column align-center margin-bottom">
          <span className="padding-25 font-17 grey-color">
            {description}
          </span>
          <button className="white-btn add-btn">
            {btnName}
          </button>
        </div>
      </section>
    );
  }
}

export default withTranslation("translation")(EmptySection);
