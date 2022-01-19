import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
import { me } from "./store";
import SinglePlant from "./components/SinglePlant";
import AboutUs from "./components/AboutUs";
import AllPlants from "./components/AllPlants";
import Cart from "./components/Cart";
import HomePage from "./components/HomePage";
//import EditSingleUser from "./components/EditSingleUser";
import { fetchPlants } from "./store/allPlants";
import SingleUserInfo from "./components/SingleUserInfo";
import Checkout from "./components/Checkout";
import AllUsers from "./components/AllUsers";

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
    this.props.fetchPlants();
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
            <Route exact path="/users" component={AllUsers} />
            <Route path="/aboutUs" component={AboutUs} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/myinfo" component={SingleUserInfo} />
            <Route exact path="/checkout" component={Checkout} />
          </Switch>
        ) : (
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/plants/:plantId" component={SinglePlant} />
            <Route exact path="/plants" component={AllPlants} />
            <Route path="/aboutUs" component={AboutUs} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/checkout" component={Checkout} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
          </Switch>
        )}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
    fetchPlants: () => dispatch(fetchPlants()),
  };
};

export default withRouter(connect(mapState, mapDispatch)(Routes));
