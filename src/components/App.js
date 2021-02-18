import React, { useEffect } from "react";
import { BrowserRouter as Route, Switch } from "react-router-dom";
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

const App = () => {
  // load user after refresh
  useEffect(() => {
    store.dispatch(loadUser());
  }, [loadUser]);

  return (
    <Provider store={store}>
      <div className="app">
        <Navbar />
        <div className="md:container mx-auto">
          <Switch>
            <Route path={"/"} exact>
              <Home />
            </Route>
            <Route path={"/login"}>
              <Login />
            </Route>
            <Route path={"/register"}>
              <Register />
            </Route>
            <Route path={"/users/me"}>
              <Profile />
            </Route>
          </Switch>
        </div>
      </div>
    </Provider>
  );
};

export default App;
