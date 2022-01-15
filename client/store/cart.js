import axios from 'axios'
// action types

export const ADD_TO_ORDER = "ADD_TO_ORDER";
export const REMOVE_FROM_ORDER = "REMOVE_FROM_CART";
export const ORDER_RESET = "ORDER_RESET";

//action creators

export const addToOrder = (nextOrderItem) => ({
  type: ADD_TO_ORDER,
  nextOrderItem
});


export const addToOrderThunk = (plantId) => {
  return async (dispatch) => {
        try {
          const { data: orderItem } = await axios.get(`/api/plants/${plantId}`);
          dispatch(addToOrder(orderItem));
        } catch (error) {
          console.log("ADD TO ORDER THUNK ERROR");
        }
      };
    };

//reducers

export default function cartReducer(state = { order: [] }, action) {
  switch (action.type) {
    case ADD_TO_ORDER:
     return {
       ...state,
       order: [
         ...state.order,
         {
           ...action.nextOrderItem
        }
       ]
     }
    default:
      return state;
  }
}
