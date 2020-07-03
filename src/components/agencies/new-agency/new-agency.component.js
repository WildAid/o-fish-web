import React, { Component } from "react";
import { Formik, Form } from "formik";
import { TextField } from "@material-ui/core";

import AgencyService from "./../../../services/agency.service";

import "./new-agency.css";

const agencyService = AgencyService.getInstance();

class NewAgency extends Component {
  state = {
    newAgency: {
      name: "",
      description: "",
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
      .then(() => window.location.href = "/agencies")
      .catch((error) => {
        error.message ?
        this.setState({ error: `${error.name}: ${error.message}` }) : this.setState({ error: 'An expected error occurred!' })
      });
  };

  render() {
    return (
      <div className="flex-column align-center padding-top">
        <div className="flex-row justify-between standard-view">
          <div>
            <div className="item-label">Agency</div>
            <div className="item-name">New Agency</div>
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
                    label="Name"
                    name="name"
                    className="form-input"
                    onBlur={handleBlur}
                    onChange={(e) => setFieldValue("name", e.target.value)}
                    type="text"
                    value={values.name}
                  />
                  <TextField
                    label="Description"
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
                    label="E-mail"
                    name="email"
                    type="text"
                    className="form-input"
                    onBlur={handleBlur}
                    onChange={(e) =>
                      setFieldValue("email", e.target.value)
                    }
                    value={values.email}
                  />
                  <TextField
                    label="Site"
                    name="site"
                    type="text"
                    className="form-input"
                    onBlur={handleBlur}
                    onChange={(e) =>
                      setFieldValue("site", e.target.value)
                    }
                    value={values.site}
                  />
                </div>
                <button
                  className="blue-btn absolute"
                  type="submit"
                  onClick={this.saveAgency}
                >
                  Save
                </button>
                <button
                  className="white-btn absolute"
                  type="submit"
                  // onClick={this.clearForm}
                >
                  Cancel
                </button>
              </Form>
            )}
          />
        </div>
      </div>
    );
  }
}

export default NewAgency;
