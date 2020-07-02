import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "./e-zone.png";
import Angle from "./angle-down-solid.svg";
import "../../../node_modules/font-awesome/css/font-awesome.min.css";

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const isLoggedIn = this.props.username;
    const link = "/home/" + this.props.userid;
    const cart = "/cart/" + this.props.userid;
    return (
      <header>
        <link src="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary static-top">
          <div class="container">
            <a class="navbar-brand" href={link}>
              <img src={logo} id="logo" alt="" />
            </a>
            <div class="Header-navbar-search  col-sm-3 col-xs-10">
              <div class="row">
                <input
                  class="Header-navbar-input col-xs-10"
                  type=""
                  placeholder="Search for products"
                  name=""
                />
                <button type="button" class=" btn btn-warning">
                  Search
                </button>
              </div>
            </div>
            <button
              class="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#Header_Responsive"
              aria-controls="Header_Responsive"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="Header_Responsive">
              <ul class="navbar-nav ml-auto">
                <li class="nav-item active">
                  <a class="nav-link" href="#">
                    <span class="sr-only">(current)</span>
                  </a>
                </li>
                <li class="nav-item mr-3">
                  <a className="nav-link" href="/product">
                    ADD PRODUCTS
                  </a>
                </li>
                {isLoggedIn.length > 0 && (
                  <li class="nav-item mr-3">
                    <a class="nav-link font-weight-bold disabled">
                      Hello, {this.props.username}
                    </a>
                  </li>
                )}
                {isLoggedIn.length > 0 && (
                  <li class="nav-item">
                    <a
                      href={cart}
                      style={{ textDecoration: "none", color: "white" }}
                    >
                      <i class="fa fa-shopping-cart fa-2x"></i>
                    </a>
                  </li>
                )}
                {isLoggedIn.length > 0 && (
                  <li class="nav-item ml-5">
                    <a className="nav-link" href="/">
                      Logout
                    </a>
                  </li>
                )}

                {isLoggedIn.length == 0 && (
                  <li class="nav-item">
                    <a className="nav-link" href="/">
                      LOGIN
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
        <nav class="navbar navbar-expand-lg navbar-light bg-light shadow ">
          <div class="container h-100 d-flex justify-content-center">
            <ul class="navbar-nav ">
              <li class="nav-item active">
                <a class="nav-link" href="#">
                  Men
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Women
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Baby & Kids
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Offer Zone
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}

Header.defaultProps = {
  username: "",
};

export default Header;
