import React, { Component } from "react";

import SearchPanel from "./../partials/search-panel/search-panel.component";

import "./forms.css";

class Forms extends Component {
  render() {
    return (
      <div className="forms-page">
        <SearchPanel />
        Forms page
      </div>
    );
  }
}

export default Forms;
