import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import ReactFlagsSelect from 'react-flags-select';
//import css module
import "./new-dialog.css";

class NewDialog extends Component {
  state = {
    items: [""],
  };

  applyDialog = () => {
    let items = this.state.items;
    let newItems = [];
    for (var item of items){
      if (item) newItems.push(item);
    }
    if (this.props.onApply) {
      this.props.onApply(newItems);
    }
  };

  cancelDialog = () => {
    if (this.props.onApply) {
      this.props.onApply();
    }
  };

  addItem = () => {
    let items = this.state.items;
    items.push("");
    this.setState({ items: items });
  };

  changeItem = (value, ind) => {
    let items = this.state.items;
    items[ind] = value;
    this.setState({ items: items });
  };

  render() {
    const { items } = this.state;
    const { t, title, lineText, showCountry } = this.props;
    return (
      <div className="new-menu-dialog full-screen">
        <div className="internal flex-column">
          <div className="title flex-row full-view">
            <h2>{title}</h2>
          </div>
          <div className="content justify-center full-view">
            {items && items.length
              ? items.map((item, ind) => (
                  <div className="line" key={ind}>
                    {showCountry ? (<ReactFlagsSelect
                        searchable={true}
                        value={item}
                        searchPlaceholder={lineText}
                        placeholder={lineText}
                        onSelect={(value) => this.changeItem(value, ind)}
                      />) : <input
                          type="text"
                          value={item}
                          placeholder={lineText}
                          onChange={(event) => this.changeItem(event.target.value, ind)}
                        ></input>}
                  </div>
                ))
              : ""}
            <button
              className="simple-btn"
              onClick={(event) => this.addItem(event)}
            >
              +{t("CUSTOM_MENU.ADD_ANOTHER")}
            </button>
          </div>

          <div className="buttons-row flex-row full-view">
            <button className="blue-btn" onClick={this.applyDialog}>{`${t(
              "BUTTONS.ADD_ITEMS"
            )}`}</button>
            <button className="simple-btn" onClick={this.cancelDialog}>{`${t(
              "BUTTONS.CANCEL"
            )}`}</button>
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation("translation")(NewDialog);
