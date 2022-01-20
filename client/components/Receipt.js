import React from "react";

export default class Receipt extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalCartPrice: this.price(JSON.parse(localStorage.getItem("cart"))),
    };

    this.price = this.price.bind(this);
  }
  price(cartItems) {
    let totalPrice = 0;
    if (!cartItems || cartItems === []) {
      totalPrice = 0;
    } else {
      for (let i = 0; i < cartItems.length; i++) {
        totalPrice += Number(cartItems[i].price) * Number(cartItems[i].count);
      }
      return (totalPrice = totalPrice.toFixed(2));
    }
  }
  render() {
    let cartItems = JSON.parse(localStorage.getItem("cart"));
    return (
      <div>
        <h2 className="fgdfgj">Thank you for your order!</h2>

        <div className="receiptTotal">
          {cartItems.map((plant, index) => {
            return (
              <div key={index} className="receipt">
                <div>{plant.name}</div>
                <div>{plant.price}</div>
                <div>Quantity: {plant.count}</div>
              </div>
            );
          })}
          <h2>Subtotal: ${this.state.totalCartPrice}</h2>
        </div>
      </div>
    );
  }
}
