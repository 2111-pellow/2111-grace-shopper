import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import addToCartThunk from "../store/cart"
import Checkout from "./Checkout"

//need to have user connected here from redux store and through the user we get the plants associated
//use magic methods addchild to add plant onto user model.

class Cart extends React.Component {
  render() {
    return (
      <div className="cartscreen">
        <div className="cartscreen__left">
          <h2>Your Shopping Cart</h2>

          <CheckOut />
        </div>
        <div className="cartscreen__right">
          <div className="cartscreen__info">
            <p>Subtotal (0) items</p>
            <p>$500</p>
          </div>
          <div>
            <button>Checkout</button>
          </div>
        </div>
      </div>
    );
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
