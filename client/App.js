import React, { Component } from 'react'
import Navbar from './components/Navbar'
import Routes from './Routes'
import { Switch, Route, Link, BrowserRouter as Router } from "react-router-dom";
import axios from 'axios';
import Cart from './components/Cart'
import AllPlants from './components/AllPlants'
import Context from './Context'


export default class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      user: null,
      cart: {},
      plants: [],
    }
    this.routerRef = React.createRef()
  }

  async componentDidMount (){
    try{
    let user = localStorage.getItem("user");
    let cart = localStorage.getItem("cart");
  //place in thunk??

    const plants = await axios.get('/api/plants')
    //should this be from localhost
    user = user ? JSON.parse(user) : null;
    cart - cart ? JSON.parse(cart) : {}

    this.setState({ user,  products: plants.data, cart });
    } catch (error){
      console.error(error)
    }
  }

  addToCart(cartItem){
    let cart = this.state.cart;
    if (cart[cartItem.id]) {
      cart[cartItem.id].quantity += cartItem.quantity;
    } else {
      cart[cartItem.id] = cartItem;
    }
    if (cart[cartItem.id].amount > cart[cartItem.id].product.stock) {
      cart[cartItem.id].amount = cart[cartItem.id].product.stock;
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    this.setState({ cart });
  }

  render() {
    return (
      <Context.Provider
        value={{
          ...this.state,
          addToCart: this.addToCart,}}
      >
        <Router ref={this.routerRef}>
     <div>
       <Navbar />
       <Routes />
     </div>
        </Router>
      </Context.Provider>
    );
  }
}
