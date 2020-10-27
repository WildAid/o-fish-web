import React, { Component } from "react";
import { Formik, Form } from "formik";
import { withTranslation } from "react-i18next";
import { TextField, Box } from "@material-ui/core";

import UserService from "../../services/user.service";

import "./restore-password.component.css";

const userService = UserService.getInstance();

class RestorePassword extends Component {
  state = {
    error: null,
    loading: false,
    success: false,
  };

  handleReset = (values) => {
    this.setState({
      loading: true,
    });
    userService
      .resetPasswordEmail(values.login).then(()=>{
        this.setState({
          loading: false,
          success: true,
        });
      })
      .catch((error) => {
        this.setState({
          error: error.message,
          loading: false,
        });
      });
  };

  render() {
    const { error, loading, success } = this.state;
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
              initialValues={{ login: "" }}
              onSubmit={this.handleReset}
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
                  <Box fontWeight="fontWeightBold">
                    Enter your user account's email address and we will send you a password reset link.
                  </Box>
                  <TextField
                    label="Email"
                    name="login"
                    onBlur={handleBlur}
                    onChange={(e) => setFieldValue("login", e.target.value)}
                    type="text"
                    value={values.login}
                  />
                  <div className="flex-row align-center justify-center btn-box">
                    {success ? (
                      <div>A password reset link has been sent to your email.</div>
                    ) : loading ? (
                      <div>Sending password reset email...</div>
                    ) : (
                      <button className="blue-btn" type="submit">
                        Send password reset email
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

export default withTranslation("translation")(RestorePassword);
