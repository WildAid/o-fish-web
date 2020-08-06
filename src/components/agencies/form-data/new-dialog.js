import React, { Component } from 'react';
import { withTranslation } from "react-i18next";

import "./new-dialog.css";

class NewDialog extends Component {
  state = {
    items : [""]
  }

  applyDialog = ()=>{
    if (this.props.onApply){
      this.props.onApply(this.state.items)
    }
  }

  cancelDialog = ()=>{
    if (this.props.onApply){
      this.props.onApply();
    }
  }

  addItem = () =>{
    this.state.items.push("");
    this.setState({items : this.state.items});
  }

  changeItem = (event, ind) => {
    this.state.items[ind] = event.target.value;
    this.setState({items : this.state.items});
  }

  render() {
    const { items } = this.state;
    const { t, title, lineText } = this.props;
    return <div className="new-menu-dialog full-screen">
      <div className="internal flex-column">
        <div className="title flex-row  full-view"><h2>{title}</h2></div>
        <div className="content  justify-center full-view">
          {items && items.length
            ? items.map((item, ind) => (
                <div className="line" key={ind}>
                  <input
                    type="text"
                    value={item}
                    placeholder={lineText}
                    onChange={(event) => this.changeItem(event, ind)}
                    ></input>
                </div>
              ))
            : ""}
          <button className="simple-btn" onClick={(event)=> this.addItem(event)}>+
          {t("CUSTOM_MENU.ADD_ANOTHER")}</button>
        </div>

        <div className="buttons-row flex-row full-view"  >
          <button className="blue-btn" onClick={this.applyDialog}>{`${t("BUTTONS.ADD_ITEMS")}`}</button>
          <button className="simple-btn"onClick={this.cancelDialog}>{`${t("BUTTONS.CANCEL")}`}</button>
        </div>
      </div>
    </div>;
  }
}

export default withTranslation("translation")(NewDialog);
