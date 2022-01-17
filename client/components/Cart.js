import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import OrderItem from "./CartItem";
import addToCartThunk from "../store/cart"

class Cart extends React.Component {
  constructor(props){
    super(props)
    this.decreaseCartQuantity = this.decreaseCartQuantity.bind(this)
    this.increaseCartQuantity = this.increaseCartQuantity.bind(this)
    this.removeCartItem = this.removeCartItem.bind(this)
  }
  removeCartItem(name){
    var items = JSON.parse(localStorage.getItem('cart')) || [];
    var item = items.find(item => item.name === name);
    if (items.length === 1){
      window.localStorage.clear()}
    else if (item) {
      let index = items.indexOf(item)
      console.log(index)
      items = items.splice(index, 1)
      localStorage.setItem('cart', JSON.stringify(items))
    }
  }
  decreaseCartQuantity(plant_id, name, ImageUrl, price) {
    var items = JSON.parse(localStorage.getItem('cart')) || [];
    var item = items.find(item => item.name === name);
    if (item) {
      item.count = Number(item.count) - 1;
    } else {
      items.push({
        plant_id,
        name,
        ImageUrl,
        count: 1,
        price
      })
    }
    localStorage.setItem('cart', JSON.stringify(items));
  }

  increaseCartQuantity(plant_id, name, ImageUrl, price) {
    console.log(name)
    var items = JSON.parse(localStorage.getItem('cart')) || [];
    var item = items.find(item => item.name === name);
    if (item) {
      item.count = Number(item.count) + 1;
    } else {
      items.push({
        plant_id,
        name,
        ImageUrl,
        count: 1,
        price
      })
    }
    localStorage.setItem('cart', JSON.stringify(items));
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
      return totalPrice
    }
    let PRICE = price(cartItems).toFixed(2)
    return (
      <div>
      <div className="cartscreen">
        <div className="cartscrgeen__left">
          <h2>Your Shopping Cart</h2>
        </div>
          </div>
        <div className="cartscreen__right">
          <div className="cartscreen__info">
          <div>{cartItems.map((plant, index)=>{
          return (
          <div key={index}>
            <div>{plant.name}</div>
            <img src={plant.ImageUrl} style={{ width: "200px", height: "200px" }}></img>
            <div>{plant.price}</div>
            <div className='add-minus-quantity'>
              <button className="minus" onClick={() => {this.decreaseCartQuantity(plant.plant_id, plant.name, plant.imageUrl, plant.price)}} > - </button>
              <div className="amountInCart">Amount in Cart: {plant.count}</div>
              <button type="button" onClick={() => {this.increaseCartQuantity(plant.plant_id, plant.name, plant.imageUrl, plant.price)}}> + </button>
              <button type="button" onClick={() => {this.removeCartItem(plant.name)}}> trash symbol </button>
            </div>
          </div> )
        })}
      </div>
            <p>Subtotal for your items is ${PRICE}</p>
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
