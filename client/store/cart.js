// action types

export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const CART_RESET = "CART_RESET";

//action creators

export const addToCart = (plant) => ({
  type: GET_PLANT,
  plant,
});

//thunks

export const getSinglePlantThunk = (plantId) => {
  return async (dispatch) => {
    try {
      const { data: plant } = await axios.get(`/api/plants/${plantId}`);
      dispatch(getSinglePlant(plant));
    } catch (error) {
      console.log("GET SINGLE PLANT THUNK ERROR");
    }
  };
};

//reducers

export default function cartReducer(state = { cartItems: [] }, action) {
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload;

      const existItem = state.cartItems.find((x) => x.plant === item.plant);

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.plant === existItem.plant ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems],
        };
      }
    default:
      return state;
  }
}
