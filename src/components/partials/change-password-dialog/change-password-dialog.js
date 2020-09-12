import React, { Component } from "react";
import { Formik, Form } from "formik";
import { withTranslation } from "react-i18next";
import { TextField } from "@material-ui/core";

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

  addItem = () => {
    let newItems = [];
    newItems.push("");
    this.setState({ items: newItems });
  };

  changeItem = (event, ind) => {
    let newItems = [...this.state.items];

    newItems[ind] = event.target.value;
    this.setState({ items: newItems });
  };

  render() {
    const { items } = this.state;
    const { user, t } = this.props;
    return (
      <div className="new-menu-dialog full-screen">
        <div className="internal flex-column">
          <div className="title flex-row full-view">
            <h2>{t("CHANGE_PASSWORD.CHANGE_PASSWORD")}</h2>
          </div>
          <div className="content justify-center full-view">
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
                <Form
                  onSubmit={handleSubmit}
                >
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
                </Form>
              )}
            />
          </div>

          <div className="buttons-row flex-row full-view">
            <button className="blue-btn" onClick={this.applyDialog}>{`${t(
              "BUTTONS.CHANGE_PASSWORD"
            )}`}</button>
            <button className="simple-btn" onClick={this.cancelDialog}>{`${t(
              "BUTTONS.CANCEL"
            )}`}</button>
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation("translation")(ChangePasswordDialog);
