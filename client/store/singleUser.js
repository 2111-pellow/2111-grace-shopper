import axios from 'axios'

//action types
const GET_USER = "GET_USER"

//action creators

export const getSingleUser = (user) => ({
  type: GET_USER,
  user
})

//thunks

export const getSingleUserThunk = (userId) => {
  return async (dispatch) => {
    try {
      const {data: User } = await axios.get(`/api/users/${userId}`)
      dispatch(getSingleUser(User))
    } catch (error) {
      console.log('GET SINGLE USER THUNK ERROR')
    }
  }
}

//reducers

export default function singleUserReducer(state = {}, action) {
  switch (action.type){
    case GET_USER:
      return action.user
    default:
      return state
  }
}
