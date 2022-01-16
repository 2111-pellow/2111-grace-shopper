import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";

const Navbar = ({ handleClick, isLoggedIn, firstName, lastName }) => {

    const memberLinks = (
      <div>
        <Link to="/singleuserinfo">My Info</Link>
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
              <span className="cartlogo__badge">{localStorage.length ? JSON.parse(localStorage.getItem('cart')).length : 0}</span>
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
