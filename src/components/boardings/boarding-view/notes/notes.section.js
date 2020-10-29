import React, { Component } from "react";
import {TextField} from '@material-ui/core';

export default class NotesSection extends Component {

  getItems(values){
    let itemNo = 1;
    return (values.map(item => (
      <section>
          <h3>Note {itemNo++}</h3>
          <div className="row">
            <TextField label="Note:" nname="note" value={item.note} className="half-row" onChange={e => this.setFieldValue("note", e.target.value)}/>
          </div>
      </section>
    )))
  }

  render() {
    const values = this.props.dataObject.notes;
    return (
      <div class='notes-section section'>
        <div className="row left-aligned" >
          <h2>Notes</h2>
        </div>
        {this.getItems(values)}
      </div>
    )
  }
}
