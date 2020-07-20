import React, { Component, Fragment } from "react";
import { withRouter } from "react-router";
import moment from "moment";
import { Formik, Form } from "formik";
import { TextField } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { withTranslation } from "react-i18next";

import { checkUserRole } from "./../../../helpers/get-data";

import LoadingPanel from "./../../partials/loading-panel/loading-panel.component";
import PhotoUploader from "./../../partials/photo-uploader/photo-uploader.component";

import StitchService from "./../../../services/stitch.service";
import UserService from "./../../../services/user.service";
import AgencyService from "./../../../services/agency.service";

import "./user-editor.css";

const stitchService = StitchService.getInstance();
const userService = UserService.getInstance();
const agencyService = AgencyService.getInstance();

class UserEditor extends Component {
  state = {
    user: null,
    isLoaded: false,
    error: null,
    agencies: [],
    imgData: null,
    imageId: null,
  };

  removeErrMsg = () => {
    this.setState({ error: null });
  };

  imageUploaded = (data) => {
    this.setState({ imgData: data });
  };

  changePassword = (event) => {
    userService.resetPasswordRequest(this.state.user, event.target.value);
  };

  saveUser = (values) => {
    const { userId, newPassword } = this.props;
    const { imgData, user } = this.state;
    let newUser = {
      email: values.email,
      name: {
        first: values.firstName,
        last: values.lastName,
      },
      active: true,
      userGroup: values.userGroup,
    };

    if (!userId) {
      newUser.createdOn = moment().toDate();
    }

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

    const saveUserFunc = () => {
      if (userId) {
        userService
          .updateUser(user._id, newUser)
          .then(() => this.goRedirect())
          .catch((error) => {
            error.message
              ? this.setState({ error: `${error.name}: ${error.message}` })
              : this.setState({ error: "An unexpected error occurred!" });
          });
      } else {
        userService
          .createUser(newPassword ? values.password : values.email, newUser)
          .then(() => this.goRedirect())
          .catch((error) => {
            error.message
              ? this.setState({ error: `${error.name}: ${error.message}` })
              : this.setState({ error: "An unexpected error occurred!" });
          });
      }
    };

    if (imgData) {
      stitchService
        .uploadImage(imgData, newUser.agency.name)
        .then((result) => {
          newUser.profilePic = result.insertedId.toString();
          saveUserFunc();
        })
        .catch((error) => {
          error.message
            ? this.setState({ error: `${error.name}: ${error.message}` })
            : this.setState({ error: "An unexpected error occurred!" });
        });
    } else {
      saveUserFunc();
    }
  };

  goRedirect() {
    if (this.props.onRedirect) {
      this.props.onRedirect();
    }
  }

  clearForm = () => {
    this.goRedirect();
  };

  componentDidMount() {
    const { userId } = this.props;
    agencyService
      .getAgencies(50, 0, "", null)
      .then((data) => {
        this.setState({
          agencies: data.agencies.map((agency) => agency.name) || [],
        });
      })
      .catch((error) => {
        this.setState({ error: error });
        console.error(error);
      });
    if (userId) {
      userService
        .getUserById(userId)
        .then((user) => {
          this.setState({ isLoaded: true, user: user });
        })
        .catch((error) => {
          this.setState({ error: error });
          console.error(error);
        });
    } else {
      this.setState({ isLoaded: true, user: null });
    }
  }

  render() {
    const { user, isLoaded, error, agencies } = this.state;
    const { t, changePassword, newPassword, saveText, allowRoleEditing } = this.props;

    if (!saveText) saveText = t("BUTTONS.SAVE")

    const initialValues = user
      ? {
          profilePic: user.profilePic,
          firstName: user.name.first,
          lastName: user.name.last,
          password: "",
          agency: user.agency.name,
          adminType: checkUserRole(user),
          email: user.email,
          userGroup: user.userGroup,
        }
      : {
          firstName: "",
          lastName: "",
          password: "",
          agency: "",
          adminType: "",
          email: "",
          userGroup: "",
        };

    return (
      <Fragment>
        <div className="flex-row justify-center standard-view white-bg box-shadow relative edit-user-form">
          {!isLoaded ? (
            <LoadingPanel />
          ) : (
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
                    <PhotoUploader
                      imageId={values.profilePic}
                      onData={this.imageUploaded}
                    />
                  </div>
                  <div className="flex-row justify-between">
                    <TextField
                      label={t("CREATE_USER_PAGE.FIRST_NAME")}
                      name="firstName"
                      className="form-input"
                      onBlur={handleBlur}
                      onChange={(e) =>
                        setFieldValue("firstName", e.target.value)
                      }
                      type="text"
                      value={values.firstName}
                    />
                    <TextField
                      label={t("CREATE_USER_PAGE.LAST_NAME")}
                      name="lastName"
                      className="form-input"
                      onBlur={handleBlur}
                      onChange={(e) =>
                        setFieldValue("lastName", e.target.value)
                      }
                      type="text"
                      value={values.lastName}
                    />
                  </div>
                  <div className="flex-column">
                    <TextField
                      label={t("CREATE_AGENCY_PAGE.EMAIL")}
                      name="email"
                      type="text"
                      className="form-input"
                      onBlur={handleBlur}
                      onChange={(e) => setFieldValue("email", e.target.value)}
                      value={values.email}
                    />
                    {changePassword && (
                      <div className="password-line flex-row justify-between">
                        <TextField
                          label={t("LOGIN_PAGE.PASSWORD")}
                          name="password"
                          type="password"
                          className="form-input"
                          onBlur={handleBlur}
                          onChange={(e) =>
                            setFieldValue("password", e.target.value)
                          }
                          value={values.password}
                        />
                        <button
                          className="white-btn"
                          onClick={this.changePassword}
                        >
                          {t("BUTTONS.CHANGE_PASSWORD")}
                        </button>
                      </div>
                    )}
                    {newPassword && (
                      <TextField
                        label={t("LOGIN_PAGE.PASSWORD")}
                        name="password"
                        type="password"
                        className="form-input"
                        onBlur={handleBlur}
                        onChange={(e) =>
                          setFieldValue("password", e.target.value)
                        }
                        value={values.password}
                      />
                    }
                    {allowRoleEditing && (
                      <Fragment>
                        <FormControl className="form-input">
                          <InputLabel id="role-label">
                            {t("CREATE_USER_PAGE.ROLE")}
                          </InputLabel>
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
                          <InputLabel id="agency-label">
                            {t("TABLE.AGENCY")}
                          </InputLabel>
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
                          <InputLabel id="group-label">
                            {t("CREATE_USER_PAGE.USER_GROUP")}
                          </InputLabel>
                          <Select
                            labelId="group-label"
                            onChange={(e) =>
                              setFieldValue("userGroup", e.target.value)
                            }
                            value={values.userGroup}
                          >
                            <MenuItem value="User Group">
                              <em>{t("CREATE_USER_PAGE.USER_GROUP")}</em>
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </Fragment>
                    )}
                  </div>
                  <div className="flex-row justify-around align-center margin-top">
                    <button className="blue-btn" type="submit">
                      {saveText}
                    </button>
                    <div
                      className="blue-color pointer"
                      onClick={this.clearForm}
                    >
                      {t("BUTTONS.CANCEL")}
                    </div>
                  </div>
                </Form>
              )}
            />
          )}
        </div>
        {error && (
          <div className="flex-row justify-between standard-view">
            <div className="flex-row justify-between user-editor-error-message-box">
              <div>{error}</div>
              <Icon className="pointer" onClick={this.removeErrMsg}>
                close
              </Icon>
            </div>
          </div>
        )}
      </Fragment>
    );
  }
}

export default withRouter(withTranslation("translation")(UserEditor));
