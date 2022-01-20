import React from "react";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Link } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import Receipt from "./Receipt"
import { render } from "enzyme";
// import CardIcon from "../images/credit-card.svg";
// import ProductImage from "../images/product-image.jpg";
// import "../styles.css";

class Checkout extends React.Component {
  // function handleToken(token) {
  //   console.log(token);
  // }
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     showComponent: false,
  //   };
  //   this.handleClick = this.handleClick.bind(this);
  // }
  // handleClick() {
  //   this.setState({
  //     showComponent: true,
  //   });
  // }

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
      <div>
        {cartItems.map((plant, index) => {
          total += Number(plant.price * plant.count);
          return (
            <div key={index}>
              <div>{plant.name}</div>
              <img
                src={plant.ImageUrl}
                style={{ width: "200px", height: "200px" }}
              ></img>
              <div>{plant.price}</div>
              <div>Amount in Cart: {plant.count}</div>
            </div>
          );
        })}
        <p>Total price for your items is ${total}</p>
        <Link to="/receipt">
          <button>Make a Payment</button>
        </Link>

        {/* <StripeCheckout
          stripeKey="pk_test_51KIxdeDln4s4jzUmC2iVGwEhn3THaCORSorbdcBovd4cJzf1BpDPRmZfZU4SSRbuQBN97Ekwdb5J2HW463AoxmjZ00RdSYjvoA"
          token={handleToken}
          label="Checkout with 💳"
          // label="Pay with 💳"
          name="The Green House"
          // billingAddress
          // shippingAddress
          amount={total * 100}
          // plant_name={this.plant.plant_name}
          panelLabel="Buy for {{amount}}"
        /> */}
      </div>
    </div>
  );
 }
};

export default Checkout;
