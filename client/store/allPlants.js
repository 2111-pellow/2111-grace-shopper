import axios from "axios";

const GET_PLANTS = "GET_PLANTS";

export const getPlants = (plants) => {
  return {
    type: GET_PLANTS,
    plants,
  };
};

export const fetchPlants = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/api/plants");
    dispatch(getPlants(data));
  } catch (error) {
    console.error("Error fetching plants from thunks!");
    console.error(error);
  }
};

const initialState = [];

export default function plantsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PLANTS:
      return action.plants;

    default:
      return state;
  }
}
