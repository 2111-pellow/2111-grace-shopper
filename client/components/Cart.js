// import React from "react";
// import { connect } from "react-redux";
// import { Link } from "react-router-dom";
// import getSingleUserThunk from "../store/singleUser";
// import CartItem from "./CartItem";

//need to have user connected here from redux store and through the user we get the plants associated
//use magic methods addchild to add plant onto user model.

// class Cart extends React.Component {
//   // componentDidMount(){
//   //   this.props.getSingleUser(this.props.match.params.userId)
//   // }

//   render() {
//     console.log(this.props);
//     return (
//       <div className="cartscreen">
//         <div className="cartscreen__left">
//           <h2>Shopping Cart</h2>
//           <CartItem />
//           <CartItem />
//           <CartItem />
//           <CartItem />
//         </div>
//         <div className="cartscreen__right">
//           <div className="cartscreen__info">
//             <p>Subtotal (0) items</p>
//             <p>$500</p>
//           </div>
//           <div>
//             <button>Checkout</button>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// const mapState = (state) => {
//   return {
//     user: state.singleUserReducer,
//   };
// };

// const mapDispatch = (dispatch) => ({
//   getSingleUser: (userId) => dispatch(getSingleUserThunk(userId)),
// });

// export default connect(mapState, mapDispatch)(Cart);


import React from "react";
import withContext from "../withContext";
import CartItem from "./CartItem";

const Cart = props => {
  const { cart } = props.context;
  const cartKeys = Object.keys(cart || {});
  return (
    <>
      <div className="hero is-primary">
        <div className="hero-body container">
          <h4 className="title">My Cart</h4>
        </div>
      </div>
      <br />
      <div className="container">
        {cartKeys.length ? (
          <div className="column columns is-multiline">
            {cartKeys.map(key => (
              <CartItem
                cartKey={key}
                key={key}
                cartItem={cart[key]}
                removeFromCart={props.context.removeFromCart}
              />
            ))}
            <div className="column is-12 is-clearfix">
              <br />
              <div className="is-pulled-right">
                <button
                  onClick={props.context.clearCart}
                  className="button is-warning "
                >
                  Clear cart
                </button>{" "}
                <button
                  className="button is-success"
                  onClick={props.context.checkout}
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="column">
            <div className="title has-text-grey-light">No item in cart!</div>
          </div>
        )}
      </div>
    </>
  );
};

export default withContext(Cart);
