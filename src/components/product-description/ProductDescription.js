import React, { Component } from "react";
import axios from "axios";
import NavbarCSS from "../../components/header/Header.css";
import Navbar from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { render } from "@testing-library/react";
import ProductDescriptionCss from "../../components/product-description/ProductDescription.css";

export default class ProductDescription extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      vendor: "",
      description: "",
      cost: 0,
      image: "",
      date: new Date(),
      vendors: [],
      id: this.props.match.params.userid,
      username: "",
    };
  }

  componentDidMount() {
    axios
      .get(
        "http://localhost:5000/products/" + this.props.match.params.productid
      )
      .then((response) => {
        this.setState({
          name: response.data.name,
          vendor: response.data.vendor,
          description: response.data.description,
          image: response.data.image,
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

    axios
      .get("http://localhost:5000/users/" + this.state.id)
      .then((response) => {
        this.setState({ username: response.data.email });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  addToCart = () => {
    const cart = {
      cart: this.props.match.params.productid,
    };

    axios
      .post("http://localhost:5000/users/addtocart/" + this.state.id, cart)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    alert(this.state.name + " added to cart");
  };

  render() {
    return (
      <div>
        <Navbar username={this.state.username} userid={this.state.id} />
        <div class="col-sm-12 col-md-12 col-lg-12">
          <div class="container">
            <div class="product-content product-wrap product-deatil">
              <div class="row">
                <div class="col-md-5 col-sm-12 col-xs-12">
                  <div class="product-image">
                    <img
                      width="450px"
                      height="450px"
                      src={this.state.image}
                    ></img>
                  </div>
                </div>
                <div class="col-md-7 col-sm-12 col-xs-12">
                  <h2 class="Productname">
                    {this.state.name}
                    <small>
                      Sold by <a href="#">{this.state.vendor}</a>
                    </small>
                    <i class="fa fa-star fa-2x text-primary"></i>
                    <i class="fa fa-star fa-2x text-primary"></i>
                    <i class="fa fa-star fa-2x text-primary"></i>
                    <i class="fa fa-star fa-2x text-primary"></i>
                    <i class="fa fa-star fa-2x text-muted"></i>
                    <span class="fa fa-2x"></span>
                    <a href="#">1 customer reviews</a>
                  </h2>
                  <hr />
                  <h3 class="price-container">{this.state.cost}$</h3>
                  <div class="purchase">
                    <ul>
                      <li>
                        <button
                          type="button"
                          class="btn btn-warning"
                          onClick={this.addToCart}
                        >
                          ADD TO CART
                        </button>
                      </li>
                      <li>
                        <button type="button" class="btn btn-primary">
                          BUY NOW
                        </button>
                      </li>
                      <li>
                        <button type="button" class="btn btn-primary">
                          ADD TO WISHLIST
                        </button>
                      </li>
                    </ul>
                  </div>
                  <hr />
                  <div class="description description-tabs">
                    <ul class="nav nav-tabs nav-fill">
                      <li class="active mr-auto">
                        <a
                          href="#more-information"
                          data-toggle="tab"
                          class="no-margin"
                        >
                          Description{" "}
                        </a>
                      </li>
                    </ul>
                    <div class="tab-content">
                      <div class="tab-pane active " id="more-information">
                        <br />
                        <strong>Description Title</strong>
                        <p>{this.state.description}</p>
                      </div>
                      <div class="tab-pane fade" id="specifications">
                        <p>Sample</p>
                      </div>
                      <div class="tab-pane fade" id="reviews">
                        <br />
                        <form
                          method="post"
                          class="well padding-bottom-10"
                          onsubmit="return false;"
                        >
                          <textarea
                            rows="2"
                            class="form-control mb-2"
                            placeholder="Write a review"
                          ></textarea>
                          <div class="margin-top-10 ">
                            <button
                              type="submit"
                              class="btn btn-sm btn-primary pull-right"
                            >
                              Submit
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  <hr />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
