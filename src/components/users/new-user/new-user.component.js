import React, { Component } from "react";
import { Formik, Form } from "formik";
import { TextField } from "@material-ui/core";
import moment from "moment";

import "./new-user.css";

const USER_TYPE_OPTIONS = ["Global Admin", "Agency Admin", "Field Officer"];

class NewUser extends Component {
  state = {
    selectedValue: "User Type",
    showOptionsList: false,
  };

  saveUser = (values) => {
    //For creating New User
    let newUser = {
      realmUserID: "",
      email: values.email,
      password: values.password,
      name: values.name,
      active: true,
      createdAt: moment(),
    };

    if (values.adminType === "Global Admin") {
      newUser = {
        ...newUser,
        global: { admin: true },
        agency: { name: values.agency },
      };
    } else if (values.adminType === "Agency Admin") {
      newUser = { ...newUser, agency: { name: values.agency, admin: true } };
    } else {
      newUser = { ...newUser, agency: { name: values.agency } };
    }
    //Needs to be finished
  };

  render() {
    return (
      <div className="flex-column align-center padding-top">
        <div className="flex-row justify-between standard-view">
          <div>
            <div className="item-label">User</div>
            <div className="item-name">New User</div>
          </div>
        </div>
        <div className="flex-row standard-view white-bg box-shadow relative new-user-form">
          <Formik
            initialValues={{
              name: "",
              agency: "",
              adminType: "",
              email: "",
              password: "",
            }}
            onSubmit={this.saveUser}
            render={({
              errors,
              values,
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
            }) => (
              <Form onSubmit={handleSubmit} className="flex-row relative">
                <div className="flex-column new-user-box">
                  <div className="add-img">
                    <img
                      className="icon"
                      src={require("../../../assets/download-img-icon.jpg")}
                      alt="no logo"
                    />
                  </div>
                </div>
                <div className="flex-column new-user-box">
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
                    label="Agency"
                    name="agency"
                    type="text"
                    className="form-input"
                    onBlur={handleBlur}
                    onChange={(e) => setFieldValue("agency", e.target.value)}
                    value={values.agency}
                  />
                  <TextField
                    label="Admin Type"
                    name="adminType"
                    type="text"
                    className="form-input"
                    onBlur={handleBlur}
                    onChange={(e) => setFieldValue("adminType", e.target.value)}
                    value={values.adminType}
                  />
                </div>
                <div className="flex-column new-user-box">
                  <TextField
                    label="Email"
                    name="email"
                    type="text"
                    className="form-input"
                    onBlur={handleBlur}
                    onChange={(e) => setFieldValue("email", e.target.value)}
                    value={values.email}
                  />
                  <TextField
                    label="Password"
                    name="password"
                    type="text"
                    className="form-input"
                    onBlur={handleBlur}
                    onChange={(e) => setFieldValue("password", e.target.value)}
                    value={values.password}
                  />
                </div>
                <button className="blue-btn absolute" type="submit">
                  Save
                </button>
                <button
                  className="white-btn absolute"
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

export default NewUser;
