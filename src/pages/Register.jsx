import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "../actions/authActions";

const Register = ({ register, isAuthenticated }) => {
  const [state, setState] = useState({ username: "", password: "", email: "" });

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    register(state);
  };

  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <form
          onSubmit={(event) => handleSubmit(event)}
          className="bg-white px-6 py-8 rounded shadow-md text-black w-full"
        >
          <h1 className="mb-8 text-3xl text-center">Sign Up</h1>

          <input
            name="username"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            type="text"
            placeholder="Username"
            value={state.username}
            onChange={(event) => handleChange(event)}
          />

          <input
            name="email"
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            placeholder="Email"
            value={state.email}
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
            Create an account
          </button>
        </form>
        <div className="text-grey-dark mt-6">
          Already have an account?
          <span className="no-underline border-b border-blue text-blue-600">
            <Link to={"/login"}> Log in !</Link>
          </span>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, { register })(Register);
