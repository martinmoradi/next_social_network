import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "../styles/tailwind.output.css";

import { Provider } from "react-redux";
import store from "../store";
import { loadUser } from "../actions/authActions";

import Navbar from "./Navbar";
import Footer from "./Footer";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import GuestProfile from "../pages/GuestProfile";
import PrivateRoute from "../containers/PrivateRoute";
import PublicRoute from "../containers/PublicRoute";

const App = () => {
  // load user after refresh
  useEffect(() => {
    store.dispatch(loadUser());
  }, [loadUser]);

  return (
    <Provider store={store}>
      <Router>
        <div className="app">
          <Navbar />
          <div className="md:container mx-auto">
            <Switch>
              <PublicRoute path="/login" component={Login} />
              <PublicRoute path="/register" component={Register} />
              <PrivateRoute path="/profile" component={Profile} />
              <PrivateRoute path="/user/:userSlug" component={GuestProfile} />
              <Route exact path="/">
                <Home />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
