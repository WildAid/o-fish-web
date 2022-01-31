import React, { Component } from "react";
import { Formik, Form } from "formik";
import { TextField } from "@material-ui/core";
import { withTranslation } from "react-i18next";
import withRouter from '../../../helpers/withRouter';

import history from "../../../root/root.history";

import AgencyService from "./../../../services/agency.service";
import AuthService from "./../../../services/auth.service";

import "./new-agency.css";

const agencyService = AgencyService.getInstance();
const authService = AuthService.getInstance();

class NewAgency extends Component {
  state = {
    newAgency: {
      name: "",
      description: "",
      isAdmin: false,
    },
  };

  saveAgency = (values) => {
    let newAgency = {
      email: values.email,
      site: values.site,
      name: values.name,
      description: values.description,
      active: true,
    };

    agencyService
      .createAgency(newAgency)
      .then(() => history.push("/agencies"))
      .catch((error) => {
        error.message
          ? this.setState({ error: `${error.name}: ${error.message}` })
          : this.setState({ error: "An expected error occurred!" });
      });
  };

  componentDidMount() {
    if (authService.user.global.admin) {
      this.setState({ isAdmin: true });
    }
  }

  render() {
    const { t } = this.props;
    const { isAdmin } = this.state;

    return isAdmin ? (
      <div className="flex-column align-center padding-top">
        <div className="flex-row justify-between standard-view">
          <div>
            <div className="item-label">{t("TABLE.AGENCY")}</div>
            <div className="item-name">
              {t("CREATE_AGENCY_PAGE.NEW_AGENCY")}
            </div>
          </div>
        </div>
        <div className="flex-row standard-view white-bg box-shadow relative new-agency-form">
          <Formik
            initialValues={{ name: "", description: "", site: "", email: "" }}
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
                <div className="flex-column new-agency-box">
                  <TextField
                    label={t("TABLE.NAME")}
                    name="name"
                    className="form-input"
                    onBlur={handleBlur}
                    onChange={(e) => setFieldValue("name", e.target.value)}
                    type="text"
                    value={values.name}
                  />
                  <TextField
                    label={t("TABLE.DESCRIPTION")}
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
                    label={t("CREATE_AGENCY_PAGE.EMAIL")}
                    name="email"
                    type="text"
                    className="form-input"
                    onBlur={handleBlur}
                    onChange={(e) => setFieldValue("email", e.target.value)}
                    value={values.email}
                  />
                  <TextField
                    label={t("CREATE_AGENCY_PAGE.SITE")}
                    name="site"
                    type="text"
                    className="form-input"
                    onBlur={handleBlur}
                    onChange={(e) => setFieldValue("site", e.target.value)}
                    value={values.site}
                  />
                </div>
                <button
                  className="blue-btn absolute"
                  type="submit"
                  onClick={this.saveAgency}
                >
                  {t("BUTTONS.SAVE")}
                </button>
                <button
                  className="white-btn absolute"
                  type="button"
                  onClick={() => this.props.router.navigate("../")}
                >
                  {t("BUTTONS.CANCEL")}
                </button>
              </Form>
            )}
          />
        </div>
      </div>
    ) : (
      <div className="flex-row padding-top justify-center">
        {t("WARNINGS.NOT_AUTHORIZED")}
      </div>
    );
  }
}

export default withRouter(withTranslation("translation")(NewAgency));
