import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login } from "./components/AuthFormLogIn";
import { Signup } from "./components/AuthForm";
import { me } from "./store";
import SinglePlant from "./components/SinglePlant";
import AboutUs from "./components/AboutUs";
import AllPlants from "./components/AllPlants";
import Cart from "./components/Cart";
import HomePage from "./components/HomePage";
import SingleUserInfo from "./components/SingleUserInfo";

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;
    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/plants/:plantId" component={SinglePlant} />
            <Route exact path="/plants" component={AllPlants} />
            <Route path="/aboutUs" component={AboutUs} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/singleuserinfo" component = {SingleUserInfo}/>
          </Switch>
        ) : (
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/plants/:plantId" component={SinglePlant} />
            <Route exact path="/plants" component={AllPlants} />
            <Route path="/aboutUs" component={AboutUs} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
          </Switch>
        )}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
