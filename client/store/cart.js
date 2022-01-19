import axios from "axios";
// action types

export const ADD_TO_ORDER = "ADD_TO_ORDER";
export const CREATE_ORDER = "CREATE_ORDER";
export const REMOVE_FROM_ORDER = "REMOVE_FROM_CART";
export const ORDER_RESET = "ORDER_RESET";

//action creators

export const addToOrder = (nextOrderItem) => ({
  type: ADD_TO_ORDER,
  nextOrderItem,
});
export const createOrder = (order) => ({
  type: CREATE_ORDER,
  order,
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

export const createOrderThunk = (order) => {
  let token = localStorage.getItem("token");
  console.log(token);

  return async (dispatch) => {
    try {
      if (token) {
        const { data } = await axios.get(`/api/orders/${order.id}`, {
          headers: { authorization: token },
        });
        dispatch(createOrder(data));
      }
    } catch (error) {
      console.log("CREATE ORDER THUNK ERROR");
    }
  };
};

//reducers

export default function cartReducer(state = { order: [] }, action) {
  switch (action.type) {
    case CREATE_ORDER:
      return {
        ...state,
        order: [...state.order, action.order],
      };
    case ADD_TO_ORDER:
      return {
        ...state,
        order: [
          ...state.order,
          {
            ...action.nextOrderItem,
          },
        ],
      };
    default:
      return state;
  }
}
