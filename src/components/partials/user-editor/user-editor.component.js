import React, { Component, Fragment } from "react";
import withRouter from "../../../helpers/withRouter";
import moment from "moment";
import { Formik, Form } from "formik";
import { capitalize, TextField } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { withTranslation } from "react-i18next";

import { checkUserRole, required } from "./../../../helpers/get-data";

import LoadingPanel from "./../../partials/loading-panel/loading-panel.component";
import PhotoUploader from "./../../partials/photo-uploader/photo-uploader.component";

import StitchService from "./../../../services/stitch.service";
import UserService from "./../../../services/user.service";
import AgencyService from "./../../../services/agency.service";
import AuthService from "./../../../services/auth.service";

import "./user-editor.css";

const authService = AuthService.getInstance();
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
    disabled: true,
  };

  removeErrMsg = () => {
    this.setState({ error: null });
  };

  imageUploaded = (data) => {
    this.setState({ imgData: data });
  };

  handleChangePassword = () => {
    if (this.props.onChangePassword) {
      this.props.onChangePassword();
    }
  };

  saveUser = (values) => {
    const { userId } = this.props;
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
        agency: { name: values.agency, admin: true },
      };
    } else if (values.adminType === "agency") {
      newUser = {
        ...newUser,
        agency: { name: values.agency, admin: true },
        global: { admin: false },
      };
    } else {
      newUser = {
        ...newUser,
        agency: { name: values.agency, admin: false },
        global: { admin: false },
      };
    }

    const saveUserFunc = () => {
      if (userId) {
        newUser.realmUserID = values.realmUserID;
        if (values.profilePic && !newUser.profilePic) {
          newUser.profilePic = values.profilePic;
        }
        const userId = user._id;
        userService
          .updateUser(userId, newUser)
          .then(() => {
            newUser._id = userId;
            if (this.props.onSave) {
              this.props.onSave(newUser);
            }
            this.goRedirect();
          })
          .catch((error) => {
            error.message
              ? this.setState({ error: `${capitalize(error.message)}` })
              : this.setState({ error: "An unexpected error occurred!" });
          });
      } else {
        userService
          .createUser(values.password, newUser)
          .then((user) => {
            if (this.props.onSave) {
              this.props.onSave(user);
            }
            this.goRedirect();
          })
          .catch((error) => {
            error.message
              ? this.setState({ error: `${capitalize(error.message)}` })
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
            ? this.setState({ error: `${capitalize(error.message)}` })
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

  validate = (values) => {
    return { ...required(values, "adminType"), ...required(values, "email") };
  };

  componentDidMount() {
    const { userId } = this.props;
    agencyService
      .searchAgencies(50, 0, "", null)
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
          this.setState({ error: `${capitalize(error.message)}` });
          console.error(error);
        });
    } else {
      this.setState({ isLoaded: true, user: null });
    }
  }

  render() {
    const { user, isLoaded, error, agencies, disabled } = this.state;
    let { t, showingOptions } = this.props;

    if (!showingOptions) showingOptions = {};
    if (!showingOptions.saveText) showingOptions.saveText = t("BUTTONS.SAVE");

    const hashAdminTypeToRoleName = {
      global: t("ADMINS.GLOBAL"),
      agency: t("ADMINS.AGENCY"),
      group: t("ADMINS.GROUP"),
      field: t("ADMINS.FIELD"),
    }

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
      }
      : {
        firstName: "",
        lastName: "",
        password: "",
        agency:
          authService.userRole === "global"
            ? ""
            : authService.user.agency.name,
        adminType:
          authService.userRole === "global" ||
            authService.userRole === "agency"
            ? ""
            : checkUserRole(authService.user),
        email: "",
        userGroup: "",
      };

    const isAgencyAdmin = authService.userRole === "agency";
    const isGlobalAdmin = authService.userRole === "global";

    return (
      <div className="flex-column align-center standard-view white-bg box-shadow relative user-editor-form">
        {!isLoaded ? (
          <LoadingPanel />
        ) : (
          <Formik
            initialValues={initialValues}
            onSubmit={this.saveUser}
            validate={this.validate}
            render={({
              errors,
              values,
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
              isValid,
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
                    onChange={(e) => setFieldValue("firstName", e.target.value)}
                    type="text"
                    value={values.firstName}
                  />
                  <TextField
                    label={t("CREATE_USER_PAGE.LAST_NAME")}
                    name="lastName"
                    className="form-input"
                    onBlur={handleBlur}
                    onChange={(e) => setFieldValue("lastName", e.target.value)}
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
                    onChange={(e) => {
                      this.setState({ disabled: isValid });
                      setFieldValue("email", e.target.value);
                    }}
                    value={values.email}
                  />
                  <div className="error-messages">{t(errors.email)}</div>
                  {showingOptions.changePassword && (
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
                        value="******************"
                        InputProps={{ readOnly: true }}
                      />
                      <button
                        type="button"
                        className="white-btn"
                        onClick={this.handleChangePassword}
                      >
                        {t("BUTTONS.CHANGE_PASSWORD")}
                      </button>
                    </div>
                  )}
                  {showingOptions.newPassword && (
                    <TextField
                      label={t("LOGIN_PAGE.PASSWORD")}
                      name="password"
                      className="form-input"
                      type="password"
                      onBlur={handleBlur}
                      onChange={(e) =>
                        setFieldValue("password", e.target.value)
                      }
                      value={values.password}
                    />
                  )}
                </div>
                {showingOptions.active && (
                  <FormControl className="form-input">
                    <InputLabel id="role-label">
                      {t("CREATE_USER_PAGE.ACTIVE")}
                    </InputLabel>
                    <Select
                      readOnly={!!showingOptions.readOnly}
                      labelId="active-label"
                      onChange={(e) => setFieldValue("active", e.target.value)}
                      value={values.active}
                    >
                      <MenuItem value="active">
                        {t("CREATE_USER_PAGE.ACTIVE")}
                      </MenuItem>
                      <MenuItem value="inactive">
                        {t("CREATE_USER_PAGE.INACTIVE")}
                      </MenuItem>
                    </Select>
                  </FormControl>
                )}
                {showingOptions.role && (
                  <Fragment>
                    {
                      (isAgencyAdmin || isGlobalAdmin) ? (
                        <React.Fragment>
                          <FormControl className="form-input">
                            <InputLabel id="role-label">
                              {t("CREATE_USER_PAGE.ROLE")}
                            </InputLabel>
                            <Select
                              readOnly={!!showingOptions.readOnly}
                              labelId="role-label"
                              onChange={(e) => {
                                this.setState({ disabled: isValid });
                                setFieldValue("adminType", e.target.value);
                              }}
                              value={values.adminType}
                            >
                              {authService.userRole === "global" ? (
                                <MenuItem value="global">
                                  <em>{t("ADMINS.GLOBAL")}</em>
                                </MenuItem>
                              ) : (
                                ""
                              )}
                              {authService.userRole === "global" ||
                                authService.userRole === "agency" ? (
                                <MenuItem value="agency">
                                  <em>{t("ADMINS.AGENCY")}</em>
                                </MenuItem>
                              ) : (
                                ""
                              )}
                              <MenuItem value="group">
                                <em>{t("ADMINS.GROUP")}</em>
                              </MenuItem>
                              <MenuItem value="field">
                                <em>{t("ADMINS.FIELD")}</em>
                              </MenuItem>
                            </Select>
                          </FormControl>
                          <div className="error-messages">{t(errors.adminType)}</div>
                        </React.Fragment>
                      ) : (
                        <TextField
                          label={t("CREATE_USER_PAGE.ROLE")}
                          name="adminType"
                          className="form-input"
                          onBlur={handleBlur}
                          onChange={(e) => setFieldValue("adminType", e.target.value)}
                          type="text"
                          value={hashAdminTypeToRoleName[values.adminType]}
                          InputProps={{
                            readOnly: true,
                            disableUnderline: true,
                          }}
                        />
                      )
                    }
                    {
                      isGlobalAdmin ? (
                        <FormControl className="form-input">
                          <InputLabel id="agency-label">
                            {t("TABLE.AGENCY")}
                          </InputLabel>
                          <Select
                            readOnly={!!showingOptions.readOnly}
                            labelId="agency-label"
                            onChange={(e) =>
                              setFieldValue("agency", e.target.value)
                            }
                            value={values.agency}
                          >
                            {authService.userRole === "global" ? (
                              agencies.map((agency, ind) => (
                                <MenuItem value={agency} key={ind}>
                                  <em>{agency}</em>
                                </MenuItem>
                              ))
                            ) : (
                              <MenuItem
                                value={authService.user.agency.name}
                                key={0}
                              >
                                <em>{authService.user.agency.name}</em>
                              </MenuItem>
                            )}
                          </Select>
                        </FormControl>
                      ) : (
                        <TextField
                          label={t("TABLE.AGENCY")}
                          name="agency"
                          className="form-input"
                          onBlur={handleBlur}
                          onChange={(e) => setFieldValue("agency", e.target.value)}
                          type="text"
                          value={values.agency}
                          InputProps={{
                            readOnly: true,
                            disableUnderline: true,
                          }}
                        />)
                    }
                    {
                      (isAgencyAdmin || isGlobalAdmin) ? (
                        <FormControl className="form-input">
                          <InputLabel id="group-label">
                            {t("CREATE_USER_PAGE.USER_GROUP")}
                          </InputLabel>
                          <Select
                            readOnly={!!showingOptions.readOnly}
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
                      ) : (
                        <TextField
                          label={t("CREATE_USER_PAGE.USER_GROUP")}
                          name="userGroup"
                          className="form-input"
                          onBlur={handleBlur}
                          onChange={(e) => setFieldValue("userGroup", e.target.value)}
                          type="text"
                          value={values.userGroup}
                          InputProps={{
                            readOnly: true,
                            disableUnderline: true,
                          }}
                        />
                      )
                    }
                  </Fragment>
                )}
                <div className="flex-row justify-around align-center margin-top">
                  <button
                    className={disabled ? "disabled-btn" : "blue-btn"}
                    type="submit"
                    disabled={!isValid}
                  >
                    {showingOptions.saveText}
                  </button>
                  <div className="blue-color pointer" onClick={this.clearForm}>
                    {t("BUTTONS.CANCEL")}
                  </div>
                </div>
              </Form>
            )}
          ></Formik>
        )}
        {error && (
          <div className="flex-row justify-between standard-view margin-bottom">
            <div className="flex-row justify-between error-message-box">
              <div>{error ? error : "Unexpected undefined error!"}</div>
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

export default withRouter(withTranslation("translation")(UserEditor));
