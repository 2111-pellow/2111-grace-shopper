import React from "react";

import { Link } from "react-router-dom";
// const CartItem = () => {
//   return (
//     <div className="cartitem">
//       <div className="cartitem__image">
//         <img
//           src="https://envato-shoebox-0.imgix.net/d82a/febe-b0fa-4a3a-9ea8-20abf252c53e/0604-coffee-1373.jpg?auto=compress%2Cformat&fit=max&mark=https%3A%2F%2Felements-assets.envato.com%2Fstatic%2Fwatermark2.png&markalign=center%2Cmiddle&markalpha=18&w=700&s=c9e1d1661bf88a92bf1d3bef64333be7"
//           style={{ width: "100px" }}
//         />
//       </div>
//       <Link to={`/plants/${1}`} className="cartitem__name">
//         <p>Product 1</p>
//       </Link>
//       <p className="cartitem__price">$500</p>

//       <select className="dropdown">
//         <option value="1">1</option>
//         <option value="2">2</option>
//         <option value="3">3</option>
//         <option value="4">4</option>
//       </select>
//       <button className="cartitem__deleteBtn">
//         <i className="fas fa-trash"></i>
//       </button>
//     </div>
//   );
// };



const CartItem = props => {
  const { cartItem, cartKey } = props;
  return (
    <div className=" column is-half">
      <div className="box">
        <div className="media">
          <div className="media-left">
            <figure className="image is-64x64">
              <img
                src={this.props.plant.imageUrl}
                alt={this.props.plant.description}
              />
            </figure>
          </div>
          <div className="media-content">
            <b style={{ textTransform: "capitalize" }}>
              {this.props.plant.plant_name}{" "}
              <span className="tag is-primary">${this.props.plant.price}</span>
            </b>
            <div>{this.props.plant.description}</div>
            <small>{`${this.props.plant.quantity} in cart`}</small>
          </div>
          <div
            className="media-right"
            onClick={() => props.removeFromCart(cartKey)}>
            <span className="delete is-large"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

//{ Object.keys(this.state.cart).length } - to show amount in cart

export default CartItem;
