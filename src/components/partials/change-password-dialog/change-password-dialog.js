import React, { Component } from "react";
import { Formik, Form } from "formik";
import { withTranslation } from "react-i18next";
import { TextField } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";

import "./change-password-dialog.css";

class ChangePasswordDialog extends Component {
  state = {
    items: [""],
  };

  applyDialog = () => {
    if (this.props.onApply) {
      this.props.onApply(this.state.items);
    }
  };

  cancelDialog = () => {
    if (this.props.onApply) {
      this.props.onApply();
    }
  };

  render() {
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
        <DialogContent className="internal">
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
                    onChange={(e) =>
                      setFieldValue("newPassword", e.target.value)
                    }
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
                    onChange={(e) =>
                      setFieldValue("confirmNewPassword", e.target.value)
                    }
                    value={values.confirmNewPassword}
                  />
                </div>
              </Form>
            )}
          />
        </DialogContent>
        <DialogActions className="action-btns">
          <button className="blue-btn" onClick={this.applyDialog}>
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
