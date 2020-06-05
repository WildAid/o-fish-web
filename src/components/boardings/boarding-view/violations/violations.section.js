import React, { Component } from "react";
import {Button, TextField} from '@material-ui/core';
import Icon from '@material-ui/core/Icon';


export default class ViolationsSection extends Component {
  constructor(props){
    super(props);
    this.state = {
      count: props.count,
      data: props.dataObject.violations
    }
  }

  setFieldValue = (name, value) => {

  }

  addNew = (name, value) => {
    const newData = [...this.state.data];
    newData.push({});
    this.setState({data: newData});
  }

  deleteItem(itemNo) {
    const newData = [...this.state.data];
    newData.splice(itemNo - 1);
    this.setState({data: newData});
  }

  getItems(values){
    let itemNo = 0;
    return (values.map(item => (
      <section>
          <div className="row">
            <h3>Violation {++itemNo}</h3>
            <div class='section-buttons'>
              <Button variant="outlined" onClick={this.deleteItem.bind(this, itemNo)}>
                <Icon>delete_outlined</Icon>
              </Button>
              <Button variant="outlined">
                <Icon>attachment</Icon>
              </Button>
            </div>
          </div>
          <div className="row">
            <TextField label="Violation:" style={{width: "45%"}} name="description" value={item.description} className="half-row" onChange={e => this.setFieldValue("description", e.target.value)}/>
            <TextField label="Result of violation:" style={{width: "45%"}} name="disposition"  className="half-row" value={item.disposition} onChange={e => this.setFieldValue("disposition", e.target.value)}/>
          </div>
      </section>
    )))
  }


  render() {
    const values = this.state.data;

    return (
        <div class='violations-section section'>
          <div className="row" style={{margin: 0, padding: "10px 2em"}}>
            <h2 style={{marginTop: 0}}>Violations</h2>
            <div className="add-link">
              <Button onClick={this.addNew}>
                <Icon>add</Icon>
                <span>Add violation</span>
              </Button>
            </div>
          </div>
          {this.getItems(values)}
        </div>
    )
  }
}
