import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import OrderItem from "./CartItem";
import addToCartThunk from "../store/cart";
import StripeCheckout from "react-stripe-checkout";

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: JSON.parse(localStorage.getItem("cart")) || [],
      totalCartPrice: this.price(JSON.parse(localStorage.getItem("cart"))),
    };
    this.changeCartQuantity = this.changeCartQuantity.bind(this);
    this.removeCartItem = this.removeCartItem.bind(this);
    this.price = this.price.bind(this);
    this.handleToken = this.handleToken.bind(this);
  }
  removeCartItem(plant_id) {
    var items = JSON.parse(localStorage.getItem("cart")) || [];
    var item = items.find((item) => item.plant_id === plant_id);
    if (items.length === 1) {
      window.localStorage.clear();
      this.setState({ totalCartPrice: 0 });
    } else if (item) {
      let index = items.indexOf(item);
      items.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(items));
      let price = this.price(JSON.parse(localStorage.getItem("cart")));
      this.setState({ cartItems: items, totalCartPrice: price });
    }
  }
  changeCartQuantity(plant_id, name, ImageUrl, price, num) {
    var items = JSON.parse(localStorage.getItem("cart")) || [];
    var item = items.find((item) => item.name === name);
    if (item) {
      item.count = Number(item.count) + num;
    } else {
      items.push({
        plant_id,
        name,
        ImageUrl,
        count: 1,
        price,
      });
    }
    localStorage.setItem("cart", JSON.stringify(items));
    price = this.price(JSON.parse(localStorage.getItem("cart")));
    this.setState({ cartItems: items, totalCartPrice: price });
  }

  price(cartItems) {
    let totalPrice = 0;
    for (let i = 0; i < cartItems.length; i++) {
      totalPrice = Number(cartItems[i].price) * Number(cartItems[i].count);
    }
    return (totalPrice = totalPrice.toFixed(2));
  }
  handleToken(token, addresses) {
    console.log({ token, addresses });
  }
  render() {
    let cartItems = JSON.parse(localStorage.getItem("cart"));
    if (!cartItems) {
      return <div>Your cart is empty</div>;
    } else {
      return (
        <div>
          <div className="cartscreen">
            <div className="cartscreen__left">
              <h2>Your Shopping Cart</h2>
            </div>
          </div>
          <div className="cartscreen__right">
            <div className="cartscreen__info">
              <div>
                {cartItems.map((plant, index) => {
                  return (
                    <div key={index}>
                      <div>{plant.name}</div>
                      <img
                        src={plant.ImageUrl}
                        style={{ width: "200px", height: "200px" }}
                      ></img>
                      <div>{plant.price}</div>
                      <div className="add-minus-quantity">
                        <button
                          className="minus"
                          onClick={() => {
                            this.changeCartQuantity(
                              plant.plant_id,
                              plant.name,
                              plant.imageUrl,
                              plant.price,
                              -1
                            );
                          }}
                        >
                          {" "}
                          -{" "}
                        </button>
                        <div className="amountInCart">
                          Amount in Cart: {plant.count}
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            this.changeCartQuantity(
                              plant.plant_id,
                              plant.name,
                              plant.imageUrl,
                              plant.price,
                              1
                            );
                          }}
                        >
                          {" "}
                          +{" "}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            this.removeCartItem(plant.plant_id);
                          }}
                        >
                          {" "}
                          trash symbol{" "}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
              <p>Subtotal for your items is ${this.state.totalCartPrice}</p>
            </div>
            <div>
              <StripeCheckout
                stripeKey="pk_test_51KIxdeDln4s4jzUmC2iVGwEhn3THaCORSorbdcBovd4cJzf1BpDPRmZfZU4SSRbuQBN97Ekwdb5J2HW463AoxmjZ00RdSYjvoA"
                token={this.handleToken}
                label="Checkout with 💳"
                // label="Pay with 💳"
                name="The Green House"
                // billingAddress
                // shippingAddress
                amount={this.state.totalCartPrice * 100}
                // plant_name={this.plant.plant_name}
                panelLabel="Buy for {{amount}}"
              />
              {/* <button>Checkout</button> */}
              <button
                onClick={() => {
                  window.localStorage.clear();
                  this.setState({
                    cartItems: JSON.parse(localStorage.getItem("cart")),
                  });
                }}
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      );
    }
  }
}

const mapState = (state) => {
  return {
    user: state.singleUserReducer,
  };
};

const mapDispatch = (dispatch) => ({
  addToCart: (plantId) => dispatch(addToCartThunk(plantId)),
});

export default connect(mapState, mapDispatch)(Cart);
