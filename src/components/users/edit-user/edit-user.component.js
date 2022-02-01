import React, { Component, Fragment } from "react";
import { withTranslation } from "react-i18next";
import withRouter from "../../../helpers/withRouter";
import { Formik, Form } from "formik";
import { capitalize, TextField } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Alert from "@material-ui/lab/Alert";
import LoadingPanel from "./../../partials/loading-panel/loading-panel.component";
import PhotoUploader from "./../../partials/photo-uploader/photo-uploader.component";
import { checkUserRole } from "./../../../helpers/get-data";
import StitchService from "./../../../services/stitch.service";
import AuthService from "./../../../services/auth.service";
import UserService from "./../../../services/user.service";
import AgencyService from "./../../../services/agency.service";

import {
  USERS_PAGE
} from "../../../root/root.constants.js";

import "./edit-user.css";
const authService = AuthService.getInstance();
const stitchService = StitchService.getInstance();
const userService = UserService.getInstance();
const agencyService = AgencyService.getInstance();


export default withRouter(withTranslation("translation")(
  class EditUser extends Component {
    state = {
      activeTab: 1,
      user: null,
      isLoaded: false,
      error: null,
      agencies: [],
      imgData: null,
      imageId: null,
      successMsg: null,
    };

    formikRef = React.createRef();

    removeErrMsg = () => {
      this.setState({ error: null });
    };

    imageUploaded = (data) => {
      this.setState({ imgData: data });
    };

    changePassword = (event) => {
      if (this.formikRef.current.values.password) {
        userService.resetPasswordRequest(this.state.user.email, this.formikRef.current.values.password)
          .then(() => {
            this.setState({
              successMsg: "Password  is reseted successfully."
            })
          })
          .catch((error) => {
            error.message
              ? this.setState({ error: `${capitalize(error.message)}` })
              : this.setState({ error: "An unexpected error occurred!" });
          });;
      }
    };

    dismissSuccess = () => {
      this.setState({
        successMsg: null,
      })
    }

    saveUser = (values) => {
      const { imgData, user } = this.state;
      let newUser = {
        email: values.email,
        name: {
          first: values.firstName,
          last: values.lastName,
        },
        userGroup: values.userGroup,
        realmUserID: values.realmUserID,
        active: values.active
      };

      if (values.adminType === "global") {
        newUser = {
          ...newUser,
          global: { admin: true },
          agency: { name: values.agency, admin: true },
        };
      } else if (values.adminType === "agency") {
        newUser = { ...newUser, agency: { name: values.agency, admin: true }, global: { admin: false } };
      } else {
        newUser = { ...newUser, agency: { name: values.agency, admin: false }, global: { admin: false } };
      }

      const saveUserFunc = () => {
        if (values.profilePic && !newUser.profilePic) {
          newUser.profilePic = values.profilePic;
        }
        userService
          .updateUser(user._id, newUser)
          .then(() => this.goRedirect())
          .catch((error) => {
            error.message
              ? this.setState({ error: `${capitalize(error.message)}` })
              : this.setState({ error: "An unexpected error occurred!" });
          });
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
              ? this.setState({ error: `${capitalize(error.message)}` })
              : this.setState({ error: "An unexpected error occurred!" });
          });
      } else {
        saveUserFunc();
      }
    };

    goRedirect() {
      this.props.router.navigate(USERS_PAGE);
    }

    clearForm = () => {
      this.goRedirect();
    };

    handleChangeTab = (newTab) => {
      this.setState({
        activeTab: newTab,
      });
    };

    componentDidMount() {
      const userId = this.props.router.params.id;
      agencyService
        .getAgencies(50, 0, "", null)
        .then((data) => {
          this.setState({
            agencies: data.agencies.map((agency) => agency.name) || [],
          });
        })
        .catch((error) => {
          this.setState({ error: error.message });
          console.error(error);
        });
      if (userId) {
        userService
          .getUserById(userId)
          .then((user) => {
            this.setState({ isLoaded: true, user: user });
          })
          .catch((error) => {
            this.setState({ error: error.message });
            console.error(error);
          });
      } else {
        this.setState({ isLoaded: true, user: null });
      }
    }

    render() {
      const { t } = this.props;
      const { user, isLoaded, error, activeTab, agencies, successMsg } = this.state;
      const isAdminUser = authService.userRole === "global" || authService.userRole === "agency";

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
          realmUserID: user.realmUserID,
          active: true
        }
        : {
          firstName: "",
          lastName: "",
          password: "",
          agency: "",
          adminType: "",
          email: "",
          userGroup: "",
          active: true
        };

      return (
        <div className="flex-column align-center padding-top edit-user-component">
          <div className="flex-row justify-between standard-view">
            <div>
              <div className="item-label">{t("CREATE_USER_PAGE.USER")}</div>
              <div className="item-name">{isLoaded && user ? user.name.first + " " + user.name.last : t("LOADING.LOADING")}</div>
            </div>
          </div>
          {successMsg && (
            <Alert icon={false} onClose={this.dismissSuccess}>
              {successMsg}
            </Alert>
          )}
          {error &&
            (<div className="flex-row justify-between standard-view">
              <div className="flex-row justify-between error-message-box">
                <div>{error}</div>
                <Icon className="pointer" onClick={this.removeErrMsg}>
                  close
                </Icon>
              </div>
            </div>)
          }
          <div className="flex-column justify-center align-center standard-view white-bg box-shadow relative edit-user-form">
            {isLoaded ? (<Fragment>
              <div className="flex-row full-view">
                <div
                  className={`tab ${1 === activeTab ? "active" : ""
                    }`}
                  onClick={() => this.handleChangeTab(1)}
                >
                  {"Profile information"}
                </div>
                {isAdminUser &&
                  <div
                    className={`tab ${2 === activeTab && isAdminUser ? "active" : ""
                      }`}
                    onClick={() => this.handleChangeTab(2)}
                  >
                    {"Settings"}
                  </div>
                }
              </div>
              <div className="flex-column align-stretch form-view">
                {1 === activeTab ? (
                  <Formik
                    initialValues={initialValues}
                    onSubmit={this.saveUser}
                    innerRef={this.formikRef}
                    render={({
                      errors,
                      values,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      setFieldValue
                    }) => (
                      <Form
                        onSubmit={handleSubmit}
                        className="flex-column justify-center"
                      >
                        <div className="flex-row justify-center">
                          <PhotoUploader
                            imageId={values.profilePic}
                            onData={this.imageUploaded}
                          >
                          </PhotoUploader>
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
                        <TextField
                          label={t("CREATE_AGENCY_PAGE.EMAIL")}
                          name="email"
                          type="text"
                          className="form-input"
                          onBlur={handleBlur}
                          onChange={(e) => setFieldValue("email", e.target.value)}
                          value={values.email}
                        />
                        {isAdminUser && (
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
                              type="button"
                            >
                              {t("BUTTONS.CHANGE_PASSWORD")}
                            </button>
                          </div>
                        )}
                        <div className="flex-row justify-around align-center margin-top">
                          <button className="blue-btn" type="submit">
                            {t("BUTTONS.SAVE")}
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
                  ></Formik>) : ""
                }
                {2 === activeTab && isAdminUser ? (
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
                        <FormControl className="form-input">
                          <InputLabel id="role-label">
                            {t("CREATE_USER_PAGE.ACTIVE")}
                          </InputLabel>
                          <Select
                            labelId="active-label"
                            onChange={(e) =>
                              setFieldValue("active", e.target.value === "active")
                            }
                            value={values.active ? "active" : "inactive"}
                          >
                            <MenuItem value="active">
                              {t("CREATE_USER_PAGE.ACTIVE")}
                            </MenuItem>
                            <MenuItem value="inactive">
                              {t("CREATE_USER_PAGE.INACTIVE")}
                            </MenuItem>
                          </Select>
                        </FormControl>
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
                              {authService.userRole === "global" ? <MenuItem value="global">
                                <em>{t("ADMINS.GLOBAL")}</em>
                              </MenuItem> : ""}
                              {authService.userRole === "global" || authService.userRole === "agency" ? <MenuItem value="agency">
                                <em>{t("ADMINS.AGENCY")}</em>
                              </MenuItem> : ""}
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
                              {authService.userRole === "global" ? agencies.map((agency, ind) => (
                                <MenuItem value={agency} key={ind}>
                                  <em>{agency}</em>
                                </MenuItem>
                              )) : (<MenuItem value={authService.user.agency.name} key={0}>
                                <em>{authService.user.agency.name}</em></MenuItem>)}
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
                          <div className="flex-row justify-around align-center margin-top">
                            <button className="blue-btn" type="submit">
                              {t("BUTTONS.SAVE")}
                            </button>
                            <div
                              className="blue-color pointer"
                              onClick={this.clearForm}
                            >
                              {t("BUTTONS.CANCEL")}
                            </div>
                          </div>
                        </Fragment>
                      </Form>
                    )}
                  >
                  </Formik>
                ) : ""}
              </div>
            </Fragment>) :
              (<div className="flex-row full-view justify-center"><LoadingPanel></LoadingPanel></div>)}
          </div>
        </div>
      );
    }
  }))
