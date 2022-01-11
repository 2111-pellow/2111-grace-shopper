import axios from 'axios'

//action types
const GET_PLANT = "GET_PLANT"

//action creators

export const getSinglePlant = (plant) => ({
  type: GET_PLANT,
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

//reducers

export default function singlePlantReducer(state = {}, action) {
  switch (action.type){
    case GET_PLANT:
      return action.plant
    default:
      return state
  }
}
