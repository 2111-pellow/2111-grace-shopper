import React from "react";
import { connect } from "react-redux";
import { fetchSingleUser, updateUser } from "../store/singleUser";

class SingleUserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    try {
      this.props.loadSingleUser(this.props.auth.id);
    } catch (error) {
      console.error(error);
    }
  }

  // componentDidUpdate(prevProps) {
  //   if (prevProps.student.id !== this.props.student.id) {
  //     this.setState({
  //       firstName: this.props.student.firstName || '',
  //       lastName: this.props.student.lastName || '',
  //       email: this.props.student.email || ''
  //     });
  //   }
  // }

  handleSubmit(e) {
    e.preventDefault();
    this.props.updateUser({ ...this.props.user, ...this.state });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
    console.log("singleuserprops", this.props);
    //const user = this.props.auth
    const user = this.props.user;
    const { firstName, lastName, email } = this.state;

    return (
      <div>
        <h3>My Profile</h3>
        <div className="user-info-update">
          <form onSubmit={this.handleSubmit}>
            <div className="user-fields">
              <h3>First Name: {user.firstName}</h3>
              <label>Edit First Name:</label>
              <input
                type="text"
                name="firstName"
                value={firstName}
                onChange={this.handleChange}
                required
              />

              <h3>Last Name: {user.lastName}</h3>
              <label>Edit Last Name:</label>
              <input
                type="text"
                name="lastName"
                value={lastName}
                onChange={this.handleChange}
                required
              />

              <h3>Email: {user.email}</h3>
              <label>Edit Email:</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={this.handleChange}
                required
              />
            </div>

            <div>
              <button type="submit">Save changes</button>
            </div>
          </form>
        </div>
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
  updateUser: (userId) => dispatch(updateUser(userId)),
});

export default connect(mapState, mapDispatch)(SingleUserInfo);
