import axios from 'axios'

//action types
const GET_PLANT = "GET_PLANT"
const UPDATE_PLANT = "UPDATE_PLANT"

//action creators
export const getSinglePlant = (plant) => ({
  type: GET_PLANT,
  plant
})

export const _updatePlant = (plant) => ({
  type: UPDATE_PLANT,
  plant
})

//thunks
export const getSinglePlantThunk = (plantId) => {
  return async (dispatch) => {
    try {
      const {data: plant } = await axios.get(`/api/plants/${plantId}`)
      dispatch(getSinglePlant(plant))
    } catch (error) {
      console.log('GET SINGLE PLANT THUNK ERROR')
    }
  }
}

export const updatePlant = (plantId, updated) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem('token')
      const {data: plant} = await axios.put(`/api/plants/editPlant/${plantId}`, updated, { headers: { authorization: token }})
      dispatch(_updatePlant(plant))
    } catch (err) {
      console.log(err)
    }
  }
}

//reducers

export default function singlePlantReducer(state = {}, action) {
  switch (action.type){
    case GET_PLANT:
      return action.plant
    case UPDATE_PLANT:
      return {...state, plant_name: action.plant.plant_name, description: action.plant.description, category: action.plant.category, easeOfCare: action.plant.easeOfCare, price: action.plant.price, stock: action.plant.stock}
    default:
      return state
  }
}
