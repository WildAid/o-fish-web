import React, { Component } from "react";
import { Formik, Form } from "formik";
import { withTranslation } from "react-i18next";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@material-ui/core";

import DoneIcon from "@material-ui/icons/Done";

import "./change-password-dialog.css";

class ChangePasswordDialog extends Component {
  state = {
    items: [""],
    validations: {
      containsNumber: false,
      containsUpper: false,
      containsLower: false,
      atLeastLength: false,
      passwordsMatch: false,
    },
    isValid: false,
  };

  applyDialog = () => {
    console.log("submit")
    if (this.props.onApply) {
      this.props.onApply(this.state.items);
    }
  };

  cancelDialog = () => {
    if (this.props.onApply) {
      this.props.onApply();
    }
  };

  validate(password, confirmPassword) {
    let newValidations = this.state.validations;
    newValidations.containsNumber = /\d/.test(password);
    newValidations.containsUpper = /[A-Z]/.test(password);
    newValidations.containsLower = /[a-z]/.test(password);
    newValidations.atLeastLength = password.length >= 6;
    newValidations.passwordsMatch =
      confirmPassword.length && password != confirmPassword;
    this.setState({ validations: newValidations });

    let valid = true;
    for (const v in this.state.validations) {
      if (!this.state.validations[v]) {
        valid = false;
      }
    }
    this.setState({ isValid: valid })
  }

  render() {
    const { items, validations } = this.state;
    const { user, t } = this.props;
    return (
      <Dialog
        open
        onClose={this.applyDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
        maxWidth="sm"
      >
        <DialogTitle className="title">
          <Typography variant="h6">
            <b>{t("CHANGE_PASSWORD.CHANGE_PASSWORD")}</b>
          </Typography>
        </DialogTitle>
        <DialogContent className="content">
          <Formik
            initialValues={{
              oldPassword: "",
              newPassword: "",
              confirmNewPassword: "",
            }}
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
              <Form onSubmit={handleSubmit}>
                <div className="form-field">
                  <TextField
                    className="form-input"
                    label={t("CHANGE_PASSWORD.OLD_PASSWORD")}
                    name="oldPassword"
                    type="password"
                    onBlur={handleBlur}
                    onChange={(e) =>
                      setFieldValue("oldPassword", e.target.value)
                    }
                    value={values.oldPassword}
                  />
                </div>
                <div className="form-field">
                  <TextField
                    className="form-input"
                    label={`${t("CHANGE_PASSWORD.NEW_PASSWORD")}`}
                    name="newPassword"
                    type="password"
                    onBlur={handleBlur}
                    onChange={(e) => {
                      setFieldValue("newPassword", e.target.value);
                      this.validate(e.target.value, values.confirmNewPassword);
                    }}
                    value={values.newPassword}
                  />
                </div>
                <div className="form-field">
                  <TextField
                    className="form-input"
                    label={`${t("CHANGE_PASSWORD.CONFIRM_NEW_PASSWORD")}`}
                    name="confirmNewPassword"
                    type="password"
                    onBlur={handleBlur}
                    onChange={(e) => {
                      setFieldValue("confirmNewPassword", e.target.value);
                      this.validate(values.newPassword, e.target.value);
                    }}
                    value={values.confirmNewPassword}
                    error={validations.passwordsMatch}
                    helperText={validations.passwordsMatch ? "Passwords don't match." : ""}
                  />
                </div>
              </Form>
            )}
          />
          <div>
            <div className="flex-row">
              {validations.containsNumber && (
                <DoneIcon fontSize="small" className="done-icon" />
              )}
              <Typography>Must contain one number (0-9)</Typography>
            </div>
            <div className="flex-row">
              {validations.containsUpper && (
                <DoneIcon fontSize="small" className="done-icon" />
              )}
              <Typography>Must contain one upper case letter (A-Z)</Typography>
            </div>
            <div className="flex-row">
              {validations.containsLower && (
                <DoneIcon fontSize="small" className="done-icon" />
              )}
              <Typography>Must contain one lower case letter (a-z)</Typography>
            </div>
            <div className="flex-row">
              {validations.atLeastLength && (
                <DoneIcon fontSize="small" className="done-icon" />
              )}
              <Typography>Minimum length of 6 characters</Typography>
            </div>
          </div>
        </DialogContent>
        <DialogActions className="action-btns">
          <button
            className="blue-btn"
            onClick={this.applyDialog}
          >
            {`${t("BUTTONS.CHANGE_PASSWORD")}`}
          </button>
          <button className="simple-btn" onClick={this.cancelDialog}>
            {`${t("BUTTONS.CANCEL")}`}
          </button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withTranslation("translation")(ChangePasswordDialog);
