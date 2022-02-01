import React, { Component, Fragment } from "react";
import { Formik, Form } from "formik";
import { TextField } from "@material-ui/core";
import { withTranslation } from "react-i18next";
import history from "../../../root/root.history";
import AgencyService from "./../../../services/agency.service";

import IOSSwitch from "../../partials/ios-switch/ios-switch";

import "./edit-agency.css";
import withRouter from "../../../helpers/withRouter";

const agencyService = AgencyService.getInstance();

class EditAgency extends Component {
  state = {
    agencyInfo: {},
    loading: false,
  };

  saveAgency = (values) => {
    const { agencyInfo } = this.state;
    let newAgency = {
      active: values.active,
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
    const { id } = this.props.router.params;

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
        active: agencyInfo.active,
        name: agencyInfo.name,
        description: agencyInfo.description,
        site: agencyInfo.site,
        email: agencyInfo.email,
      }
      : {
        active: false,
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
                      <div className="active-line flex-row justify-between">
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
                          InputProps={{ readOnly: true }}
                        />
                        <IOSSwitch
                          checked={values.active}
                          name="active"
                          className="active-switch"
                          onChange={(e) =>
                            setFieldValue("active", e.target.checked)
                          }
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
                        required
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
                        required
                      />
                      <TextField
                        label={t("AGENCY_PAGE.EDIT_AGENCY.SITE")}
                        name="site"
                        type="text"
                        className="form-input"
                        onBlur={handleBlur}
                        onChange={(e) => setFieldValue("site", e.target.value)}
                        value={values.site}
                        required
                      />
                      <TextField
                        label={t("AGENCY_PAGE.EDIT_AGENCY.EMAIL")}
                        name="email"
                        type="text"
                        className="form-input"
                        onBlur={handleBlur}
                        onChange={(e) => setFieldValue("email", e.target.value)}
                        value={values.email}
                        required
                      />
                    </div>
                    <div className="flex-row justify-center align-center margin-top">
                      <button
                        className="blue-btn"
                        type="submit"
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

export default withRouter(withTranslation("translation")(EditAgency));
