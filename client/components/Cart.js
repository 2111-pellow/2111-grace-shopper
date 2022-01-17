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
      let totalPrice = 0
      let cartItems = JSON.parse(localStorage.getItem('cart'))
      if (!cartItems){
     return <div>Your cart is empty</div>
    } else {
       const price = (cartItems) =>{
      for (let i=0; i < cartItems.length; i++){
        totalPrice += Number(cartItems[i].price)
      }
      console.log(totalPrice)
      return totalPrice
    }
    let PRICE = price(cartItems).toFixed(2)
    return (
      <div>
      <div className="cartscreen">
        <div className="cartscreen__left">
          <h2>Your Shopping Cart</h2>
        </div>
          </div>
        <div className="cartscreen__right">
          <div className="cartscreen__info">
          <div>{cartItems.map((plant, index)=>{
          return (
          <div key={index}>
            <div>{plant.plant_name}</div>
            <img src={plant.ImageUrl} style={{ width: "200px", height: "200px" }}></img>
            <div>{plant.price}</div>
          </div>)
        })}
      </div>
            <p>Subtotal for your {cartItems.length} items is ${PRICE}</p>
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
