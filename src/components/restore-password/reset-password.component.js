import React, { Component } from "react";
import { Formik, Form } from "formik";
import { withTranslation } from "react-i18next";
import { TextField } from "@material-ui/core";
import { NavLink } from "react-router-dom";

import history from "../../root/root.history";

import AuthService from "../../services/auth.service";
import UserService from "../../services/user.service";

import "./restore-password.component.css";

import { LOGIN_PAGE } from "../../root/root.constants";

const authService = AuthService.getInstance();
const userService = UserService.getInstance();

class ResetPassword extends Component {
  state = {
    error: null,
    loading: false,
  };

  handleLogin = (values) => {
    this.setState({
      loading: true,
    });
    const url = window.location.hash.slice(window.location.hash.indexOf('?'));
    const params = new URLSearchParams(url);

    const token = params.get("token");
    const tokenId = params.get("tokenId");
    const newPassword = values.password;

    userService
      .resetPassword(token, tokenId, newPassword)
      .then(() => {
        this.setState({
          loading: false,
        });
        history.push(LOGIN_PAGE);
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
                  <strong>Please enter your new password.</strong>
                  <TextField
                    label="New Password"
                    name="password"
                    onBlur={handleBlur}
                    onChange={(e) => setFieldValue("password", e.target.value)}
                    type="password"
                    value={values.password}
                  />
                  <TextField
                    label="Confirm new password"
                    name="confirm-password"
                    onBlur={handleBlur}
                    onChange={(e) =>
                      setFieldValue("confirmPassword", e.target.value)
                    }
                    type="password"
                    value={values.confirmPassword}
                  />
                  <div className="flex-row align-center justify-center btn-box">
                    {loading ? (
                      <div>{t("LOADING.LOGGIN_IN")}</div>
                    ) : (
                      <button className="blue-btn" type="submit">
                        Change password
                      </button>
                    )}
                  </div>
                </Form>
              )}
            />
            {error && <div className="error-messages">{error}</div>}
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation("translation")(ResetPassword);
