import React, { Component } from "react";
import axios from "axios";
import Navbar from "../components/navbar.component";

export default class CreateVendor extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: "",
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const vendor = {
      name: this.state.name,
    };

    console.log(vendor);

    axios
      .post("http://localhost:5000/vendors/add", vendor)
      .then((res) => console.log(res.data))
      .catch(function (error) {
        console.log("error: " + error);
      });

    this.setState({
      name: "",
    });

    window.location = "/product";
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="container border p-5">
          <h3>Add Vendor</h3>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Vendor Name: </label>
              <input
                type="text"
                required
                className="form-control"
                value={this.state.name}
                onChange={this.onChangeName}
              />
            </div>
            <div className="form-group">
              <input
                type="submit"
                value="Add Vendor"
                className="btn btn-primary"
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}
