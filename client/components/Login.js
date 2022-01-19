import React from "react";
import { connect } from "react-redux";
import { authenticateLogIn } from "../store";

/**
 * COMPONENT
 */
const Login = (props) => {
  const { handleSubmit, error } = props;

  return (
    <div>
      <form onSubmit={handleSubmit} name="login">
        <div>
          <label htmlFor="email">
            <small>Email</small>
          </label>
          <input name="email" type="text" />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </div>
  );
};

const mapState = (state) => {
  return {
    error: state.auth.error,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      dispatch(authenticateLogIn(email, password, formName));
    },
  };
};

export default connect(mapState, mapDispatch)(Login);
