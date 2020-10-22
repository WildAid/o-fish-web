import React, { Component } from "react";
import { Formik, Form } from "formik";
import { withTranslation } from "react-i18next";
import { TextField } from "@material-ui/core";
import { NavLink } from "react-router-dom";

import AuthService from "../../services/auth.service";

import history from "../../root/root.history";

import { RESTORE_PASSWORD_PAGE } from "../../root/root.constants.js";

import "./login.css";

import {
  HOME_PAGE,
  GLOBAL_AGENCIES_PAGE,
  CHARTS_PAGE,
} from "../../root/root.constants";

const authService = AuthService.getInstance();

class Login extends Component {
  state = {
    error: null,
    loading: false,
  };

  handleLogin = (values) => {
    this.setState({
      loading: true,
    });
    authService
      .authenticate(values.login, values.password)
      .then(() => {
        this.setState({
          loading: false,
        });
        authService.userRole === "global"
          ? history.push(GLOBAL_AGENCIES_PAGE)
          : authService.userRole === "agency"
          ? history.push(
              CHARTS_PAGE.replace(":id", authService.user.agency.name)
            )
          : history.push(HOME_PAGE);
      })
      .catch((error) => {
        this.setState({
          error: error.message,
          loading: false,
        });
      });
  };

  render() {
    const { error, loading } = this.state;
    const { t } = this.props;

    return (
      <div className="flex-row justify-center align-center login-box">
        <div className="white-bg box-shadow login">
          <div className="flex-column justify-center align-center">
            <div className="login-logo-img">
              <img
                className="full-view"
                src={require("../../assets/login-logo.png")}
                alt="no logo"
              />
            </div>
            <Formik
              initialValues={{ login: "", password: "" }}
              onSubmit={this.handleLogin}
              render={({
                touched,
                errors,
                values,
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue,
              }) => (
                <Form
                  className="flex-column justify-around login-form"
                  onSubmit={handleSubmit}
                >
                  <TextField
                    label={t("LOGIN_PAGE.EMAIL_USERNAME")}
                    name="login"
                    onBlur={handleBlur}
                    onChange={(e) => setFieldValue("login", e.target.value)}
                    type="text"
                    value={values.login}
                  />
                  <TextField
                    label={`${t("LOGIN_PAGE.PASSWORD")}:`}
                    name="password"
                    type="password"
                    onBlur={handleBlur}
                    onChange={(e) => setFieldValue("password", e.target.value)}
                    value={values.password}
                  />
                  <div className="flex-row align-center justify-center btn-box">
                    {loading ? (
                      <div>{t("LOADING.LOGGING_IN")}</div>
                    ) : (
                      <button className="blue-btn" type="submit">
                        {t("LOGIN_PAGE.LOGIN")}
                      </button>
                    )}
                  </div>
                </Form>
              )}
            />
            <NavLink
              className="forgot-password-link"
              to={RESTORE_PASSWORD_PAGE}
            >
              {t("LOGIN_PAGE.FORGOT_PASSWORD")}
            </NavLink>
            {error && <div className="error-messages">{error}</div>}
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation("translation")(Login);
