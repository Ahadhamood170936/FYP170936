import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import Input from "./../Common/Input";
import Form from "./../Common/Form";
import Joi from "joi";
import Spinner from './../Common/Spinner';
import { createTeacher } from "../../Firebase/Firebase";
import { useNavigate } from 'react-router-dom';

class NewTeacher extends Form {
  state = {
    loading: false,
    data: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      address: "",
      department: "",
      password: "",
    },
    errors: {},
  };

  objectSchema = {
    firstName: Joi.string().required().label("First Name"),
    lastName: Joi.string().required().label("Last Name"),
    email: Joi.string().required().label("email"),
    phoneNumber: Joi.string().required().label("phoneNumber"),
    address: Joi.string().required().label("address"),
    department: Joi.string().required().label("department"),
    password: Joi.string().required().label("password"),
  };

  doSubmit = async () => {
    try {
      this.setState({ loading: true });
      await createTeacher(this.state.data);
      this.setState({ loading: false });
      alert("Created succussfully!!!");
    } catch (error) {
      this.setState({ loading: false });
      alert(error.message);
    }
  };

  render() {
    return (
      <Sidebar>
        {this.state.loading ? (
          <Spinner />
        ) : (
          <div>
            <h3>New Teacher</h3>
            <Input
              label="First Name"
              name="firstName"
              onChange={this.inputHandler}
              placeholder="Enter first name"
              error={this.state.errors.firstName}
            />
            <Input
              label="Last Name"
              name="lastName"
              error={this.state.errors.lastName}
              onChange={this.inputHandler}
              placeholder="Enter last name"
            />
            <Input
              label="Email"
              name="email"
              error={this.state.errors.email}
              type="email"
              onChange={this.inputHandler}
              placeholder="Enter email"
            />

            <Input
              label="Phone Number"
              name="phoneNumber"
              error={this.state.errors.phoneNumber}
              onChange={this.inputHandler}
              placeholder="Enter Phone number"
            />
            <Input
              label="Address"
              name="address"
              error={this.state.errors.address}
              onChange={this.inputHandler}
              placeholder="Enter address"
            />
            <Input
              label="Department"
              name="department"
              error={this.state.errors.department}
              onChange={this.inputHandler}
              placeholder="Enter department"
            />
            <Input
              label="Password"
              error={this.state.errors.password}
              name="password"
              type="password"
              onChange={this.inputHandler}
              placeholder="Enter password"
            />

            <button
              className="btn primary-button px-5"
              onClick={this.submitForm}
            >
              Submit
            </button>
          </div>
        )}
      </Sidebar>
    );
  }
}

function WithNavigate(props) {
  let navigate = useNavigate();
  return <NewTeacher {...props} navigate={navigate} />;
}

export default WithNavigate;
