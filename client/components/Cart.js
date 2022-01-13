import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import getSingleUserThunk from "../store/singleUser";
import CartItem from "./CartItem";

//need to have user connected here from redux store and through the user we get the plants associated
//use magic methods addchild to add plant onto user model.

class Cart extends React.Component {
  // componentDidMount(){
  //   this.props.getSingleUser(this.props.match.params.userId)
  // }

  render() {
    console.log(this.props);
    return (
      <div className="cartscreen">
        <div className="cartscreen__left">
          <h2>Shopping Cart</h2>
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
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
  getSingleUser: (userId) => dispatch(getSingleUserThunk(userId)),
});

export default connect(mapState, mapDispatch)(Cart);
