import React, { Component } from "react";
import { Button } from '@material-ui/core';

export default class RisksSection extends Component {

  render() {
    return (
        <div className='basic-info-section section'>
          <div className="row left-aligned" style={{width:"60%", margin: 0, padding: "10px 2em"}}>
            <h2 style={{marginTop: 0}}>Risks</h2>
          </div>
          <section>
            <h3>Risk</h3>
            <div className="row">
              <Button className="green-button" variant="contained" style={{width: "27%"}} color="green">Green</Button>
              <Button variant="outlined" style={{width: "27%"}} color="olive">Amber</Button>
              <Button variant="outlined" style={{width: "27%"}} color="red">Red</Button>
            </div>
          </section>
        </div>
    )
  }
}
