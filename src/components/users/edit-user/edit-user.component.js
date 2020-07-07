import React, { Component } from "react";

import { withRouter } from "react-router";
import LoadingPanel from "./../../partials/loading-panel/loading-panel.component";

import { bufferToBase64 } from "./../../../helpers/get-data";

import UserService from "./../../../services/user.service";
import StitchService from "./../../../services/stitch.service";

const userService = UserService.getInstance();
const stitchService = StitchService.getInstance();

class EditUser extends Component {
  state = {src: "", isLoaded: false};


  componentDidMount(){
    const id = this.props.match.params.id;
    userService.getUserById(id).then((user)=>{
      if (user.profilePic){
        stitchService.getPhoto(user.profilePic).then((pic)=>{
          if (pic.pictureURL){
            this.setState({isLoaded: true, src: pic.pictureURL});
          } else {
            if (pic && (pic.picture || pic.photo)){
              pic = pic.picture ? pic.picture : pic.photo;
              this.setState({isLoaded: true, src: "data:image/jpeg;base64," + bufferToBase64(pic.buffer)});
            } else {
              this.setState({isLoaded: true});
            }
          }
        });
      } else {
        this.setState({isLoaded: true});
      }
    })
  }

  render() {
    const {src, isLoaded} = this.state;
    return (
      <div className="edit-user-page">
         {isLoaded ?
         <img
            className="icon"
            src={src}
            alt="no logo"
          />
        : <LoadingPanel></LoadingPanel>};
      </div>
    );
  }
}

export default withRouter(EditUser);
