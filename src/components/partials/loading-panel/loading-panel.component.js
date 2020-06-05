import React, { Component } from "react";
import CircularProgress from '@material-ui/core/CircularProgress';

import "./loading-panel.css";

export default class LoadingPanel extends Component {
  render(){
    return (
      <div className='loading-panel'>
        <CircularProgress />
      </div>
    )
  }
}
