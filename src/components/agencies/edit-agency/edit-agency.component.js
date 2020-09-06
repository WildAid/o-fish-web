import React, { Component, Fragment } from "react";
import { Formik, Form } from "formik";
import { TextField } from "@material-ui/core";
import { withTranslation } from "react-i18next";
import history from "../../../root/root.history";
import AgencyService from "./../../../services/agency.service";
import Switch from "@material-ui/core/Switch";

import "./edit-agency.css";

const agencyService = AgencyService.getInstance();

class EditAgency extends Component {
  state = {
    agencyInfo: {},
    loading: false,
  };

  saveAgency = (values) => {
    const { agencyInfo, loading } = this.state;
    let newAgency = {
      active: true,
      name: values.name,
      description: values.description,
      site: values.site,
      email: values.email,
    };

    agencyService
      .updateAgency(agencyInfo._id, newAgency)
      .then(() => this.goRedirect())
      .catch((error) => {
        error.message
        ? this.setState({ error: `${error.name}: ${error.message}` })
        : this.setState({ error: "An unexpected error occurred!" });
      });
  };

  goRedirect() {
    history.goBack();
  }

  clearForm = () => {
    this.goRedirect();
  };

  componentDidMount() {
    const { id } = this.props.match.params;

    this.setState({ loading: true }, () => {
      agencyService
        .getAgency(id)
        .then((data) => {
          const agencyInfo = { ...data, ...this.state.agencyInfo };

          this.setState({
            agencyInfo,
            loading: false,
          });
        })
        .catch((error) => {
          console.error(error);
        });
    });
  }

  render() {
    const { agencyInfo, loading } = this.state;
    const { t } = this.props;

    const initialValues = !loading
      ? {
          active: true,
          name: agencyInfo.name,
          description: agencyInfo.description,
          site: agencyInfo.site,
          email: agencyInfo.email,
        }
      : {
          active: true,
          name: "",
          description: "",
          site: "",
          email: "",
        };

    return (
      <div className="flex-column align-center padding-top">
        {loading ? (
          t("LOADING.LOADING")
        ) : (
          <Fragment>
            <div className="flex-row justify-between standard-view">
              <div>
                <div className="item-label">{t("TABLE.AGENCY")}</div>
                <div className="item-name">{agencyInfo.name}</div>
              </div>
            </div>
            <div className="flex-column justify-center align-center standard-view white-bg box-shadow relative edit-agency-form">
              <Formik
                initialValues={initialValues}
                onSubmit={this.saveAgency}
                render={({
                  errors,
                  values,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  setFieldValue,
                }) => (
                  <Form onSubmit={handleSubmit}>
                    <div className="flex-column edit-agency-box">
                      <div className="status-line flex-row justify-between">
                        <TextField
                          label={t("AGENCY_PAGE.EDIT_AGENCY.STATUS")}
                          name="active"
                          className="form-input"
                          onBlur={handleBlur}
                          type="text"
                          value={
                            values.active
                              ? t("AGENCY_PAGE.EDIT_AGENCY.ACTIVE")
                              : t("AGENCY_PAGE.EDIT_AGENCY.INACTIVE")
                          }
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                        <Switch
                          checked={values.active}
                          onChange={(e) =>
                            setFieldValue("active", e.target.checked)
                          }
                          color="default"
                          name="active"
                          className="status-switch"
                          inputProps={{ "aria-label": "primary checkbox" }}
                        />
                      </div>
                      <TextField
                        label={t("AGENCY_PAGE.EDIT_AGENCY.NAME")}
                        name="name"
                        className="form-input"
                        onBlur={handleBlur}
                        onChange={(e) => setFieldValue("name", e.target.value)}
                        type="text"
                        value={values.name}
                      />
                      <TextField
                        label={t("AGENCY_PAGE.EDIT_AGENCY.DESCRIPTION")}
                        name="description"
                        type="text"
                        className="form-input"
                        onBlur={handleBlur}
                        onChange={(e) =>
                          setFieldValue("description", e.target.value)
                        }
                        value={values.description}
                      />
                      <TextField
                        label={t("AGENCY_PAGE.EDIT_AGENCY.SITE")}
                        name="email"
                        type="text"
                        className="form-input"
                        onBlur={handleBlur}
                        onChange={(e) =>
                          setFieldValue("website", e.target.value)
                        }
                        value={values.site}
                      />
                      <TextField
                        label={t("AGENCY_PAGE.EDIT_AGENCY.EMAIL")}
                        name="site"
                        type="text"
                        className="form-input"
                        onBlur={handleBlur}
                        onChange={(e) => setFieldValue("email", e.target.value)}
                        value={values.email}
                      />
                    </div>
                    <div className="flex-row justify-around align-center margin-top">
                      <button
                        className="blue-btn"
                        type="submit"
                        onClick={this.saveAgency}
                      >
                        {t("BUTTONS.SAVE")}
                      </button>
                      <div
                        className="blue-color pointer"
                        onClick={this.clearForm}
                      >
                        {t("BUTTONS.CANCEL")}
                      </div>
                    </div>
                  </Form>
                )}
              />
            </div>
          </Fragment>
        )}
      </div>
    );
  }
}

export default withTranslation("translation")(EditAgency);
