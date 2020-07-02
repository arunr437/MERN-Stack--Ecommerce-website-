import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/navbar.component";
import ProductList from "./components/product-list.component";
import EditProduct from "./components/edit-product.component";
import CreateProduct from "./components/create-product.component";
import CreateVendor from "./components/create-vendor.component";
import HomePage from "./components/homepage/HomePage";
import ViewProduct from "./components/product-description/ProductDescription";
import Login from "./components/login.component";
import Cart from "./components/cart.component";

function App() {
  return (
    <Router>
      <div>
        <Route path="/Home/:userid" component={HomePage} />
        <Route exact path="/" component={Login} />
        <Route path="/product" exact component={ProductList} />
        <Route path="/product/edit/:id" component={EditProduct} />
        <Route path="/product/create" component={CreateProduct} />
        <Route exact path="/vendor" component={CreateVendor} />
        <Route path="/cart/:userid" component={Cart} />
        <Route
          path="/view-product/:productid/:userid"
          component={ViewProduct}
        />
      </div>
    </Router>
  );
}

export default App;
