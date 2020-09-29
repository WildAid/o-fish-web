import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import history from "../../../root/root.history";
import { HOME_PAGE, LOGIN_PAGE } from "../../../root/root.constants";
import config from "../../../config";

import { Formik, Form } from "formik";
import { TextField } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

import AuthService from "./../../../services/auth.service";
import UserService from "./../../../services/user.service";

const authService = AuthService.getInstance();
const userService = UserService.getInstance();

class NewDevUser extends Component {
  state = {
    isSandbox: false,
    isValidPassword: false,
    error: "",
  };

  registerUser = (values) => {
    authService
      .authenticateAnonymous()
      .then(() => {
        userService
          .createUserAndAgency(
            values.firstName,
            values.lastName,
            values.email,
            values.agencyName,
            values.agencySite
          )
          .then((res) => {
            if (res.result === "error") {
              this.setState({ error: `${res.reason}` });
            } else {
              userService
                .createRealmUser(values.email, values.password)
                .then(() => {
                  authService
                    .authenticate(values.email, values.password)
                    .then(() => {
                      history.push(HOME_PAGE);
                    });
                })
                .catch((error) => {
                  this.setState({ error: "Could not create Realm user." });
                });
            }
          })
          .catch((error) => {
            this.setState({ error: "Could not create user/agency." });
          });
      })
      .catch((error) => {
        this.setState({ error: "Could not authenicate anonymously." });
      });
  };

  validatePassword(password) {
    this.setState({
      isValidPassword: password.length >= 6 && password.length <= 128,
    });
  }

  dismissError = () => {
    this.setState({
      error: "",
    });
  };

  clearForm = () => {
    history.push(LOGIN_PAGE);
  };

  componentDidMount() {
    if (config.sandbox) {
      this.setState({ isSandbox: true });
    }
  }

  render() {
    const { isSandbox, isValidPassword, error } = this.state;
    const { t } = this.props;

    const initialValues = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      agencyName: "",
      agencySite: "",
    };

    return isSandbox ? (
      <div className="flex-column align-center padding-top">
        <div className="flex-row justify-between standard-view">
          <div className="full-view">
            <div className="item-label">{t("CREATE_USER_PAGE.USER")}</div>
            <div className="item-name">Create New Development User/Agency</div>
            <div className="alert-banner">
              {error && (
                <Alert
                  icon={false}
                  severity="error"
                  onClose={this.dismissError}
                >
                  {error}
                </Alert>
              )}
            </div>
          </div>
        </div>

        <div className="flex-column align-center standard-view white-bg box-shadow relative user-editor-form">
          <Formik
            initialValues={initialValues}
            onSubmit={this.registerUser}
            validate={this.validate}
            render={({
              values,
              handleBlur,
              handleSubmit,
              setFieldValue,
            }) => (
              <Form
                onSubmit={handleSubmit}
                className="flex-column justify-center"
              >
                <div className="flex-row justify-between">
                  <TextField
                    label={t("CREATE_USER_PAGE.FIRST_NAME")}
                    name="firstName"
                    className="form-input"
                    onBlur={handleBlur}
                    onChange={(e) => setFieldValue("firstName", e.target.value)}
                    value={values.firstName}
                    required
                  />
                  <TextField
                    label={t("CREATE_USER_PAGE.LAST_NAME")}
                    name="lastName"
                    className="form-input"
                    onBlur={handleBlur}
                    onChange={(e) => setFieldValue("lastName", e.target.value)}
                    value={values.lastName}
                    required
                  />
                </div>
                <div className="flex-column">
                  <TextField
                    label={t("CREATE_AGENCY_PAGE.EMAIL")}
                    name="email"
                    className="form-input"
                    onBlur={handleBlur}
                    onChange={(e) => setFieldValue("email", e.target.value)}
                    value={values.email}
                    required
                  />
                  <TextField
                    label={t("LOGIN_PAGE.PASSWORD")}
                    name="password"
                    className="form-input"
                    type="password"
                    onBlur={handleBlur}
                    onChange={(e) => {
                      setFieldValue("password", e.target.value);
                      this.validatePassword(e.target.value);
                    }}
                    value={values.password}
                    required
                    error={Boolean(values.password.length && !isValidPassword)}
                    helperText="Passwords must be between 6 and 128 characters long."
                  />
                  <TextField
                    label={t("AGENCY_PAGE.EDIT_AGENCY.NAME")}
                    name="agencyName"
                    className="form-input"
                    onBlur={handleBlur}
                    onChange={(e) =>
                      setFieldValue("agencyName", e.target.value)
                    }
                    value={values.agencyName}
                    required
                  />
                  <TextField
                    label={t("AGENCY_PAGE.EDIT_AGENCY.SITE")}
                    name="agencySite"
                    className="form-input"
                    onBlur={handleBlur}
                    onChange={(e) =>
                      setFieldValue("agencySite", e.target.value)
                    }
                    value={values.agencySite}
                    required
                  />
                </div>
                <div className="flex-row justify-around align-center margin-top">
                  <button
                    className={!isValidPassword ? "disabled-btn" : "blue-btn"}
                    type="submit"
                    disabled={!isValidPassword}
                  >
                    {t("BUTTONS.CREATE_USER")}
                  </button>
                  <div className="blue-color pointer" onClick={this.clearForm}>
                    {t("BUTTONS.CANCEL")}
                  </div>
                </div>
              </Form>
            )}
          ></Formik>
        </div>
      </div>
    ) : (
      <div className="flex-row padding-top justify-center">
        {t("WARNINGS.NOT_UNAUTHORIZED")}
      </div>
    );
  }
}

export default withTranslation("translation")(NewDevUser);
