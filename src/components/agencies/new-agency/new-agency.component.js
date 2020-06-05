import React, { Component } from "react";
import { Formik, Form } from "formik";
import { TextField } from "@material-ui/core";

import "./new-agency.css";

class NewAgency extends Component {
  state = {
    newAgency: {
      name: "",
      description: "",
    },
  };

  saveAgency = (values) => {
    //TO DO - add request and get data to render
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
            initialValues={{ name: "", description: "" }}
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
