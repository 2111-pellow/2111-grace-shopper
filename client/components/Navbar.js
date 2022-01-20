import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
import { useState } from "react";

const Navbar = ({ handleClick, isLoggedIn, firstName, lastName, isAdmin }) => {
  // let cartItems = JSON.parse(localStorage.getItem("cart"));
  // const [quantity, setQuantity] = useState(localStorage.length ? cartItems.length : 0)

  const memberLinks = (
    <div>
      <Link to="/myinfo" style={{ color: "Black" }}>
        My Info
      </Link>
      <Link to="/plants" style={{ color: "Black" }}>
        Plants Room
      </Link>
      <Link to="/aboutUs" style={{ color: "Black" }}>
        About Us
      </Link>
      <Link to="/cart" className="cart__link">
        <i className="fas fa-shopping-cart"></i>
        <span>
          Cart<span className="cartlogo__badge"></span>
        </span>
      </Link>
      <a href="#" onClick={handleClick}>
        Logout
      </a>
      <h4>
        Welcome, {firstName} {lastName}!
      </h4>
    </div>
  );


  const guestLinks = (
    <div>
      <Link to="/login" style={{ color: "Black" }}>
        Login
      </Link>
      <Link to="/signup" style={{ color: "Black" }}>
        Sign Up
      </Link>
      <Link to="/plants" style={{ color: "Black" }}>
        Plants Room
      </Link>
      <Link to="/aboutUs" style={{ color: "Black" }}>
        About Us
      </Link>
      <Link to="/cart" className="cart__link">
        <i className="fas fa-shopping-cart"></i>
        <span>
          Cart
 {/* <span id="add-to-cart"></span> */}
          {/* <span className="cartlogo__badge">{cartItems.length}</span> */}
        </span>
      </Link>
    </div>
  );


  const adminLinks = (
    <div>
      <Link to="/users" style={{ color: "Black" }}>
        All Users
      </Link>
      <Link to="/plants" style={{ color: "Black" }}>
        Plants Room
      </Link>
      <a href="#" onClick={handleClick}>
        Logout
      </a>
      <h4>
        Welcome, Admin {firstName} {lastName}!
      </h4>
    </div>
  );

  return (
    <div>
      <Link to="/" style={{ color: "Black" }}>
        <h1>The Greenhouse</h1>
      </Link>
      <nav>
        {isAdmin && isLoggedIn ? adminLinks : null}
        {!isAdmin && isLoggedIn ? memberLinks : null}
        {!isAdmin && !isLoggedIn ? guestLinks : null}
      </nav>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    firstName: state.auth.firstName,
    lastName: state.auth.lastName,
    isAdmin: state.auth.isAdmin,
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
