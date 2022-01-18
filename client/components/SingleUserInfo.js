import React from "react";
import { connect } from "react-redux";
import { fetchSingleUser, updateUser } from "../store/singleUser";

class SingleUserInfo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount() {
    try{
      this.props.loadSingleUser(this.props.auth.id)
    } catch (error) {
      console.error(error)
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.updateUser(this.props.auth.id, this.state);
  }

  handleChange(e){
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    console.log( "singleuserprops" ,this.props)
    const user = this.props.auth
    const {firstName, lastName, email} = this.state
      return (
        <div>
      <h3>My Profile</h3>
      <hr />
      <form id="update-first-name" onSubmit = {this.handleSubmit}>
        <div>

        <label>First Name: {user.firstName}</label>
        <input type="text" name="firstName" value={firstName} onChange={this.handleChange} />

        <label>Last Name: {}</label>
        <input type="text" name="lastName" value={lastName} onChange={this.handleChange} />

        <label>Email:</label>
        <input type="email" name="email" value={email} onChange={this.handleChange} />

        <button type="submit">Save changes</button>
        </div>
      </form>

      </div>
      );
    }
}


const mapState = (state) => {
  return {
    user: state.singleUserReducer,
    auth: state.auth,
  };
};

const mapDispatch = (dispatch) => ({
  loadSingleUser: (userId) => dispatch(fetchSingleUser(userId)),
  updateUser: (userId) => dispatch(updateUser(userId))
});

export default connect(mapState, mapDispatch)(SingleUserInfo);
