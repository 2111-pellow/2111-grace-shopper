import axios from "axios";
// action types

export const CREATE_ORDER = "CREATE_ORDER";
export const UPDATE_ORDER = "UPDATE_ORDER";
export const REMOVE_FROM_ORDER = "REMOVE_FROM_ORDER";
export const ORDER_RESET = "ORDER_RESET";

//action creators

export const createOrder = (order) => ({
  type: CREATE_ORDER,
  order,
});

export const updateOrder = (order) => ({
  type: UPDATE_ORDER,
  order,
});


export const updateOrderThunk = (plant_id, quantity, userId) => {
  let token = localStorage.getItem("token");
  return async (dispatch) => {
    try {
      console.log("inside update order thunk")
      const { data } = await axios.put(`/api/orders/${userId}`, { plant_id ,  quantity }, {
        headers: { authorization: token },
      });
      dispatch(updateOrder(data));
    } catch (error) {
      console.log("ADD TO ORDER THUNK ERROR");
    }
  };
};

export const createOrderThunk = (plant_id, quantity, userId ) => {
  let token = localStorage.getItem("token");

  return async (dispatch) => {

    try {
      if (token) {
        const { data } = await axios.post(`/api/orders/${userId}`, { plant_id ,  quantity }, {
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
    case UPDATE_ORDER:
      return {
        ...state,
        order: [
          ...state.order.map((plant)=> (plant.id === action.plant_id ? action.plant : plant))]
      };
    default:
      return state;
  }
}
