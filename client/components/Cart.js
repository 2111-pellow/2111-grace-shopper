import React from "react"
import { connect } from "react-redux";
import { Link } from "react-router-dom"
import getSingleUserThunk from '../store/singleUser'

//need to have user connected here from redux store and through the user we get the plants associated
//use magic methods addchild to add plant onto user model.

class Cart extends React.Component {
  // componentDidMount(){
  //   this.props.getSingleUser(this.props.match.params.userId)
  // }

  render(){
    console.log(this.props)
    return (
      <div>
        Cart
      </div>
    )
  }
}


const mapState = (state) => {
  return {
    user: state.singleUser
  }
}

const mapDispatch = (dispatch) => ({
  getSingleUser: (userId) => dispatch(getSingleUserThunk(userId))
})

export default connect(mapState, mapDispatch)(Cart)
