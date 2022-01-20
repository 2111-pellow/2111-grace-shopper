import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import Receipt from "./Receipt";
import { render } from "enzyme";

class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showComponent: false,
      totalCartPrice: this.price(JSON.parse(localStorage.getItem("cart"))),
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleToken = this.handleToken.bind(this);
    this.price = this.price.bind(this);
  }
  handleClick() {
    this.setState({
      showComponent: true,
    });
  }

  handleToken(token) {
    console.log(token);
  }
  price(cartItems) {
    let totalPrice = 0;
    if (!cartItems || cartItems === []) {
      totalPrice = 0;
    } else {
      for (let i = 0; i < cartItems.length; i++) {
        totalPrice += Number(cartItems[i].price) * Number(cartItems[i].count);
      }
      return (totalPrice = totalPrice.toFixed(2));
    }
  }
  render() {
    let cartItems = JSON.parse(localStorage.getItem("cart"));
    let total = 0;
    return (
      <div>
        {/* <Link to="/login">
        <h2>Checkout as a member by logging in!</h2>
      </Link>
      <h2>Or ...Checkout as a Guest</h2> */}
        <div className="cartscreen">
          <div className="cartscreen__left">
            <h2>Cart Summary</h2>
          </div>
        </div>
        <div className="cart_cart">
          {cartItems.map((plant, index) => {
            total += Number(plant.price * plant.count);
            return (
              <div key={index} className="cartitem">
                <div>{plant.name}</div>
                <img
                  src={plant.ImageUrl}
                  style={{ width: "100px", height: "100px" }}
                ></img>
                <div>{plant.price}</div>
                <div>Amount in Cart: {plant.count}</div>
              </div>
            );
          })}
          <h3>Total price for your items is ${this.state.totalCartPrice}</h3>
          <Link to="/receipt">
            <StripeCheckout
              stripeKey="pk_test_51KIxdeDln4s4jzUmC2iVGwEhn3THaCORSorbdcBovd4cJzf1BpDPRmZfZU4SSRbuQBN97Ekwdb5J2HW463AoxmjZ00RdSYjvoA"
              token={this.handleToken}
              label="Checkout with 💳"
              // label="Pay with 💳"
              name="The Green House"
              // billingAddress
              // shippingAddress
              amount={total * 100}
              panelLabel="Buy for {{amount}}"
            />
            <button>Pay Now</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Checkout;
