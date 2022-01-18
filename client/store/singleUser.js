import axios from 'axios'

//action types
const GET_USER = "GET_USER"
const UPDATE_USER = "UPDATE_USER"

//action creators
export const getSingleUser = (user) => ({
  type: GET_USER,
  user
})

const _updateUser = (user) => {
  return {
    type: UPDATE_USER,
    user
  }
}

//thunks
export const fetchSingleUser = (userId) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem('token')
      console.log('TOKEN', token)
      console.log(userId)
      const {data: user } = await axios.get(`/api/users/${userId}`, { headers: { authorization: token }})
      console.log('FRONTEND', user)
      dispatch(getSingleUser(user))

    } catch (error) {
      console.log('GET SINGLE USER THUNK ERROR')
    }
  }
}

export const updateUser = (userId, updated) => {
  return async (dispatch) => {
    try{
      const {data: updatedUser} = await axios.put(`/api/editUser/${userId}`, updated)
      dispatch(_updateUser(updatedUser))
    }
    catch (err) {
      console.log('updateUser thunk error!', err)
    }
  }
}

//reducers
const initialState = {}

export default function singleUserReducer(state = initialState, action) {
  switch (action.type){
    case GET_USER:
      return action.user
    case UPDATE_USER:
      return action.user
    default:
      return state
  }
}
