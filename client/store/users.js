import axios from 'axios'

const initialState = []

//ACTION TYPES
const GET_USERS = 'GET_USERS'


//ACTION CREATERS
export const getUsers = (users) => {
  return {
    type: GET_USERS,
    users
  }
};

//THUNKS
export const fetchUsers = () => {
  return async (dispatch) => {
    try {
      console.log('hiiiii')
      const token = window.localStorage.getItem('token')
      console.log('TOKEN', token)

      const {data: users} = await axios.get('/api/users', { headers: { authorization: token }})
      console.log(users)
      dispatch(getUsers(users))
    } catch (error) {
      console.error( 'USERS THUNK ERROR')
    }
  }
};


//REDUCER
export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return action.users;
    default:
      return state;
  }
}
