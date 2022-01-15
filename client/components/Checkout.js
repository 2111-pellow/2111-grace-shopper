import React from 'react'
import {useSelector} from 'react-redux'
import { createStructuredSelector } from 'reselect'

const mapState = createStructuredSelector({
  cartItems: cartItems
})

const Checkout = ({}) => {
  return (
    <div className="checkout">
      <h1>
        Checkout
      </h1>
    </div>
  )
}

export default Checkout
