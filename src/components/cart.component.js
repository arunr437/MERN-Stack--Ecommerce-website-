import React, { Component } from "react";
import { Link } from "react-router-dom";
import NavbarCSS from "../components/header/Header.css";
import Navbar from "../components/header/Header";
import axios from "axios";
import "../../src/components/cart-style.css";

var sum = 0;
const Product = (props) => (
  <div>
    <div class="item">
      <div class="buttons">
        <a
          href="#"
          onClick={() => {
            props.deleteProduct(props.product._id, props.product.cost);
          }}
        >
          <i class="fa fa-trash-o"></i>
        </a>
      </div>

      <div class="image" style={{ marginBottom: "20px" }}>
        <img src={props.product.image} width="100px" height="90px" alt="" />
      </div>

      <div class="description">
        <span>{props.product.name}</span>
        <span>{props.product.vendor}</span>
      </div>

      <div class="quantity">
        <button class="button" type="button" name="button">
          +
        </button>
        <input type="text" name="name" value="1" />
        <button class="button" type="button" name="button">
          -
        </button>
      </div>

      <div class="total-price">${props.product.cost}</div>
    </div>
  </div>
);

export default class Cart extends Component {
  constructor(props) {
    super(props);

    this.deleteProduct = this.deleteProduct.bind(this);

    this.state = {
      products: [],
      productIds: [],
      id: this.props.match.params.userid,
      username: "",
      totalCost: 0,
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/users/" + this.state.id)
      .then((response) => {
        this.setState({ productIds: response.data.cart });
        this.state.productIds.forEach((productId) => {
          axios
            .get("http://localhost:5000/products/" + productId)
            .then((response) => {
              this.setState({
                totalCost: this.state.totalCost + response.data.cost,
              });
              this.setState({
                products: [...this.state.products, response.data],
              });
            });
        });
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get("http://localhost:5000/users/" + this.state.id)
      .then((response) => {
        this.setState({ username: response.data.email });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteProduct(id, cost) {
    const cart = {
      cart: id,
    };

    axios
      .post(
        "http://localhost:5000/users/removefromcart/" +
          this.props.match.params.userid,
        cart
      )
      .then((response) => {
        this.setState({ totalCost: this.state.totalCost - cost });
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
    var sum = 0;
    this.state.products.forEach((product) => {
      sum += product.cost;
    });
    var link = "/home/" + this.state.id;

    return (
      <div>
        <Navbar username={this.state.username} userid={this.state.id} />

        <div class="shopping-cart">
          <div class="cart-title">Shopping Cart</div>
          {this.productList()}
          <div class="total" style={{ marginLeft: "60%" }}>
            <span>Total</span>
            <span style={{ marginLeft: "33%" }}>${this.state.totalCost}</span>
          </div>
          <div style={{ marginTop: "20px" }}>
            <span style={{ marginLeft: "30%" }}>
              <a href={link} className="btn btn-secondary ml-5">
                Back
              </a>
            </span>
            <span style={{ marginLeft: "5%" }}>
              <a href="#" className="btn btn-primary">
                Payment
              </a>
            </span>
          </div>
        </div>
      </div>
    );
  }
}
