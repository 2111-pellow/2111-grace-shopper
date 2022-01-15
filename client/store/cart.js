import axios from 'axios'
// action types

export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const CART_RESET = "CART_RESET";

//action creators

export const addToCart = (nextCartItem) => ({
  type: ADD_TO_CART,
  nextCartItem
});


export const addToCartThunk = (plantId) => {
  return async (dispatch) => {
        try {
          const { data: cartItem } = await axios.get(`/api/plants/${plantId}`);
          dispatch(addToCart(cartItem));
        } catch (error) {
          console.log("ADD TO CART THUNK ERROR");
        }
      };
    };

//reducers

export default function cartReducer(state = { cartItems: [] }, action) {
  switch (action.type) {
    case ADD_TO_CART:
     return {
       ...state,
       cartItems: [
         ...state.cartItems,
         {
           ...action.nextCartItem
        }
       ]
     }
    default:
      return state;
  }
}
