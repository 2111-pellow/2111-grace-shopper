import axios from "axios";

const GET_PLANTS = "GET_PLANTS";
const ADD_PLANT = 'ADD_PLANT'
const DELETE_PLANT = 'DELETE_PLANT'


export const getPlants = (plants) => {
  return {
    type: GET_PLANTS,
    plants,
  };
};

export const _addPlant = (plant) => {
  return {
    type: ADD_PLANT,
    plant,
  };
};

export const _deletePlant = (plant) => {
  return {
    type: DELETE_PLANT,
    plant,
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

export const addPlant = (newPlant) => {
  return async (dispatch) => {
    try {
      const {data: plant} = await axios.post('/api/plants/addPlant', newPlant)
      dispatch(_addPlant(plant))
    } catch (err) {
      console.log(err)
    }
  }
}

export const deletePlant = (plantId) => {
  return async (dispatch) => {
    const {data: deleted} = await axios.delete(`/api/plants/${plantId}`);
    dispatch(_deletePlant(deleted));
  };
};

const initialState = [];

export default function plantsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PLANTS:
      return action.plants;
    case ADD_PLANT:
      return [...state, action.plant]
    case DELETE_PLANT:
      return state.filter(plant => plant.id !== action.plant.id)
    default:
      return state;
  }
}
