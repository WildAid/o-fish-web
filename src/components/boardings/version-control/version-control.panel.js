import React, { Component } from "react";
import "./version-control.css";


export default class VersionControlPanel extends Component {
  state = {expanded: null}

  showChanges = (event, item) => {
    this.setState({expanded: item});
    event.preventDefault();
    event.cancelBubble = true;
  }

  render() {
    const {dataObject} = this.props;
    return (
        <div className='version-control-panel' onClick={this.props.onHide}>
          <h3>Revision History</h3>
          {dataObject && dataObject.length && dataObject.map((item)=>
            <div className={'version-control-item ' + (this.state.expanded === item ? ' expanded': '')}
              onClick={(event)=>this.showChanges(event, item)}>
              <div className="version-info-row row">
                <div className='version-info half-row'>
                  <div class="version-date">
                    <b>{item.date}</b>
                  </div>
                  <div class="version-author">
                    {item.author}
                  </div>
                </div>
                <div className='version-controls'>
                  {item.changes.length} Changes
                </div>
              </div>
              <div class="version-details">
                <div class="changes-row">
                  <div class='row'>
                    <div class="added">Added</div>
                    <div class='changes-time'>12.44 PM</div>
                  </div>
                  <div class="row ">Catch</div>
                  <div class="row">
                    <div>
                      <label>Species</label>
                      <div>Some plants</div>
                    </div>
                    <div>
                      <label>Weight</label>
                      <div>43 kg</div>
                    </div>
                    <div>
                      <label>Amount</label>
                      <div>57</div>
                    </div>
                  </div>
                </div>
                <div class="changes-row">
                  <div class='row'>
                    <div class="changed">Changed</div>
                    <div class='changes-time'>12.44 PM</div>
                  </div>
                  <div class="row">Crew Member</div>
                  <div class="row">
                    <div>
                      <label>Name</label>
                      <div>Vasya</div>
                    </div>
                    <div>
                      <label>License Number</label>
                      <div>#20394092834</div>
                    </div>
                  </div>
                </div>
                <div class="changes-row">
                  <div class='row'>
                    <div class="deleted">Deleted</div>
                    <div class='changes-time'>12.44 PM</div>
                  </div>
                  <div class="row ">Date&Time</div>
                  <div class="row"></div>
                </div>
              </div>
            </div>
          )}
        </div>
    )
  }
}
