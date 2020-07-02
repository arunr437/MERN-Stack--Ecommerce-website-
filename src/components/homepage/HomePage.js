import React, { Component } from "react";
import NavbarCSS from "../../components/header/Header.css";
import Navbar from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Carousel from "../../components/carousel/Carousel";
import { Link } from "react-router-dom";
import axios from "axios";

const Product = (props) => (
  <div class="col-md-3 mb-3">
    <div href="#" class="card card-product-grid">
      <a href="#" class="img-wrap">
        {" "}
        <img src={props.product.image} width="100%" height="200px" />{" "}
      </a>
      <figcaption class="info-wrap">
        <a href="#" class="title">
          {props.product.name}
        </a>
        <div class="price mt-1">{props.product.cost}$</div>
        <Link
          to={"/view-product/" + props.product._id + "/" + props.id}
          className="btn btn-warning ml-4"
        >
          View
        </Link>
        <button
          to={"/view-product/" + props.product._id}
          className="btn btn-warning ml-5"
          onClick={(e) => {
            const cart = {
              cart: props.product._id,
            };

            axios
              .post("http://localhost:5000/users/addtocart/" + props.id, cart)
              .then((response) => {
                console.log(response.data);
              })
              .catch((error) => {
                console.log(error);
              });
            alert(props.product.name + " added to cart");
          }}
        >
          Add to Cart
        </button>
      </figcaption>
    </div>
  </div>
);

export default class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      id: this.props.match.params.userid,
      name: "",
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/products/")
      .then((response) => {
        this.setState({ products: response.data });
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get("http://localhost:5000/users/" + this.state.id)
      .then((response) => {
        this.setState({ name: response.data.email });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  productList() {
    return this.state.products.map((currentProduct) => {
      return (
        <Product
          product={currentProduct}
          key={currentProduct._id}
          id={this.state.id}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <Navbar username={this.state.name} userid={this.state.id} />
        <section class="section-name padding-y-sm">
          <div class="container">
            <header class="section-heading">
              <h3 class="section-title text-center my-5">Popular products</h3>
            </header>

            <div class="row">{this.productList()}</div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }
}
