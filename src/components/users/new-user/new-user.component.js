import React, { Component, Fragment } from "react";
import { Formik, Form } from "formik";
import moment from "moment";
import { TextField } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import PhotoUploader from "./../../partials/photo-uploader/photo-uploader.component";
import { withTranslation } from "react-i18next";

import history from "../../../root/root.history";

import StitchService from "./../../../services/stitch.service";
import UserService from "./../../../services/user.service";
import AgencyService from "./../../../services/agency.service";

import "./new-user.css";

const stitchService = StitchService.getInstance();
const userService = UserService.getInstance();
const agencyService = AgencyService.getInstance();

class NewUser extends Component {
  state = {
    error: null,
    agencyIsShown: false,
    agencies: [],
    imgData: null,
    imageId: null,
  };

  removeErrMsg = () => {
    this.setState({ error: null });
  };

  imageUploaded = (data) => {
    this.setState({ imgData: data });
    stitchService.uploadImage(data, "Ecuadorian Galapagos").then((result) => {
      //TODO: Remove this log after test real data
      console.log(result.insertedId.toString());

      this.setState({ imageId: result.insertedId.toString() });
    });
  };

  saveUser = (values) => {
    let newUser = {
      email: values.email,
      name: {
        first: values.firstName,
        last: values.lastName,
      },
      active: true,
      createdOn: moment().toDate(),
      profilePic: this.state.imageId ? this.state.imageId : "",
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

    userService
      .createUser(values.firstName + values.lastName, newUser)
      .then(() => history.push("/users"))
      .catch((error) => {
        error.message
          ? this.setState({ error: `${error.name}: ${error.message}` })
          : this.setState({ error: "An expected error occurred!" });
      });
  };

  componentDidMount() {
    agencyService
      .getAgencies(50, 0, "", null)
      .then((data) => {
        this.setState({
          agencies: data.agencies.map((agency) => agency.name) || [],
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    const { error, agencyIsShown, agencies } = this.state;
    const { t } = this.props;

    return (
      <div className="flex-column align-center padding-top">
        <div className="flex-row justify-between standard-view">
          <div>
            <div className="item-label">{t("CREATE_USER_PAGE.USER")}</div>
            <div className="item-name">{t("CREATE_USER_PAGE.NEW_USER")}</div>
          </div>
        </div>
        <div className="flex-row justify-center standard-view white-bg box-shadow relative new-user-form">
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              agency: "",
              adminType: "",
              email: "",
              userGrop: "",
            }}
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
                  <PhotoUploader onData={this.imageUploaded}></PhotoUploader>
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
                    onChange={(e) => setFieldValue("email", e.target.value)}
                    value={values.email}
                  />
                  <FormControl className="form-input">
                    <InputLabel id="role-label">
                      {t("CREATE_USER_PAGE.ROLE")}
                    </InputLabel>
                    <Select
                      labelId="role-label"
                      onChange={(e) =>
                        setFieldValue("adminType", e.target.value)
                      }
                      onClick={() => this.setState({ agencyIsShown: true })}
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
                  {agencyIsShown && (
                    <Fragment>
                      <FormControl className="form-input">
                        <InputLabel id="agency-label">
                          {t("TABLE.AGENCY")}
                        </InputLabel>
                        <Select
                          labelId="agency-label"
                          onChange={(e) =>
                            setFieldValue("agency", e.target.value)
                          }
                          onClick={() => this.setState({ agencyIsShown: true })}
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
                            setFieldValue("userGrop", e.target.value)
                          }
                          onClick={() => this.setState({ agencyIsShown: true })}
                          value={values.userGrop}
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
                    {t("BUTTONS.CREATE_USER")}
                  </button>
                  <div
                    className="blue-color pointer"
                    // onClick={this.clearForm}
                  >
                    {t("BUTTONS.CANCEL")}
                  </div>
                </div>
              </Form>
            )}
          />
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

export default withTranslation("translation")(NewUser);
