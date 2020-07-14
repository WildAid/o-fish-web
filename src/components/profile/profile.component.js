import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { Formik, Form } from "formik";
import { TextField } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Icon from "@material-ui/core/Icon";
import MenuItem from "@material-ui/core/MenuItem";

import { checkUserType } from "./../../helpers/get-data";

import LoadingPanel from "./../partials/loading-panel/loading-panel.component";
import PhotoUploader from "./../partials/photo-uploader/photo-uploader.component";

import history from "../../root/root.history";

import UserService from "./../../services/user.service";
import StitchService from "./../../services/stitch.service";

const userService = UserService.getInstance();
const stitchService = StitchService.getInstance();

class Profile extends Component {
  state = {
    user: null,
    isLoaded: false,
    error: null,
  };

  clearForm = () => {
    history.push("/users");
  };

  saveUser = () => {
    //TODO Save user updates
  };

  componentDidMount() {
    const id = stitchService._localStitchClient.auth.activeUserAuthInfo.userId;

    userService
      .getUserById(id)
      .then((user) => {
        this.setState({ isLoaded: true, user: user });
      })
      .catch((error) => {
        this.setState({ error: error });
        console.error(error);
      });
  }

  render() {
    const { user, isLoaded, error } = this.state;
    const { t } = this.props;

    const initialValues = user
      ? {
          profilePic: user.profilePic,
          firstName: user.name.first,
          lastName: user.name.last,
          password: "",
          agency: user.agency,
          adminType: checkUserType(user),
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
      <div className="flex-column align-center padding-top">
        <div className="flex-row justify-between standard-view">
          <div>
            <div className="item-label">Global Admin</div>
            <div className="item-name">{t("NAVIGATION.ACCOUNT")}</div>
          </div>
        </div>
        <div className="flex-row justify-center standard-view white-bg box-shadow relative edit-user-form">
          {!isLoaded ? (
            <LoadingPanel />
          ) : (
            <Formik
              initialValues={initialValues}
              // onSubmit={this.saveUser}
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
                        value=""
                      />
                      <button
                        className="white-btn"
                        onClick={this.changePassword}
                      >
                        {t("BUTTONS.CHANGE_PASSWORD")}
                      </button>
                    </div>
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
                  </div>
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
            />
          )}
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

export default withTranslation("translation")(Profile);
