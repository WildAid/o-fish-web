import React, { Component } from "react";
import { Formik, Form } from "formik";
import { TextField } from "@material-ui/core";
import { withRouter } from "react-router";
import { NavLink } from "react-router-dom";

import AuthService from "../../services/auth.service";

import history from "../../root/root.history";

import { RESTORE_PASSWORD_PAGE } from "../../root/root.constants.js";

import "./login.css";

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
        history.replace("/home");
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
                    label="Email/Username:"
                    name="login"
                    // className="form-input"
                    onBlur={handleBlur}
                    onChange={(e) => setFieldValue("login", e.target.value)}
                    type="text"
                    value={values.login}
                  />
                  <TextField
                    label="Password:"
                    name="password"
                    type="password"
                    // className="form-input"
                    onBlur={handleBlur}
                    onChange={(e) => setFieldValue("password", e.target.value)}
                    value={values.password}
                  />
                  <div className="flex-row align-center justify-center btn-box">
                    {loading ? (
                      <div>Logging in...</div>
                    ) : (
                      <button className="blue-btn" type="submit">
                        Log in
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
              Forgot password?
            </NavLink>
            {error && <div className="error-messages">{error}</div>}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
