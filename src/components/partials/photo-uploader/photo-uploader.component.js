import React, { Component } from "react";
import CircularProgress from '@material-ui/core/CircularProgress';

import "./photo-uploader.css";

export default class PhotoUploader extends Component {
  id = ("uploader" + Math.random()).replace("0.", '');
  state = {imgData: null};

  handleClick = ()=>{
    const input = document.querySelector("#" + this.id + " .hidden-uploader");
    if (input) input.click();
  }

  fileSelected = (data)=>{
    const input = document.querySelector("#" + this.id + " .hidden-uploader");
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = (e)=>{
            const img = document.querySelector("#" + this.id + " .icon");
            img.setAttribute('src', e.target.result);

            reader.onload = (e)=>{
                //this.setSate({imgData: e.target.result});
                if (this.props.onData){
                  this.props.onData(e.target.result)
                }
            }

            reader.readAsArrayBuffer(input.files[0]);
        }

        reader.readAsDataURL(input.files[0]);

    }
  }

  render(){
    return (
      <div className='photo-uploader' id={this.id}>
        <input type='file' className="hidden-uploader" onChange={this.fileSelected}/>
        <div className="add-img" onClick={this.handleClick}>
          <img
            className="icon"
            src={require("../../../assets/download-img-icon.jpg")}
            alt="no logo"
          />
        </div>
      </div>
    )
  }
}
