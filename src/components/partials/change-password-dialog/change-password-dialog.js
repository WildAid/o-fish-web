import React, { Component, Fragment } from "react";
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
    validations: {
      containsNumber: false,
      containsUpper: false,
      containsLower: false,
      atLeastLength: false,
      passwordsMatch: true,
    },
    isValid: false,
  };

  applyDialog = (values) => {
    if (this.props.onApply) {
      this.props.onApply(values);
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
    newValidations.passwordsMatch = Boolean(
      confirmPassword.length && password == confirmPassword
    );
    this.setState({ validations: newValidations });

    let valid = true;
    for (const v in this.state.validations) {
      if (!this.state.validations[v]) {
        valid = false;
      }
    }
    this.setState({ isValid: valid });
  }

  render() {
    const { validations, isValid } = this.state;
    const { t } = this.props;
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
          <b>{t("CHANGE_PASSWORD.CHANGE_PASSWORD")}</b>
        </DialogTitle>

        <Formik
          initialValues={{
            oldPassword: "",
            newPassword: "",
            confirmNewPassword: "",
          }}
          onSubmit={this.applyDialog}
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
              <DialogContent className="content">
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
                    error={
                      values.confirmNewPassword && !validations.passwordsMatch
                    }
                    helperText={
                      values.confirmNewPassword && !validations.passwordsMatch
                        ? t("CHANGE_PASSWORD.CONFIRM_PASSWORD_ERROR")
                        : ""
                    }
                  />
                </div>
                <div>
                  <div className="flex-row validation">
                    {validations.containsNumber && (
                      <DoneIcon fontSize="small" className="done-icon" />
                    )}
                    <Typography>{t("CHANGE_PASSWORD.CONTAINS_NUMBER")}</Typography>
                  </div>
                  <div className="flex-row validation">
                    {validations.containsUpper && (
                      <DoneIcon fontSize="small" className="done-icon" />
                    )}
                    <Typography>{t("CHANGE_PASSWORD.CONTAINS_UPPER")}</Typography>
                  </div>
                  <div className="flex-row validation">
                    {validations.containsLower && (
                      <DoneIcon fontSize="small" className="done-icon" />
                    )}
                    <Typography>{t("CHANGE_PASSWORD.CONTAINS_LOWER")}</Typography>
                  </div>
                  <div className="flex-row validation">
                    {validations.atLeastLength && (
                      <DoneIcon fontSize="small" className="done-icon" />
                    )}
                    <Typography>{t("CHANGE_PASSWORD.AT_LEAST_SIX_CHARS")}</Typography>
                  </div>
                </div>
              </DialogContent>
              <DialogActions className="action-btns">
                <button className="blue-btn" type="submit" disabled={!isValid}>
                  {`${t("BUTTONS.CHANGE_PASSWORD")}`}
                </button>
                <button className="simple-btn" onClick={this.cancelDialog}>
                  {`${t("BUTTONS.CANCEL")}`}
                </button>
              </DialogActions>
            </Form>
          )}
        />
      </Dialog>
    );
  }
}

export default withTranslation("translation")(ChangePasswordDialog);
