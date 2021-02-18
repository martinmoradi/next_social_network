import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../actions/authActions";

const Login = ({ login, isAuthenticated }) => {
  const [state, setState] = useState({ identifier: "", password: "" });

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    login(state);
  };

  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <form
          onSubmit={(event) => handleSubmit(event)}
          className="bg-white px-6 py-8 rounded shadow-md text-black w-full"
        >
          <h1 className="mb-8 text-3xl text-center">Log in</h1>

          <input
            name="identifier"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            type="text"
            placeholder="Username or email"
            value={state.identifier}
            onChange={(event) => handleChange(event)}
          />

          <input
            type="password"
            name="password"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            placeholder="Password"
            value={state.password}
            onChange={(event) => handleChange(event)}
          />

          <button
            type="submit"
            className="w-full text-center py-3 rounded bg-green-500 text-white hover:bg-green-dark focus:outline-none my-1"
          >
            Log In !
          </button>
        </form>
        <div className="text-grey-dark mt-6">
          Don't have an account?
          <span className="no-underline border-b border-blue text-blue-600">
            <Link to={"/register"}> Sign up !</Link>
          </span>
          .
        </div>
      </div>
    </div>
  );
};

export default connect(null, { login })(Login);
