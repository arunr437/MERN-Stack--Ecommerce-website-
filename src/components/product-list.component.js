import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/navbar.component";

const Product = (props) => (
  <tr>
    <td>{props.product.name}</td>
    <td>{props.product.vendor}</td>
    <td>{props.product.description}</td>
    <td>{props.product.cost}$</td>
    <td>{props.product.date.substring(0, 10)}</td>
    <td>
      <Link
        to={"/product/edit/" + props.product._id}
        className="btn btn-warning"
      >
        edit
      </Link>
    </td>
    <td>
      <a
        href="#"
        className="btn btn-danger"
        onClick={() => {
          props.deleteProduct(props.product._id);
        }}
      >
        delete
      </a>
    </td>
  </tr>
);

export default class ProductsList extends Component {
  constructor(props) {
    super(props);

    this.deleteProduct = this.deleteProduct.bind(this);

    this.state = { products: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/products/")
      .then((response) => {
        this.setState({ products: response.data });
        alert("Response Data: " + response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteProduct(id) {
    axios.delete("http://localhost:5000/products/" + id).then((response) => {
      console.log(response.data);
    });

    this.setState({
      products: this.state.products.filter((el) => el._id !== id),
    });
  }

  productList() {
    return this.state.products.map((currentProduct) => {
      return (
        <Product
          product={currentProduct}
          deleteProduct={this.deleteProduct}
          key={currentProduct._id}
        />
      );
    });
  }
  render() {
    return (
      <div>
        <Navbar />
        <div className="px-5">
          <h3>Product List</h3>

          <table className="table table-striped table-bordered table-hover ">
            <thead className="thead-dark">
              <tr>
                <th width="10%">Name</th>
                <th width="10%">Vendor</th>
                <th>Description</th>
                <th>Cost</th>
                <th width="10%">Date Added</th>
                <th colSpan="2" style={{ textAlign: "center", width: "10%" }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>{this.productList()}</tbody>
          </table>

          <div>
            <a href="/product/create/" className="btn btn-primary">
              Add Product
            </a>
          </div>
        </div>
      </div>
    );
  }
}
