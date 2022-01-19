import React from "react";
import { connect } from "react-redux";
import { fetchUsers } from "../store/users";

class AllUsers extends React.Component {

  componentDidMount() {
    this.props.fetchUsers();
  }

  render() {
    const users = this.props.users || [];
    return (
        <div>
          {users.map(user => {
            return (
                <div className='user' key={user.id}>
                  <h2>{user.firstName} {user.lastName}</h2>
                </div>
                )
              })}
        </div>
      );
    }

}

const mapState = (state) => ({
  users: state.users
});

const mapDispatch = (dispatch) => ({
  fetchUsers: () => dispatch(fetchUsers()),
});

export default connect(mapState, mapDispatch)(AllUsers);
