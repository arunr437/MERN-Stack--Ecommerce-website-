import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Navbar from "../components/navbar.component";

export default class EditProduct extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeVendor = this.onChangeVendor.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeCost = this.onChangeCost.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: "",
      vendor: "",
      description: "",
      cost: 0,
      date: new Date(),
      vendors: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/products/" + this.props.match.params.id)
      .then((response) => {
        this.setState({
          name: response.data.name,
          vendor: response.data.vendor,
          description: response.data.description,
          cost: response.data.cost,
          date: new Date(response.data.date),
        });
      })
      .catch(function (error) {
        console.log(error);
      });

    axios.get("http://localhost:5000/vendors/").then((response) => {
      if (response.data.length > 0) {
        this.setState({
          vendors: response.data.map((vendor) => vendor.name),
        });
      }
    });
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }

  onChangeVendor(e) {
    this.setState({
      vendor: e.target.value,
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  onChangeCost(e) {
    this.setState({
      cost: e.target.value,
    });
  }

  onChangeDate(date) {
    this.setState({
      date: date,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const product = {
      name: this.state.name,
      vendor: this.state.vendor,
      description: this.state.description,
      cost: this.state.cost,
      date: this.state.date,
    };

    console.log(product);

    axios
      .post(
        "http://localhost:5000/products/update/" + this.props.match.params.id,
        product
      )
      .then((res) => console.log(res.data));

    window.location = "/product";
  }
  render() {
    return (
      <div>
        <Navbar />
        <div className="container border p-5">
          <h3>Edit Product</h3>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Product Name: </label>
              <input
                type="text"
                required
                className="form-control"
                value={this.state.name}
                onChange={this.onChangeName}
              />
            </div>
            <div className="form-group">
              <label>Vendor: </label>
              <select
                ref="vendorInput"
                required
                className="form-control"
                value={this.state.vendor}
                onChange={this.onChangeVendor}
              >
                {this.state.vendors.map(function (vendor) {
                  return (
                    <option key={vendor} value={vendor}>
                      {vendor}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="form-group">
              <label>Description: </label>
              <input
                type="text"
                required
                className="form-control"
                value={this.state.description}
                onChange={this.onChangeDescription}
              />
            </div>
            <div className="form-group">
              <label>Cost (in CAD): </label>
              <input
                type="text"
                className="form-control"
                value={this.state.cost}
                onChange={this.onChangeCost}
              />
            </div>
            <div className="form-group">
              <label>Date: </label>
              <div>
                <DatePicker
                  selected={this.state.date}
                  onChange={this.onChangeDate}
                />
              </div>
            </div>
            <div className="form-group">
              <input
                type="submit"
                value="Edit Product"
                className="btn btn-primary"
              />
              <a href="/product" className="btn btn-secondary ml-5 pl-4 pr-4">
                Back
              </a>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
