import React, { Component } from "react";
import axios from "axios";
import { render } from "@testing-library/react";
import NavbarCSS from "../components/header/Header.css";
import Navbar from "./header/Header";
export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
  }

  formChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({ [name]: value });
  };

  formSubmit = (event) => {
    event.preventDefault();
    const login = {
      email: this.state.email,
      password: this.state.password,
    };
    axios
      .post("http://localhost:5000/users/login/", login)
      .then((res) => (window.location = "/home/" + res.data._id))
      .catch(function (error) {
        console.log("error: " + error);
      });
  };

  render() {
    return (
      <div>
        <Navbar />
        <form
          class="form-horizontal"
          onSubmit={this.formSubmit}
          style={{
            boxShadow:
              "0 2.8px 2.2px rgba(0, 0, 0, 0.034), 0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06), 0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086), 0 100px 80px rgba(0, 0, 0, 0.12)",

            width: "60%",
            margin: "50px auto",
            padding: "2%",
          }}
        >
          <div class="form-group">
            <label class="control-label col-sm-2" for="email">
              Email:
            </label>
            <div class="col-sm-10">
              <input
                type="email"
                class="form-control"
                id="email"
                placeholder="Enter email"
                name="email"
                onChange={this.formChange}
              />
            </div>
          </div>
          <div class="form-group">
            <label class="control-label col-sm-2" for="pwd">
              Password:
            </label>
            <div class="col-sm-10">
              <input
                type="password"
                class="form-control"
                id="pwd"
                placeholder="Enter password"
                name="password"
                onChange={this.formChange}
              />
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-offset-2 col-sm-10">
              <button type="submit" class="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
