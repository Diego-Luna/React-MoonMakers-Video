/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { connect } from "react-redux";
import { dataApi, loginCheckout, dataApiCoursesUSer } from "../actions";

import Home from "../containers/Home";
import Login from "../containers/Login";
import Register from "../containers/Register";
import NotFound from "../containers/NotFound";
import Player from "../containers/Player";
import Layout from "../components/Layout";

// const App = ({ isLogged }) => (
const App = (props) => {
  const { user } = props;

  useEffect(() => {
    props.loginCheckout();
  }, []);

  if (user.name.length > 1) {
    props.dataApi();
    props.dataApiCoursesUSer();
  }

  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/" component={user.name.length > 0 ?  Home : Login} />
          {/* <Route exact path="/" component={isLogged ? Home : Login} /> */}
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/player/:id" component={user.name.length > 0 ? Player : Login } />
          {/* <Route
            exact
            path="/player/:id"
            component={isLogged ? Player : Login}
          /> */}
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};

const mapDispatchToProps = {
  loginCheckout,
  dataApi,
  dataApiCoursesUSer,
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

// export default App;
export default connect(mapStateToProps, mapDispatchToProps)(App);
