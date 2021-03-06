import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import OrderItem from "./CartItem";

import addToCartThunk from "../store/cart";

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: JSON.parse(localStorage.getItem("cart")),
      totalCartPrice: this.price(JSON.parse(localStorage.getItem("cart"))),
    };
    this.changeCartQuantity = this.changeCartQuantity.bind(this);
    this.removeCartItem = this.removeCartItem.bind(this);
    this.price = this.price.bind(this);
  }
  removeCartItem(plant_id) {
    var items = JSON.parse(localStorage.getItem("cart"));
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
    var items = JSON.parse(localStorage.getItem("cart"));
    var item = items.find((item) => item.name === name);
    if (item) {
      if (item.count === 1 && num === -1) {
        if (items.length === 1) {
          window.localStorage.clear();
          this.setState({ totalCartPrice: 0 });
        }
        let index = items.indexOf(item);
        items.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(items));
        let price = this.price(JSON.parse(localStorage.getItem("cart")));
        this.setState({ cartItems: items, totalCartPrice: price });
      }
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
    if (!cartItems || cartItems === []) {
      return <div>Your cart is empty</div>;
    } else {
      return (
        <div>
          <div>
            <div className="cartscreen__left">
              <h2>Your Shopping Cart</h2>
            </div>
          </div>
          <div className="cartscreen__right">
            <div className="cartscreen__info">
              <div className="cart_cart">
                {cartItems.map((plant, index) => {
                  return (
                    <div
                      key={index}
                      className="cartitem"
                      // style={{ width: "800px", height: "100px" }}
                    >
                      <div>{plant.name}</div>
                      <img
                        src={plant.ImageUrl}
                        style={{ width: "150px", height: "150px" }}
                        className="caritem__image"
                      ></img>
                      <div className="caritem__price">{plant.price}</div>
                      <span className="add_subtract">
                        <button
                          className="cartitem__add__subtract"
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
                          -
                        </button>
                        <div className="amountInCart">
                          Amount in Cart: {plant.count}
                        </div>
                        <button
                          type="button"
                          className="cartitem__add__subtract"
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
                          className="cartitem__deleteBtn"
                          onClick={() => {
                            this.removeCartItem(plant.plant_id);
                          }}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </span>
                    </div>
                  );
                })}
              </div>
              <div>
                <h3>Subtotal for your items is ${this.state.totalCartPrice}</h3>
                <div>
                  <Link to="/checkout">
                    <button>Checkout</button>
                  </Link>
                </div>
                <div>
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
