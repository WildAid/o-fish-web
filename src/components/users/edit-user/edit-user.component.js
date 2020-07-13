import React, { Component } from "react";
import { withRouter } from "react-router";
import { Formik, Form } from "formik";
import { TextField } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

import { checkUserType } from "./../../../helpers/get-data";

import LoadingPanel from "./../../partials/loading-panel/loading-panel.component";
import PhotoUploader from "./../../partials/photo-uploader/photo-uploader.component";

import history from "../../../root/root.history";

import StitchService from "./../../../services/stitch.service";
import UserService from "./../../../services/user.service";
import AgencyService from "./../../../services/agency.service";

import "./edit-user.css";

const stitchService = StitchService.getInstance();
const userService = UserService.getInstance();
const agencyService = AgencyService.getInstance();

class EditUser extends Component {
  state = {
    user: null,
    isLoaded: false,
    error: null,
    agencies: [],
    imgData: null,
    imageId: null
  };

  removeErrMsg = () => {
    this.setState({ error: null });
  };

  imageUploaded = (data) => {
    this.setState({imgData: data});
  };

  saveUser = (values) => {
    const {imgData, user} = this.state;
    let newUser = {
      _id: user._id,
      email: values.email,
      name: {
        first: values.firstName,
        last: values.lastName,
      },
      active: true,
      createdOn: user.createdOn,
      userGroup: values.userGroup
    };

    if (values.adminType === "global") {
      newUser = {
        ...newUser,
        global: { admin: true },
        agency: { name: values.agency },
      };
    } else if (values.adminType === "agency") {
      newUser = { ...newUser, agency: { name: values.agency, admin: true } };
    } else {
      newUser = { ...newUser, agency: { name: values.agency } };
    }

    const saveUserFunc = () => {userService
      .updateUser(newUser)
      .then(() => history.push("/users"))
      .catch((error) => {
        error.message
          ? this.setState({ error: `${error.name}: ${error.message}` })
          : this.setState({ error: "An unexpected error occurred!" });
      });
    }

    if (imgData){
      stitchService.uploadImage(imgData, newUser.agency.name).then((result)=>{
        newUser.profilePic = result.insertedId.toString();
        saveUserFunc();
      }).catch((error) => {
        error.message
          ? this.setState({ error: `${error.name}: ${error.message}` })
          : this.setState({ error: "An unexpected error occurred!" });
      });
    } else {
      saveUserFunc();
    }
  }

  componentDidMount(){
    const id = this.props.userId ? this.props.userId : this.props.match.params.id;
    agencyService
      .getAgencies(50, 0, "", null)
      .then((data) => {
        this.setState({
          agencies: data.agencies.map((agency) => agency.name) || [],
        });
      })
      .catch((error) => {
        this.setState({error: error});
        console.error(error);
      });
    userService.getUserById(id).then((user)=>{
      console.log(user);
      this.setState({isLoaded: true, user: user});
    }).catch((error) => {
      this.setState({error: error});
      console.error(error);
    });
  }

  clearForm = ()=>{
    history.push("/users")
  }

  render() {
    const {user, isLoaded, error, agencies} = this.state;
    const initialValues = user ? {
      profilePic: user.profilePic,
      firstName: user.name.first,
      lastName:  user.name.last,
      password: "",
      agency: user.agency,
      adminType: checkUserType(user),
      email: user.email,
      userGroup: user.userGroup,
    } : {
      firstName: "",
      lastName: "",
      password: "",
      agency: "",
      adminType: "",
      email: "",
      userGroup: "",
    };
    return (
      <div className="flex-column align-center padding-top">
        <div className="flex-row justify-between standard-view">
          <div>
            <div className="item-label">User</div>
            <div className="item-name">Edit User</div>
          </div>
        </div>
        <div className="flex-row justify-center standard-view white-bg box-shadow relative new-user-form">
          { !isLoaded ? <LoadingPanel></LoadingPanel> :
          <Formik
            initialValues={initialValues}
            onSubmit={this.saveUser}
            render={({
              errors,
              values,
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
            }) => (
              <Form
                onSubmit={handleSubmit}
                className="flex-column justify-center"
              >
                <div className="flex-row justify-center">
                  <PhotoUploader imageId={values.profilePic} onData={this.imageUploaded}></PhotoUploader>
                </div>
                <div className="flex-row justify-between">
                  <TextField
                    label="First Name"
                    name="firstName"
                    className="form-input"
                    onBlur={handleBlur}
                    onChange={(e) => setFieldValue("firstName", e.target.value)}
                    type="text"
                    value={values.firstName}
                  />
                  <TextField
                    label="Last Name"
                    name="lastName"
                    className="form-input"
                    onBlur={handleBlur}
                    onChange={(e) => setFieldValue("lastName", e.target.value)}
                    type="text"
                    value={values.lastName}
                  />
                  <div
                    label="Last Name"
                    name="lastName"
                    className="form-input"
                    onBlur={handleBlur}
                    onChange={(e) => setFieldValue("lastName", e.target.value)}
                    type="text"
                    value={values.lastName}
                  ></div>
                </div>
                <div className="flex-column">
                  <TextField
                    label="Email"
                    name="email"
                    type="text"
                    className="form-input"
                    onBlur={handleBlur}
                    onChange={(e) => setFieldValue("email", e.target.value)}
                    value={values.email}
                  />
                  <TextField
                    label="Password"
                    name="password"
                    type="password"
                    className="form-input"
                    onBlur={handleBlur}
                    onChange={(e) => setFieldValue("password", e.target.value)}
                    value=""
                  />
                  <FormControl className="form-input">
                    <InputLabel id="role-label">Role</InputLabel>
                    <Select
                      labelId="role-label"
                      onChange={(e) =>
                        setFieldValue("adminType", e.target.value)
                      }
                      value={values.adminType}
                    >
                      <MenuItem value="global">
                        <em>Global Admin</em>
                      </MenuItem>
                      <MenuItem value="agency">
                        <em>Agency Admin</em>
                      </MenuItem>
                      <MenuItem value="group">
                        <em>Group Admin</em>
                      </MenuItem>
                      <MenuItem value="field">
                        <em>Field Officer</em>
                      </MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl className="form-input">
                    <InputLabel id="agency-label">Agency</InputLabel>
                    <Select
                      labelId="agency-label"
                      onChange={(e) =>
                        setFieldValue("agency", e.target.value)
                      }
                      value={values.agency}
                    >
                      {agencies.map((agency, ind) => (
                        <MenuItem value={agency} key={ind}>
                          <em>{agency}</em>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl className="form-input">
                    <InputLabel id="group-label">User Group</InputLabel>
                    <Select
                      labelId="group-label"
                      onChange={(e) =>
                        setFieldValue("userGroup", e.target.value)
                      }
                      value={values.userGroup}
                    >
                      <MenuItem value="User Group">
                        <em>User Group</em>
                      </MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="flex-row justify-around align-center margin-top">
                  <button className="blue-btn" type="submit">
                    Update User
                  </button>
                  <div
                    className="blue-color pointer"
                    onClick={this.clearForm}
                  >
                    Cancel
                  </div>
                </div>
              </Form>
            )}
          />}
        </div>
        {error && (
          <div className="flex-row justify-between standard-view">
            <div className="flex-row justify-between err-msg">
              <div>{error}</div>
              <Icon className="pointer" onClick={this.removeErrMsg}>
                close
              </Icon>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(EditUser);
