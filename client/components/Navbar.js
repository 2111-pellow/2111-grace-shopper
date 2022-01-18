import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
import { useState } from "react"

const Navbar = ({ handleClick, isLoggedIn, firstName, lastName }) => {
  let cartItems = JSON.parse(localStorage.getItem('cart'))
// const [quantity, setQuantity] = useState(localStorage.length ? cartItems.length : 0)

    const memberLinks = (
      <div>
        <Link to="/myinfo">My Info</Link>
        <Link to="/plants">Plants Room</Link>
        <Link to="/aboutUs">About Us</Link>
        <Link to="/cart" className="cart__link">
        <i className="fas fa-shopping-cart"></i>
        <span>Cart<span className="cartlogo__badge"></span></span>
        </Link>
        <a href="#" onClick={handleClick}>Logout</a>
        <h4>Welcome, {firstName} {lastName}!</h4>
      </div>
    );

    const guestLinks = (
      <div>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
          <Link to="/plants">Plants Room</Link>
          <Link to="/aboutUs">About Us</Link>
          <Link to="/cart" className="cart__link">

            <i className="fas fa-shopping-cart"></i>
            <span>
              Cart
               {/* <span className="cartlogo__badge">{quantity}</span> */}
            </span>
          </Link>
      </div>
    );

    return (
      <div>
      <Link to="/" style={{ color: "black" }}><h1>The Greenhouse</h1></Link>
      <nav>
      { isLoggedIn ? memberLinks : guestLinks }
      </nav>
      <hr />
      </div>
    );
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    firstName: state.auth.firstName,
    lastName: state.auth.lastName,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
