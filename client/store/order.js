// import axios from "axios";
// // action types

// const ADD_TO_CART = "ADD_TO_CART";

// // action creater

// //action creators

// export const addToCart = (plantId) => ({
//   type: ADD_TO_CART,
//   plantId,
// });

// //thunks

// export const addToCartThunk = (plant) => {
//   return async (dispatch) => {
//     try {
//       await axios.put(`/api/plants/${plant.id}`, plant);
//       dispatch(addToCart(plant));
//     } catch (error) {
//       console.log("ADD SINGLE PLANT THUNK ERROR");
//     }
//   };
// };

// //reducers

// export default function singlePlantReducer(state = {}, action) {
//   switch (action.type) {
//     case GET_PLANT:
//       return action.plant;
//     default:
//       return state;
//   }
// }
