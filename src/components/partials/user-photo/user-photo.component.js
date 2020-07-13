import React, { Component } from "react";
import LoadingPanel from "./../../partials/loading-panel/loading-panel.component";
import StitchService from "./../../../services/stitch.service";
import { bufferToBase64 } from "./../../../helpers/get-data";

import "./user-photo.css";

const stitchService = StitchService.getInstance();

export default class UserPhoto extends Component {
  state = {src: null, loading: true};

  componentDidMount(){
    const id = this.props.match.params.id;
    stitchService.getPhoto(user.profilePic).then((pic)=>{
      if (pic.pictureURL){
        this.setState({loading: false, src: pic.pictureURL});
      } else {
        if (pic && (pic.picture || pic.photo || pic.thumbNail)){
          pic = pic.thumbNail ? pic.thumbNail : (pic.picture ? pic.picture : pic.photo);
          this.setState({loading: false, src: "data:image/jpeg;base64," + bufferToBase64(pic.buffer)});
        } else {
          this.setState({loading: false});
        }
      }
    )}
  }

  render(){
    const {src, loading} = this.state;
    return (
      <div className='user-photo'>
        {
          loading? <LoadingPanel></LoadingPanel> :
          <img
            src={src || require("../../../assets/download-img-icon.jpg");}
            alt={src ? "user photo": "no photo"}
          />
        }
      </div>
    )
  }
}
