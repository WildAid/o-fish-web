import React, { Component } from "react";

import LoadingPanel from "./../../partials/loading-panel/loading-panel.component";
import StitchService from "./../../../services/stitch.service";
import { bufferToBase64 } from "./../../../helpers/get-data";

import "./photo-uploader.css";

const stitchService = StitchService.getInstance();

export default class PhotoUploader extends Component {
  state = { src: null, imgData: null, loading: false };
  id = ("uploader" + Math.random()).replace("0.", "");

  handleClick = () => {
    const input = document.querySelector("#" + this.id + " .hidden-uploader");
    if (input) input.click();
  };

  fileSelected = (data) => {
    const input = document.querySelector("#" + this.id + " .hidden-uploader");
    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = (e) => {
        this.setState({ imgData: e.target.result });

        reader.onload = (e) => {
          if (this.props.onData) {
            this.props.onData(e.target.result);
          }
        };

        reader.readAsArrayBuffer(input.files[0]);
      };
      reader.readAsDataURL(input.files[0]);
    }
  };

  componentDidMount() {
    const id = this.props.imageId;
    if (id) {
      this.setState({ loading: true });
      stitchService.getPhoto(id).then((pic) => {
        if (pic) {
          if (pic.pictureURL) {
            this.setState({ loading: false, src: pic.pictureURL });
          } else {
            if (pic && (pic.picture || pic.photo || pic.thumbNail)) {
              pic = pic.thumbNail
                ? pic.thumbNail
                : pic.picture
                ? pic.picture
                : pic.photo;
              this.setState({
                loading: false,
                src: "data:image/jpeg;base64," + bufferToBase64(pic.buffer),
              });
            } else {
              this.setState({ loading: false });
            }
          }
        } else {
          this.setState({ loading: false });
        }
      });
    }
  }

  render() {
    const { imgData, src, loading } = this.state;
    return (
      <div className="photo-uploader" id={this.id}>
        <input
          type="file"
          className="hidden-uploader"
          onChange={($event) => this.fileSelected($event)}
        />
        <div className="add-img" onClick={this.handleClick}>
          <img
            className="icon"
            src={
              imgData
                ? imgData
                : src
                ? src
                : require("../../../assets/download-img-icon.jpg")
            }
            alt="no logo"
          />
        </div>
        {loading ? <LoadingPanel /> : ""}
      </div>
    );
  }
}
