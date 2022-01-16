import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import OrderItem from "./CartItem";
import addToCartThunk from "../store/cart"

//use map to map over the local storage keys pushed into an array?
// Key
class Cart extends React.Component {
  constructor(props){
    super(props)
  }

  render() {
      let cartItems = JSON.parse(localStorage.getItem('cart'))
  console.log(cartItems)
    return (
      <div>
      <div className="cartscreen">
        <div className="cartscreen__left">
          <h2>Your Shopping Cart</h2>
        </div>
        <div>{cartItems.map((plant, index)=>{
          return (
          <div key={index}>
            <div>{plant.plant_name}</div>
            <div>{plant.plant_ImageUrl}</div>
            <div>{plant.price}</div>
          </div>)
        })}
      </div>
          </div>
        <div className="cartscreen__right">
          <div className="cartscreen__info">
            {/* <p>Subtotal {cartItems.length} items</p> */}
            <p>$500</p>
          </div>
          <div>
            <button>Checkout</button>
            <button onClick={()=>{window.localStorage.clear()}}>Clear Cart</button>
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
